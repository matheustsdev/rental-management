"use client";

import { CloseButton, Dialog, Portal, Flex, Spinner, Checkbox, Steps, useDisclosure } from "@chakra-ui/react";
import { z, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toaster } from "@/atoms/Toaster";
import { api } from "@/services/api";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import PrimaryButton from "@/atoms/PrimaryButton";
import SecondaryButton from "@/atoms/SecondaryButton";
import { ProductWithMeasureRentDtoType, RentInsertDtoWithProduct, RentType } from "@/types/entities/RentType";
import ProductSelector from "../molecules/ProductSelector";
import AddRentInfoStep from "@/molecules/AddRentInfoStep";
import AddRentResume from "@/molecules/AddRentResume";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import ConfirmationModal from "@/molecules/ConfirmationModal";
import ProductMeasures from "@/molecules/ProductMeasures";
import { EDiscountTypes } from "@/constants/EDiscountType";
import { EMeasureType } from "@/constants/EMeasureType";

const productSelectorSchema = z.object({
  rentDate: z.string().nonempty("Informe a data de saída"),
  returnDate: z.string().nonempty("Informe a data de devolução"),
  productIds: z
    .array(z.string(), { required_error: "Selecione pelo menos um produto" })
    .min(1, "Selecione pelo menos um produto"),
  allAvailableProducts: z.array(z.any()),
});

const productMeasuresSchema = z.object({
  products: z
    .array(
      z
        .object({
          id: z.string(),
          measure_type: z.enum([EMeasureType.DRESS, EMeasureType.SUIT]),
          waist: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          bust: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          hip: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          shoulder: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          sleeve: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          height: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
          back: z.number({ invalid_type_error: "Informe um número válido" }).optional(),
        })
        .superRefine((data, ctx) => {
          const { measure_type, back, bust, height, hip, shoulder, sleeve } = data;

          if (measure_type === EMeasureType.DRESS) {
            if (!bust || !hip || !shoulder) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "As medidas são obrigatórias",
                path: ["waist", "bust", "hip", "shoulder"],
              });
            }
          } else if (measure_type === EMeasureType.SUIT) {
            if (!sleeve || !height || !back) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "As medidas são obrigatórias",
                path: ["waist", "sleeve", "height", "back"],
              });
            }
          }
        })
    )
    .min(1, "Selecione pelo menos um produto"),
});

const addRentInfoSchema = z.object({
  clientName: z.string(),
  clientContact: z.string(),
  clientAddress: z.string(),
  totalValue: z.number(),
  signal: z.number({ invalid_type_error: "Informe um número válido" }),
  remainingValue: z.number(),
  internalObservations: z.string(),
  receiptObservations: z.string(),
  discountValue: z.number(),
  discountType: z.enum([EDiscountTypes.FIXED, EDiscountTypes.PERCENTAGE]),
});

// Combine all schemas
const schema = productSelectorSchema.merge(addRentInfoSchema).merge(productMeasuresSchema);

export type RentFormType = z.infer<typeof schema>;

type StepsType = {
  title: string;
  description: ReactElement;
  schema?: z.ZodObject<ZodRawShape>;
  isValid: boolean;
};

type SchemaKeys = keyof RentFormType;

interface IAddRentModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave?: (newRent: RentType) => void;
  receiptOnEdit: ProductType | null;
}

const AddRentModal: React.FC<IAddRentModalProps> = ({ isOpen, onClose, onSave, receiptOnEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInfiniteAdd, setIsInfiniteAdd] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<StepsType[]>([
    {
      title: "Items",
      description: <ProductSelector />,
      schema: productSelectorSchema,
      isValid: true,
    },
    {
      title: "Medidas",
      description: <ProductMeasures />,
      schema: productMeasuresSchema,
      isValid: false,
    },
    {
      title: "Dados",
      description: <AddRentInfoStep />,
      schema: addRentInfoSchema,
      isValid: false,
    },
    {
      title: "Resumo",
      description: <AddRentResume selectedProducts={[]} />,
      isValid: false,
    },
  ]);

  const methods = useForm<RentFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      products: [],
      productIds: [],
      discountType: EDiscountTypes.FIXED,
      internalObservations: "",
      receiptObservations: "",
      allAvailableProducts: [],
      remainingValue: 0,
    },
  });

  const formSelectedProducts = useWatch({ control: methods.control, name: "products" });
  const availableProducts = useWatch({ control: methods.control, name: "allAvailableProducts" });
  const rentDate = useWatch({ control: methods.control, name: "rentDate" });
  const returnDate = useWatch({ control: methods.control, name: "returnDate" });

  const {
    open: isRentWithUnvailableModalOpen,
    onClose: closeRentWithUnavailableProductModal,
    onOpen: openRentWithUnavailableProductModal,
  } = useDisclosure();

  const contentRef = useRef<HTMLDivElement>(null);

  const validateCurrentStep = async (): Promise<boolean> => {
    const step = steps[currentStep];
    if (!step.schema) return true; // Se não houver schema, pule a validação

    try {
      // Extrai os campos do schema do passo atual
      const fieldNames = Object.keys(step.schema.shape) as SchemaKeys[];

      // Valida apenas os campos do schema atual
      const isValid = await methods.trigger(fieldNames);

      console.log("Is valid >> ", isValid);
      return isValid;
    } catch (error) {
      console.error("Erro ao validar o formulário:", error);
      return false;
    }
  };

  const onSubmit = async (data: RentFormType) => {
    try {
      setIsLoading(true);

      const {
        clientName,
        internalObservations,
        discountType,
        discountValue,
        products,
        receiptObservations,
        remainingValue,
        rentDate,
        returnDate,
        signal,
        totalValue,
        clientAddress,
        clientContact,
      } = data;

      const rentInsertData: RentInsertDtoWithProduct = {
        address: clientAddress,
        phone: clientContact,
        client_name: clientName,
        discount_type: discountType,
        discount_value: discountValue,
        products,
        remaining_value: remainingValue,
        rent_date: new Date(rentDate).toISOString(),
        return_date: new Date(returnDate).toISOString(),
        signal_value: signal,
        total_value: totalValue,
        internal_observations: internalObservations,
        receipt_observations: receiptObservations,
      };

      const newRentRequest = await api.post("rents", rentInsertData);

      if (newRentRequest.status !== 201) throw new Error(newRentRequest.statusText);

      toaster.create({
        type: "success",
        title: "Produto cadastrado!",
      });

      methods.reset();

      if (onSave) {
        onSave(newRentRequest.data);
      }

      setCurrentStep(0);
      if (!isInfiniteAdd) onClose();
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao salvar",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextButtonText = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (currentStep + 2 > steps.length) {
      return "Salvar";
    }

    return "Próximo";
  };

  const handleNextStep = async () => {
    const isValidStep = await validateCurrentStep();

    if (!isValidStep) {
      // Se a validação falhar, não avance para o próximo passo
      toaster.create({
        type: "error",
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
      });

      return;
    }

    if (currentStep + 2 > steps.length) {
      const values = methods.getValues();

      const selectedProducts = availableProducts.filter(({ product }) =>
        formSelectedProducts.some((item) => item.id === product.id)
      );

      if (selectedProducts.some((product) => product.availability !== EAvailabilityStatus.AVAILABLE)) {
        openRentWithUnavailableProductModal();

        return;
      }

      onSubmit(values);

      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = (stepIndex: number) => {
    if (currentStep === 0) {
      onClose();

      return;
    }

    setCurrentStep(stepIndex);
  };

  const handleUpdateStep = async (stepIndex: number) => {
    if (stepIndex > currentStep) return await handleNextStep();

    return handlePreviousStep(stepIndex);
  };

  const getUpdatedSteps = useCallback((): StepsType[] => {
    return [
      {
        title: "Items",
        description: <ProductSelector availableProducts={products} />,
        schema: productSelectorSchema,
        isValid: true,
      },
      {
        title: "Medidas",
        description: <ProductMeasures selectedProducts={selectedProducts} />,
        schema: productMeasuresSchema,
        isValid: false,
      },
      {
        title: "Dados",
        description: <AddRentInfoStep />,
        schema: addRentInfoSchema,
        isValid: false,
      },
      {
        title: "Resumo",
        description: <AddRentResume selectedProducts={[]} />,
        isValid: false,
      },
    ];
  }, []);

  const loadProducts = async () => {
    try {
      const productsListRequest = (
        await api.get("/products/availability", {
          params: {
            startDate: rentDate,
            endDate: returnDate,
          },
        })
      ).data;

      methods.setValue("allAvailableProducts", productsListRequest);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar produtos",
        description: (e as Error).message,
      });
    }
  };

  useEffect(() => {
    if (rentDate && returnDate) loadProducts();
  }, [rentDate, returnDate]);

  // useEffect(() => {
  //   const newSteps = getUpdatedSteps();

  //   setSteps(newSteps);
  // }, [products, selectedProducts]);

  useEffect(() => {
    const productValue = formSelectedProducts.reduce(
      (acc, product) => acc + (availableProducts.find((item) => item.product.id === product.id)?.price ?? 0),
      0
    );

    methods.setValue("totalValue", productValue);

    console.log("Erros >> ", methods.formState.errors);
  }, [methods, formSelectedProducts]);

  return (
    <>
      <FormProvider {...methods}>
        <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center">
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner p="4">
              <Dialog.Content
                as="form"
                p="4"
                bg="body.400"
                color="black"
                onSubmit={methods.handleSubmit(onSubmit)}
                ref={contentRef}
                h="75vh"
                overflowY="auto"
              >
                p
                <Dialog.Header py="4">
                  <Dialog.Title>Adicionar aluguel</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Steps.Root step={currentStep} onStepChange={(e) => handleUpdateStep(e.step)} count={steps.length}>
                    <Steps.List>
                      {steps.map((step, index) => (
                        <Steps.Item key={index} index={index} title={step.title}>
                          <Steps.Trigger type="button">
                            <Steps.Indicator />
                            <Steps.Title>{step.title}</Steps.Title>
                          </Steps.Trigger>
                          <Steps.Separator />
                        </Steps.Item>
                      ))}
                    </Steps.List>

                    {steps.map((step, index) => (
                      <Steps.Content key={index} index={index}>
                        {step.description}
                      </Steps.Content>
                    ))}
                  </Steps.Root>
                </Dialog.Body>
                <Dialog.Footer
                  display="flex"
                  alignItems="center"
                  justifyContent={receiptOnEdit ? "flex-end" : "space-between"}
                  pt="8"
                >
                  <Checkbox.Root
                    checked={isInfiniteAdd}
                    onCheckedChange={(e) => setIsInfiniteAdd(!!e.checked)}
                    variant="outline"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Continuar adicionando</Checkbox.Label>
                  </Checkbox.Root>
                  <Flex gap="4">
                    <SecondaryButton
                      variant="outline"
                      type="button"
                      minW="24"
                      onClick={() => handlePreviousStep(currentStep - 1)}
                    >
                      Voltar
                    </SecondaryButton>
                    <PrimaryButton w="24" type="button" disabled={isLoading} onClick={handleNextStep}>
                      {handleNextButtonText()}
                    </PrimaryButton>
                  </Flex>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </FormProvider>
      <ConfirmationModal
        message="Existem produtos selecionados que não estão disponível nessa data. Deseja salvar o aluguel mesmo assim?"
        isOpen={isRentWithUnvailableModalOpen}
        onClose={closeRentWithUnavailableProductModal}
        onSave={() => console.log("sdsdsd")}
      />
    </>
  );
};

export default AddRentModal;
