"use client";

import { Accordion, Flex } from "@chakra-ui/react";
import ProductMeasureItem from "@/atoms/ProductMeasureItem";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";

interface IProductMeasuresProps {
  selectedProducts: ProductAvailabilityType[];
}

const ProductMeasures: React.FC<IProductMeasuresProps> = ({ selectedProducts }) => {
  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Flex w="full" align="center" justify="space-between" gap="12" flexDir="column">
        <Accordion.Root display="flex" flexDirection="column" gap="4">
          {selectedProducts.map((selectedProduct) => (
            <ProductMeasureItem key={selectedProduct.product.id} productAvailability={selectedProduct} />
          ))}
        </Accordion.Root>
      </Flex>
    </Flex>
  );
};

export default ProductMeasures;
