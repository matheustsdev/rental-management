"use client";

import { CloseButton, Dialog, Portal, Flex, Spinner, Checkbox, Steps } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toaster } from "@/atoms/Toaster";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import PrimaryButton from "@/atoms/PrimaryButton";
import SecondaryButton from "@/atoms/SecondaryButton";
import { RentInsertDtoWithProduct, RentType } from "@/types/entities/RentType";
import { EDiscountTypes } from "@/constants/EDiscountType";
import ProductSelector from "../molecules/ProductSelector";
import { IncludeConfigType } from "@/services/crud/baseCrudService";
import AddRentInfoStep from "@/molecules/AddRentInfoStep";
import AddRentResume from "@/molecules/AddRentResume";

const productSchema = z.object({
  rentDate: z.date(),
  returnDate: z.date(),
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
  productsIds: z.array(z.string()),
});

export type RentFormType = z.infer<typeof productSchema>;

interface IAddRentModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: (newRent: RentType) => void;
  receiptOnEdit: ProductType | null;
}

const AddRentModal: React.FC<IAddRentModalProps> = ({ isOpen, onClose, onSave, receiptOnEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInfiniteAdd, setIsInfiniteAdd] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);

  const methods = useForm<RentFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productsIds: [],
      discountType: "FIXED",
      discountValue: 0,
      receiptObservations: "",
      internalObservations: "",
    },
  });
  const selectedProductIds = useWatch({ control: methods.control, name: "productsIds" });

  const steps = [
    {
      title: "Dados",
      description: <AddRentInfoStep />,
    },
    {
      title: "Items",
      description: <ProductSelector availableProducts={products} />,
    },
    {
      title: "Step 3",
      description: (
        <AddRentResume selectedProducts={products.filter((product) => selectedProductIds.includes(product.id))} />
      ),
    },
  ];

  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: RentFormType) => {
    try {
      setIsLoading(true);

      const {
        clientName,
        internalObservations,
        discountType,
        discountValue,
        productsIds,
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
        productIds: productsIds,
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

      onSave(newRentRequest.data);

      methods.reset();
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

  const loadProducts = async () => {
    try {
      const includeConfig: IncludeConfigType = {
        categories: {
          table: "categories",
          foreignKey: "category_id",
        },
      };

      const productsListRequest = (
        await api.get("/products", {
          params: {
            include: JSON.stringify(includeConfig),
            pageSize: 50,
          },
        })
      ).data;

      setProducts(productsListRequest.data);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar produtos",
        description: (e as Error).message,
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
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
  );
};

export default AddRentModal;
