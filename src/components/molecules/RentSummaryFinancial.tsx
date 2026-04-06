"use client";

import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { RentSummaryDTO } from "@/types/entities/RentType";
import Currency from "@/utils/models/Currency";

interface IRentSummaryFinancialProps {
  rent: RentSummaryDTO;
}

const RentSummaryFinancial: React.FC<IRentSummaryFinancialProps> = ({ rent }) => {
  const subtotal = rent.rent_products.reduce((acc, rp) => acc + Number(rp.product_price), 0);
  const totalValue = Number(rent.total_value);
  const discountAmount = subtotal - totalValue;
  const signalValue = Number(rent.signal_value);
  const remainingValue = Number(rent.remaining_value);

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
      <Text fontWeight="bold" fontSize="lg" mb="4" color="primary.500">
        Resumo Financeiro
      </Text>
      <Flex direction="column" gap="2">
        <Flex justify="space-between">
          <Text color="gray.600">Subtotal</Text>
          <Text>{new Currency(subtotal).toString()}</Text>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="1">
            <Text color="gray.600">Desconto</Text>
            <Text color="gray.500" fontSize="sm">
              (
              {rent.discount_type === "PERCENTAGE"
                ? `${Number(rent.discount_value)}%`
                : new Currency(Number(rent.discount_value)).toString()}
              )
            </Text>
          </Flex>
          <Text color="green.600">- {new Currency(discountAmount).toString()}</Text>
        </Flex>
        <Flex justify="space-between" py="1">
          <Text color="gray.600" fontSize="sm">
            Subtotal após desconto
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {new Currency(totalValue).toString()}
          </Text>
        </Flex>
        <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
          <Text fontWeight="bold">Total do Aluguel</Text>
          <Text fontWeight="bold">{new Currency(totalValue).toString()}</Text>
        </Flex>
        <Flex justify="space-between" mt="2">
          <Text color="gray.600">Sinal Recebido</Text>
          <Text>- {new Currency(signalValue).toString()}</Text>
        </Flex>
        <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
          <Text fontWeight="bold" color="red.500">
            Valor Restante
          </Text>
          <Text fontWeight="bold" color="red.500">
            {new Currency(remainingValue).toString()}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RentSummaryFinancial;
