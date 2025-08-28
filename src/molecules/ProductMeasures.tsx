"use client";

import { Accordion, Flex } from "@chakra-ui/react";
import ProductMeasureItem from "@/atoms/ProductMeasureItem";
import { RentFormType } from "@/organisms/AddRentModal";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";

const ProductMeasures: React.FC = () => {
  const { control } = useFormContext<RentFormType>();

  const selectedProducts = useWatch({ control, name: "rentProducts" });
  const allAvailableProducts = useWatch({ control, name: "allAvailableProducts" });

  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Flex w="full" align="center" justify="space-between" gap="12" flexDir="column">
        <Accordion.Root display="flex" flexDirection="column" gap="4">
          {allAvailableProducts
            .filter((availableProduct: ProductAvailabilityType) =>
              selectedProducts.some((selectedProduct) => selectedProduct.id === availableProduct.product.id)
            )
            .map((selectedProduct) => (
              <ProductMeasureItem key={selectedProduct.product.id} productAvailability={selectedProduct} />
            ))}
        </Accordion.Root>
      </Flex>
    </Flex>
  );
};

export default ProductMeasures;
