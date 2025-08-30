"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import InputField from "@/atoms/InputField";
import InputAreaField from "@/atoms/InputAreaField";
import { RentFormType } from "@/organisms/AddRentModal";
import { useEffect } from "react";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";

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
  const signal = useWatch({ control, name: "signal" });

  useEffect(() => {
    const productsWithAvailabilitySelected: ProductAvailabilityType[] = availableProducts.filter((availableProduct) =>
      formSelectedProducts.some((product) => product.id === availableProduct.product.id)
    );

    const productValue = productsWithAvailabilitySelected.reduce((acc, item) => acc + item.product.price, 0);

    setValue("totalValue", productValue);
    setValue("finalTotalValue", productValue - (discountValue ?? 0));
    setValue("remainingValue", productValue - (discountValue ?? 0) - (signal ?? 0));
  }, [formSelectedProducts, signal, discountValue, availableProducts, setValue]);

  return (
    <Flex flexDir="column" gap={4} align="center">
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField label="Cliente" error={errors.clientName} registerProps={register("clientName")} />
        <InputField label="Contato" error={errors.clientContact} registerProps={register("clientContact")} />
      </Flex>
      <InputField label="Endereço" error={errors.clientAddress} registerProps={register("clientAddress")} />

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
