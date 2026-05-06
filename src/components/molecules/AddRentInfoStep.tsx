"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import InputField from "@/components/atoms/InputField";
import InputAreaField from "@/components/atoms/InputAreaField";
import { useEffect } from "react";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { RentFormType } from "../organisms/AddRentModal";
import Currency from "@/utils/models/Currency";

const AddRentInfoStep: React.FC = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<RentFormType>();

  const formSelectedProducts = useWatch({ control, name: "rentProducts" });
  const availableProducts = useWatch({ control, name: "allAvailableProducts" });
  const discountValue = useWatch({ control, name: "discountValue" });
  const discountType = useWatch({ control, name: "discountType" });
  const signal = useWatch({ control, name: "signal" });
  const finalTotalValueWatch = useWatch({ control, name: "finalTotalValue" });
  const totalValueWatch = useWatch({ control, name: "totalValue" });

  useEffect(() => {
    const productsWithAvailabilitySelected: ProductAvailabilityType[] = availableProducts.filter((availableProduct) =>
      formSelectedProducts.some((product) => (product.product_id || product.id) === availableProduct.id),
    );

    const productValue = productsWithAvailabilitySelected.reduce((acc, item) => acc + Number(item.price), 0);

    const safeDiscountValue = Number(discountValue) || 0;
    const safeSignal = Number(signal) || 0;

    let finalTotalValue = productValue;
    if (discountType === "PERCENTAGE") {
      finalTotalValue = productValue - (productValue * safeDiscountValue) / 100;
    } else {
      finalTotalValue = productValue - safeDiscountValue;
    }

    setValue("totalValue", productValue);
    setValue("finalTotalValue", Math.max(0, finalTotalValue));
    setValue("remainingValue", Math.max(0, finalTotalValue - safeSignal));
  }, [formSelectedProducts, signal, discountValue, discountType, availableProducts, setValue]);

  return (
    <Flex flexDir="column" gap={4} align="center">
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField label="Cliente" error={errors.clientName} registerProps={register("clientName")} />
        <InputField label="Contato" error={errors.clientContact} registerProps={register("clientContact")} />
      </Flex>
      <InputField label="Endereço" error={errors.clientAddress} registerProps={register("clientAddress")} />

      {finalTotalValueWatch !== undefined && (
        <Flex
          w="full"
          bg="gray.50"
          p="4"
          borderRadius="md"
          flexDir="column"
          gap="1"
          borderWidth="1px"
          borderColor="gray.100"
        >
          <Text fontSize="sm" fontWeight="bold" color="gray.700" mb="1">
            Resumo Financeiro
          </Text>
          <Flex justify="space-between">
            <Text fontSize="xs" color="gray.600">
              Subtotal:
            </Text>
            <Text fontSize="xs" fontWeight="semibold">
              {new Currency(totalValueWatch).toString()}
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontSize="xs" color="gray.600">
              Total Final:
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="blue.600">
              {new Currency(finalTotalValueWatch).toString()}
            </Text>
          </Flex>
          <Flex justify="space-between" mt="1" pt="1" borderTopWidth="1px" borderStyle="dashed">
            <Text fontSize="xs" color="gray.600" fontWeight="medium">
              Sinal Sugerido (50%):
            </Text>
            <Text fontSize="xs" fontWeight="bold" color="green.600">
              {new Currency(finalTotalValueWatch / 2).toString()}
            </Text>
          </Flex>
        </Flex>
      )}

      <Flex w="full" align="center" justify="space-between" gap="4">
        <InputField
          type="number"
          inputGroupProps={{ startAddon: <Text px="2">R$</Text> }}
          label="Desconto"
          error={errors.discountValue}
          registerProps={register("discountValue", { valueAsNumber: true })}
        />
        <InputField
          type="number"
          inputGroupProps={{ startAddon: <Text px="2">R$</Text> }}
          label="Sinal"
          error={errors.signal}
          registerProps={register("signal", { valueAsNumber: true })}
        />
      </Flex>
      <InputAreaField
        label="Observação para recibo"
        error={errors.receiptObservations}
        registerProps={register("receiptObservations")}
        h="20"
        resize="none"
      />
      <InputAreaField
        label="Observação interna"
        error={errors.internalObservations}
        registerProps={register("internalObservations")}
        h="20"
        resize="none"
      />
    </Flex>
  );
};

export default AddRentInfoStep;
