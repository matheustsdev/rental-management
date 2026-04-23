"use client";

import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Currency from "@/utils/models/Currency";
import { Rent, RentProps } from "@/core/domain/entities/Rent";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { RentType } from "@/types/entities/RentType";

interface IRentSummaryFinancialProps {
  rent: RentType;
}

const RentSummaryFinancial: React.FC<IRentSummaryFinancialProps> = ({ rent }) => {
  const rentPayload: RentProps = {
    id: rent.id,
    code: Number(rent.code),
    status: rent.status,
    rentDate: rent.rent_date,
    returnDate: rent.return_date,
    clientName: rent.client_name,
    address: rent.address,
    phone: rent.phone,
    discountType: rent.discount_type,
    discountValue: Number(rent.discount_value ?? 0),
    signalValue: Number(rent.signal_value),
    items: rent.rent_products.map(
      (rp) =>
        new RentProduct({
          id: rp.id,
          productId: rp.product_id,
          productPrice: Number(rp.product_price),
          productDescription: rp.product_description ?? "",
          measureType: rp.measure_type,
          bust: rp.bust ? Number(rp.bust) : 0,
          waist: rp.waist ? Number(rp.waist) : 0,
          hip: rp.hip ? Number(rp.hip) : 0,
          shoulder: rp.shoulder ? Number(rp.shoulder) : 0,
          sleeve: rp.sleeve ? Number(rp.sleeve) : 0,
          height: rp.height ? Number(rp.height) : 0,
          back: rp.back ? Number(rp.back) : 0,
        }),
    ),
    createdAt: rent.created_at,
    realReturnDate: rent.real_return_date,
  };

  const rentEntity = new Rent(rentPayload);

  console.log("Rent Entity >> ", rentEntity, rent);

  const discountValue = Number(rent.discount_value ?? 0);
  const discountType = rent.discount_type;

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
      <Text fontWeight="bold" fontSize="lg" mb="4" color="primary.500">
        Resumo Financeiro
      </Text>
      <Flex direction="column" gap="2">
        <Flex justify="space-between">
          <Text color="gray.600">Subtotal</Text>
          <Text>{new Currency(rentEntity.getSubtotal()).toString()}</Text>
        </Flex>
        <Flex justify="space-between">
          <Flex gap="1">
            <Text color="gray.600">Desconto</Text>
            <Text color="gray.500" fontSize="sm">
              ({discountType === "PERCENTAGE" ? `${discountValue}%` : new Currency(discountValue).toString()})
            </Text>
          </Flex>
          <Text color="green.600">- {new Currency(rentEntity.getTotalDiscount()).toString()}</Text>
        </Flex>
        <Flex justify="space-between" py="1">
          <Text color="gray.600" fontSize="sm">
            Subtotal após desconto
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {new Currency(rentEntity.getTotalValue()).toString()}
          </Text>
        </Flex>
        <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
          <Text fontWeight="bold">Total do Aluguel</Text>
          <Text fontWeight="bold">{new Currency(rentEntity.getTotalValue()).toString()}</Text>
        </Flex>
        <Flex justify="space-between" mt="2">
          <Text color="gray.600">Sinal Recebido</Text>
          <Text>- {new Currency(rentEntity.signalValue).toString()}</Text>
        </Flex>
        <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
          <Text fontWeight="bold" color="red.500">
            Valor Restante
          </Text>
          <Text fontWeight="bold" color="red.500">
            {new Currency(rentEntity.getRemainingValue()).toString()}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RentSummaryFinancial;
