"use client";

import { Dialog, Flex, Spinner, Checkbox, Steps } from "@chakra-ui/react";
import { z, ZodRawShape } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toaster } from "@/components/atoms/Toaster";
import { api } from "@/services/api";
import { ReactElement, useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import { RentInsertWithProductDtoType, RentType, RentUpdateWithProductDtoType } from "@/types/entities/RentType";
import ProductSelector from "@/components/molecules/ProductSelector";
import AddRentInfoStep from "@/components/molecules/AddRentInfoStep";
import AddRentResume from "@/components/molecules/AddRentResume";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import ProductMeasures from "@/components/molecules/ProductMeasures";
import { EDiscountTypes } from "@/constants/EDiscountType";
import { EMeasureType } from "@/constants/EMeasureType";
import { RentProductSchema } from "@/constants/schemas/RentProductSchema";
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput";
import BaseFormModal from "../molecules/BaseFormModal";

const productSelectorSchema = z.object({
  rentDate: z.union([
    z.date({
      invalid_type_error: "Formato de data inválido.",
    }),
    z.string().nonempty("Informe a data de saída"),
  ]),
  returnDate: z.union([
    z.date({
      invalid_type_error: "Formato de data inválido.",
    }),
    z.string().nonempty("Informe a data de devolução"),
  ]),
  productIds: z
    .array(z.string(), { required_error: "Selecione pelo menos um produto" })
    .min(1, "Selecione pelo menos um produto"),
  allAvailableProducts: z.array(z.any()),
});

const productMeasuresSchema = z.object({
  rentProducts: z
    .array(
      RentProductSchema.superRefine((data, ctx) => {
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
      }),
    )
    .min(1, "Selecione pelo menos um produto"),
});

const addRentInfoSchema = z.object({
  clientName: z.string(),
  clientContact: z.string(),
  clientAddress: z.string(),
  totalValue: z.number(),
  finalTotalValue: z.number(),
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
};

type SchemaKeys = keyof RentFormType;

interface IAddRentModalProps {
  onClose: (rent?: RentType) => void;
  isOpen: boolean;
  onSave?: (newRent: RentType, isUpdate: boolean) => void;
  rentOnEdit: RentType | null;
}

const AddRentModal: React.FC<IAddRentModalProps> = ({ isOpen, onClose, onSave, rentOnEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInfiniteAdd, setIsInfiniteAdd] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<RentFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      rentProducts: [],
      productIds: [],
      discountType: EDiscountTypes.FIXED,
      internalObservations: "",
      receiptObservations: "",
      allAvailableProducts: [],
      remainingValue: 0,
      finalTotalValue: 0,
      totalValue: 0,
    },
    reValidateMode: "onBlur",
  });

  const formSelectedProducts = useWatch({ control: methods.control, name: "rentProducts" });
  const availableProducts = useWatch({ control: methods.control, name: "allAvailableProducts" });
  const rentDate = useWatch({ control: methods.control, name: "rentDate" });
  const returnDate = useWatch({ control: methods.control, name: "returnDate" });

  const steps: StepsType[] = [
    {
      title: "Items",
      description: <ProductSelector />,
      schema: productSelectorSchema,
    },
    {
      title: "Medidas",
      description: <ProductMeasures />,
      schema: productMeasuresSchema,
    },
    {
      title: "Dados",
      description: <AddRentInfoStep />,
      schema: addRentInfoSchema,
    },
    {
      title: "Resumo",
      description: <AddRentResume />,
    },
  ];

  const contentRef = useRef<HTMLDivElement>(null);

  const validateCurrentStep = async (): Promise<boolean> => {
    const step = steps[currentStep];
    if (!step.schema) return true; // Se não houver schema, pule a validação

    try {
      // Extrai os campos do schema do passo atual
      const fieldNames = Object.keys(step.schema.shape) as SchemaKeys[];

      // Valida apenas os campos do schema atual
      const isValid = await methods.trigger(fieldNames);

      return isValid;
    } catch (error) {
      console.error("Erro ao validar o formulário:", error);
      return false;
    }
  };

  const createRent = async (data: RentFormType) => {
    const {
      clientName,
      internalObservations,
      discountType,
      discountValue,
      rentProducts,
      receiptObservations,
      remainingValue,
      rentDate,
      returnDate,
      signal,
      totalValue,
      clientAddress,
      clientContact,
    } = data;

    const rentInsertData: RentInsertWithProductDtoType = {
      address: clientAddress,
      phone: clientContact,
      client_name: clientName,
      discount_type: discountType,
      discount_value: discountValue,
      rent_products: rentProducts,
      remaining_value: remainingValue,
      rent_date: getUTCDateFromInput(rentDate).toISOString(),
      return_date: getUTCDateFromInput(returnDate).toISOString(),
      signal_value: signal,
      total_value: totalValue,
      internal_observations: internalObservations,
      receipt_observations: receiptObservations,
    };

    return await api.post("rents", rentInsertData);
  };

  const updateRent = async (data: RentFormType) => {
    const {
      clientName,
      internalObservations,
      discountType,
      discountValue,
      rentProducts,
      receiptObservations,
      remainingValue,
      rentDate,
      returnDate,
      signal,
      totalValue,
      clientAddress,
      clientContact,
    } = data;

    const rentUpdateData: RentUpdateWithProductDtoType = {
      id: rentOnEdit?.id,
      address: clientAddress,
      phone: clientContact,
      client_name: clientName,
      discount_type: discountType,
      discount_value: discountValue,
      rent_products: rentProducts,
      remaining_value: remainingValue,
      rent_date: new Date(rentDate).toISOString(),
      return_date: new Date(returnDate).toISOString(),
      signal_value: signal,
      total_value: totalValue,
      internal_observations: internalObservations,
      receipt_observations: receiptObservations,
    };

    return await api.put("rents", rentUpdateData);
  };

  const onSubmit = async (data: RentFormType) => {
    try {
      setIsLoading(true);

      let rentRequest = null;

      if (rentOnEdit) rentRequest = await updateRent(data);
      else rentRequest = await createRent(data);

      if (rentRequest.status !== 201) throw new Error(rentRequest.statusText);

      if (onSave) onSave(rentRequest.data, !!rentOnEdit);

      toaster.create({
        type: "success",
        title: "Produto cadastrado!",
      });

      setCurrentStep(0);
      if (!isInfiniteAdd) handleOnClose();
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
      toaster.create({
        type: "error",
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
      });

      return;
    }

    if (currentStep + 2 > steps.length) {
      const values = methods.getValues();

      const selectedProducts = availableProducts.filter((product) =>
        formSelectedProducts.some((item) => item.id === product.id),
      );

      if (selectedProducts.some((product) => product.availability !== EAvailabilityStatus.AVAILABLE)) {
        // return;
      }

      onSubmit(values);

      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = (stepIndex: number) => {
    if (currentStep === 0) {
      handleOnClose();

      return;
    }

    setCurrentStep(stepIndex);
  };

  const handleUpdateStep = async (stepIndex: number) => {
    if (stepIndex > currentStep) return await handleNextStep();

    return handlePreviousStep(stepIndex);
  };

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

      methods.setValue("allAvailableProducts", productsListRequest.data);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar produtos",
        description: (e as Error).message,
      });
    }
  };

  const handleOnClose = () => {
    methods.reset();

    onClose();
  };

  useEffect(() => {
    if (rentDate && returnDate) loadProducts();
  }, [rentDate, returnDate]);

  useEffect(() => {
    const { setValue } = methods;

    if (!rentOnEdit) {
      setValue("rentProducts", []);

      return;
    }

    setValue("clientAddress", rentOnEdit.address ?? "");
    setValue("clientContact", rentOnEdit.phone ?? "");
    setValue("clientName", rentOnEdit.client_name ?? "");
    setValue("discountType", rentOnEdit.discount_type ?? EDiscountTypes.FIXED);
    setValue("discountValue", Number(rentOnEdit.discount_value ?? 0));
    setValue("finalTotalValue", Number(rentOnEdit.total_value) - Number(rentOnEdit.discount_value ?? 0));
    setValue("internalObservations", rentOnEdit.internal_observations ?? "");
    setValue("receiptObservations", rentOnEdit.receipt_observations ?? "");
    setValue("signal", Number(rentOnEdit.signal_value ?? 0));
    setValue("remainingValue", Number(rentOnEdit.remaining_value ?? 0));
    setValue("rentDate", rentOnEdit.rent_date);
    setValue("returnDate", rentOnEdit.return_date ?? "");
    setValue("rentProducts", rentOnEdit.rent_products);

    const selectedRentProductIds = rentOnEdit.rent_products.map((rentProduct) => rentProduct.product_id);
    setValue("productIds", selectedRentProductIds);
  }, [rentOnEdit]);

  return (
    <BaseFormModal
      contentRef={contentRef}
      isOpen={isOpen}
      onClose={handleOnClose}
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
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
        justifyContent={rentOnEdit ? "flex-end" : "space-between"}
        pt="8"
      >
        <Checkbox.Root checked={isInfiniteAdd} onCheckedChange={(e) => setIsInfiniteAdd(!!e.checked)} variant="outline">
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
    </BaseFormModal>
  );
};

export default AddRentModal;
