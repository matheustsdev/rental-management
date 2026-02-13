"use client";

import { Flex, Status, Text } from "@chakra-ui/react";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import Currency from "@/utils/models/Currency";

interface IProductResumeItemProps {
  productAvailability: ProductAvailabilityType;
}

const ProductResumeItem: React.FC<IProductResumeItemProps> = ({ productAvailability }) => {
  return (
    <Flex key={productAvailability.id} w="full" borderWidth={1} p={2} borderRadius="md" bg="green.50">
      <Flex flexDir="column" flex={1}>
        <Text fontWeight="bold">{productAvailability.description}</Text>
        <Text fontSize="sm" color="gray.500">
          Ref: {productAvailability.reference} | {new Currency(productAvailability.price).toString()}
        </Text>
      </Flex>
      <Status.Root colorPalette={productAvailability.availability === EAvailabilityStatus.AVAILABLE ? "green" : "red"}>
        <Text fontSize="xs">
          {productAvailability.availability === EAvailabilityStatus.AVAILABLE ? "Disponível" : "Alugado"}
        </Text>
        <Status.Indicator />
      </Status.Root>
    </Flex>
  );
};

export default ProductResumeItem;
