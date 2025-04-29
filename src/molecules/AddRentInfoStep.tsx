"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import InputField from "@/atoms/InputField";
import InputAreaField from "@/atoms/InputAreaField";
import { RentFormType } from "@/organisms/AddRentModal";

const AddRentInfoStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RentFormType>();

  return (
    <Flex flexDir="column" gap={4} align="center">
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField type="date" label="Data do aluguel" error={errors.rentDate} registerProps={register("rentDate")} />
        <InputField
          type="date"
          label="Data do retorno"
          error={errors.returnDate}
          registerProps={register("returnDate")}
        />
      </Flex>
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField label="Cliente" error={errors.clientName} registerProps={register("clientName")} />
        <InputField label="Contato" error={errors.clientContact} registerProps={register("clientContact")} />
      </Flex>
      <InputField label="Endereço" error={errors.clientAddress} registerProps={register("clientAddress")} />

      <Flex w="full" align="center" justify="space-between" gap="4">
        <InputField
          inputGroupProps={{ startAddon: <Text px="2">R$</Text> }}
          label="Valor total"
          error={errors.totalValue}
          registerProps={register("totalValue")}
        />
        <InputField
          inputGroupProps={{ startAddon: <Text px="2">R$</Text> }}
          label="Sinal"
          error={errors.signal}
          registerProps={register("signal")}
        />
        <InputField
          inputGroupProps={{ startAddon: <Text px="2">R$</Text> }}
          label="Valor restante"
          error={errors.remainingValue}
          registerProps={register("remainingValue")}
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
