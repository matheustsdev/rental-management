"use client";

import { Flex, Status, Text } from "@chakra-ui/react";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";

interface IProductResumeItemProps {
  product: ProductAvailabilityType;
}

const ProductResumeItem: React.FC<IProductResumeItemProps> = ({ product }) => {
  return (
    <Flex key={product.id} w="full" borderWidth={1} p={2} borderRadius="md" bg="green.50">
      <Flex flexDir="column" flex={1}>
        <Text fontWeight="bold">{product.description}</Text>
        <Text fontSize="sm" color="gray.500">
          Ref: {product.reference} | R$ {product.price.toFixed(2)}
        </Text>
      </Flex>
      <Status.Root colorPalette={product.availability === EAvailabilityStatus.AVAILABLE ? "green" : "red"}>
        <Text fontSize="xs">{product.availability === EAvailabilityStatus.AVAILABLE ? "Disponível" : "Alugado"}</Text>
        <Status.Indicator />
      </Status.Root>
    </Flex>
  );
};

export default ProductResumeItem;
