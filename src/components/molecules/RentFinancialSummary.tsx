"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import Currency from "@/utils/models/Currency";
import { RentFormType } from "../organisms/AddRentModal";

const RentFinancialSummary: React.FC = () => {
  const { control, setValue } = useFormContext<RentFormType>();

  const productIds = useWatch({ control, name: "productIds" }) ?? [];
  const availableProducts = useWatch({ control, name: "allAvailableProducts" }) ?? [];
  const discountValue = useWatch({ control, name: "discountValue" });
  const discountType = useWatch({ control, name: "discountType" });
  const signal = useWatch({ control, name: "signal" });

  const financialData = useMemo(() => {
    const selectedIdsSet = new Set(productIds);
    const selectedProducts = availableProducts.filter((product) => selectedIdsSet.has(product.id));

    const subtotal = selectedProducts.reduce((acc, item) => acc + Number(item.price), 0);
    const safeDiscountValue = Number(discountValue) ?? 0;
    const safeSignal = Number(signal) ?? 0;

    let finalTotal = subtotal;
    if (discountType === "PERCENTAGE") {
      finalTotal = subtotal - (subtotal * safeDiscountValue) / 100;
    } else {
      finalTotal = subtotal - safeDiscountValue;
    }

    const finalTotalValue = Math.max(0, finalTotal);
    const remainingValue = Math.max(0, finalTotalValue - safeSignal);

    return {
      subtotal,
      finalTotalValue,
      remainingValue,
    };
  }, [productIds, availableProducts, discountValue, discountType, signal]);

  useEffect(() => {
    setValue("totalValue", financialData.subtotal);
    setValue("finalTotalValue", financialData.finalTotalValue);
    setValue("remainingValue", financialData.remainingValue);
  }, [financialData, setValue]);

  return (
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
          {new Currency(financialData.subtotal).toString()}
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text fontSize="xs" color="gray.600">
          Total Final:
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="blue.600">
          {new Currency(financialData.finalTotalValue).toString()}
        </Text>
      </Flex>
      <Flex justify="space-between" mt="1" pt="1" borderTopWidth="1px" borderStyle="dashed">
        <Text fontSize="xs" color="gray.600" fontWeight="medium">
          Sinal Sugerido (50%):
        </Text>
        <Text fontSize="xs" fontWeight="bold" color="green.600">
          {new Currency(financialData.finalTotalValue / 2).toString()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default RentFinancialSummary;
