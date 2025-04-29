"use client";

import { Flex, Text } from "@chakra-ui/react";
import { ProductType } from "@/types/entities/ProductType";

interface IProductResumeItemProps {
  product: ProductType;
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
    </Flex>
  );
};

export default ProductResumeItem;
