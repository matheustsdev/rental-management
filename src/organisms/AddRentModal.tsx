"use client";

import { CloseButton, Dialog, Portal, Flex, Spinner, Checkbox, Steps, useDisclosure } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toaster } from "@/atoms/Toaster";
import { api } from "@/services/api";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import PrimaryButton from "@/atoms/PrimaryButton";
import SecondaryButton from "@/atoms/SecondaryButton";
import { RentInsertDtoWithProduct, RentType } from "@/types/entities/RentType";
import ProductSelector from "../molecules/ProductSelector";
import AddRentInfoStep from "@/molecules/AddRentInfoStep";
import AddRentResume from "@/molecules/AddRentResume";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import ConfirmationModal from "@/molecules/ConfirmationModal";
import ProductMeasures from "@/molecules/ProductMeasures";
import { EDiscountTypes } from "@/constants/EDiscountType";
import { EMeasureType } from "@/constants/EMeasureType";

const schema = z.object({
  rentDate: z.string(),
  returnDate: z.string(),
  clientName: z.string(),
  clientContact: z.string(),
  clientAddress: z.string(),
  totalValue: z.number(),
  signal: z.number(),
  remainingValue: z.number(),
  internalObservations: z.string(),
  receiptObservations: z.string(),
  discountValue: z.number(),
  discountType: z.nativeEnum(EDiscountTypes),
  products: z.array(
    z
      .object({
        id: z.string(),
        measure_type: z.nativeEnum(EMeasureType),
        waist: z.number().optional(),
        bust: z.number().optional(),
        hip: z.number().optional(),
        shoulder: z.number().optional(),
        sleeve: z.number().optional(),
        height: z.number().optional(),
        back: z.number().optional(),
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
  ),
});

export type RentFormType = z.infer<typeof schema>;

type StepsType = {
  title: string;
  description: ReactElement;
};

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
  const [products, setProducts] = useState<ProductAvailabilityType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductAvailabilityType[]>([]);
  const [steps, setSteps] = useState<StepsType[]>([
    {
      title: "Items",
      description: <ProductSelector availableProducts={products} />,
    },
    {
      title: "Dados",
      description: <AddRentInfoStep />,
    },
    {
      title: "Resumo",
      description: <AddRentResume selectedProducts={[]} />,
    },
  ]);

  const methods = useForm<RentFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      products: [],
      discountType: "FIXED",
      discountValue: 0,
      receiptObservations: "",
      internalObservations: "",
    },
    mode: "onBlur",
  });

  const form = useWatch({ control: methods.control });

  const formSelectedProducts = useWatch({ control: methods.control, name: "products" });
  const rentDate = useWatch({ control: methods.control, name: "rentDate" });
  const returnDate = useWatch({ control: methods.control, name: "returnDate" });

  const {
    open: isRentWithUnvailableModalOpen,
    onClose: closeRentWithUnavailableProductModal,
    onOpen: openRentWithUnavailableProductModal,
  } = useDisclosure();

  const contentRef = useRef<HTMLDivElement>(null);

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

  const handleNextStep = () => {
    if (currentStep + 2 > steps.length) {
      const values = methods.getValues();

      const selectedProducts = products.filter(({ product }) =>
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

  const handlePreviousStep = () => {
    if (currentStep === 0) {
      onClose();

      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const getUpdatedSteps = useCallback((): StepsType[] => {
    return [
      {
        title: "Items",
        description: <ProductSelector availableProducts={products} />,
      },
      {
        title: "Medidas",
        description: <ProductMeasures selectedProducts={selectedProducts} />,
      },
      {
        title: "Dados",
        description: <AddRentInfoStep />,
      },
      {
        title: "Resumo",
        description: <AddRentResume selectedProducts={selectedProducts} />,
      },
    ];
  }, [products, selectedProducts]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const productsListRequest = (
        await api.get("/products/availability", {
          params: {
            startDate: rentDate,
            endDate: returnDate,
          },
        })
      ).data;

      setProducts(productsListRequest);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar produtos",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rentDate && returnDate) loadProducts();
  }, [rentDate, returnDate]);

  useEffect(() => {
    setSelectedProducts(products.filter(({ product }) => formSelectedProducts.some((item) => item.id === product.id)));
  }, [formSelectedProducts, products]);

  useEffect(() => {
    const newSteps = getUpdatedSteps();

    setSteps(newSteps);
  }, [products, selectedProducts]);

  useEffect(() => {
    console.log("Form >> ", form);
  }, [form]);

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
                <Dialog.Header py="4">
                  <Dialog.Title>Adicionar aluguel</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Steps.Root step={currentStep} onStepChange={(e) => setCurrentStep(e.step)} count={steps.length}>
                    <Steps.List>
                      {steps.map((step, index) => (
                        <Steps.Item key={index} index={index} title={step.title}>
                          <Steps.Trigger>
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
                    <SecondaryButton variant="outline" minW="24" onClick={handlePreviousStep}>
                      Voltar
                    </SecondaryButton>
                    <PrimaryButton w="24" type="submit" disabled={isLoading} onClick={handleNextStep}>
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
        onSave={() => onSubmit(methods.getValues())}
      />
    </>
  );
};

export default AddRentModal;
