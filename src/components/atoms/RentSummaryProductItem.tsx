"use client";

import React from "react";
import { Box, Flex, Text, Grid, GridItem, Badge, Separator } from "@chakra-ui/react";
import { RentType } from "@/types/entities/RentType";
import Currency from "@/utils/models/Currency";
import { measureFieldsLabels } from "@/constants/MeasureFields";
import { EMeasureType, MeasureType } from "@/constants/EMeasureType";
import { Helper } from "@/utils/Helper";
import { formatDate } from "@/utils/formatDate";

type RentProductType = RentType["rent_products"][number];

interface IRentSummaryProductItemProps {
  rentProduct: RentProductType;
}

const RentSummaryProductItem: React.FC<IRentSummaryProductItemProps> = ({ rentProduct }) => {
  const mType = (rentProduct.measure_type as MeasureType) ?? EMeasureType.NONE;
  const labelsMap = (measureFieldsLabels[mType] ?? {}) as Record<string, string>;
  const measureKeys = Helper.getObjectKeys(labelsMap);

  const productPrice = Number(rentProduct.product_price);

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" bg="white" boxShadow="sm">
      <Flex justify="space-between" align="flex-start" mb="2">
        <Box>
          <Text fontWeight="bold" fontSize="md">
            {rentProduct.product_description}
          </Text>
          {rentProduct.products?.reference && (
            <Text fontSize="sm" color="gray.600">
              Ref: {rentProduct.products.reference} | {rentProduct.products.categories?.name}
            </Text>
          )}
        </Box>
        <Flex direction="column" align="flex-end">
          <Text fontWeight="bold" fontSize="md">
            {new Currency(productPrice).toString()}
          </Text>
        </Flex>
      </Flex>

      {rentProduct.real_return_date && (
        <Flex mt="2" align="center" gap="1">
          <Badge colorPalette="green" variant="subtle" px="2">
            Devolvido em
          </Badge>
          <Text fontSize="sm">{formatDate(new Date(rentProduct.real_return_date), "dd/MM/yyyy")}</Text>
        </Flex>
      )}

      {measureKeys.length > 0 && (
        <Box mt="4">
          <Separator mb="3" />
          <Text
            fontSize="xs"
            fontWeight="bold"
            mb="2"
            color="primary.500"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Medidas:
          </Text>
          <Grid
            templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}
            gap="3"
            p="3"
            bg="gray.50"
            borderRadius="md"
          >
            {measureKeys.map((key) => {
              const val = (rentProduct as Record<string, unknown>)[key];

              if (val === null || val === undefined) return null;

              return (
                <GridItem key={key}>
                  <Text fontSize="2xs" color="gray.500" fontWeight="bold">
                    {labelsMap[key]}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {String(val)} cm
                  </Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      )}

      {rentProduct.internal_observations && (
        <Box mt="3" p="2" bg="blue.50" borderRadius="md" borderLeftWidth="4px" borderLeftColor="blue.400">
          <Text fontSize="xs" fontWeight="bold" color="blue.700" mb="1">
            Observação Interna:
          </Text>
          <Text fontSize="sm" color="blue.900">
            {rentProduct.internal_observations}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default RentSummaryProductItem;
