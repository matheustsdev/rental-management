"use client";

import React from "react";
import { Flex, Text, Accordion } from "@chakra-ui/react";
import { RentSummaryDTO } from "@/types/entities/RentType";
import RentSummaryProductItem from "@/components/atoms/RentSummaryProductItem";
import RentSummaryClientData from "@/components/atoms/RentSummaryClientData";
import RentSummaryFinancial from "@/components/molecules/RentSummaryFinancial";

interface IRentSummaryDetailsProps {
  rent: RentSummaryDTO;
}

const RentSummaryDetails: React.FC<IRentSummaryDetailsProps> = ({ rent }) => {
  return (
    <Flex direction="column" gap="6">
      <RentSummaryClientData rent={rent} />

      <Accordion.Root defaultValue={["products"]} collapsible width="full">
        <Accordion.Item value="products" border="none">
          <Accordion.ItemTrigger p="0" mb="4" width="full" cursor="pointer" _hover={{ opacity: 0.8 }}>
            <Flex justify="space-between" width="full" align="center">
              <Text fontWeight="bold" fontSize="lg" color="primary.500">
                Produtos ({rent.rent_products.length})
              </Text>
              <Accordion.ItemIndicator />
            </Flex>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Flex direction="column" gap="4">
              {rent.rent_products.map((rp) => (
                <RentSummaryProductItem 
                  key={rp.id} 
                  rentProduct={rp} 
                  discountType={rent.discount_type}
                  discountValue={Number(rent.discount_value)}
                />
              ))}
            </Flex>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      <RentSummaryFinancial rent={rent} />
    </Flex>
  );
};

export default RentSummaryDetails;
