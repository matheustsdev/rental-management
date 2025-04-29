"use client";

import { Flex, Text, Checkbox } from "@chakra-ui/react";
import { ProductType } from "@/types/entities/ProductType";

interface IProductSelectorItemProps {
  product: ProductType;
  isSelected: boolean;
  onChangeSelection: (product: ProductType) => void;
}

const ProductSelectorItem: React.FC<IProductSelectorItemProps> = ({ product, isSelected, onChangeSelection }) => {
  return (
    <Flex key={product.id} w="full" borderWidth={1} p={2} borderRadius="md" bg={isSelected ? "green.50" : "white"}>
      <Checkbox.Root variant="outline" checked={isSelected} onChange={() => onChangeSelection(product)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>
          <Flex flexDir="column" flex={1}>
            <Text fontWeight="bold">{product.description}</Text>
            <Text fontSize="sm" color="gray.500">
              Ref: {product.reference} | R$ {product.price.toFixed(2)}
            </Text>
          </Flex>
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
};

export default ProductSelectorItem;
