"use client";

import { Accordion, Flex } from "@chakra-ui/react";
import ProductMeasureItem from "@/components/atoms/ProductMeasureItem";
import { useFormContext, useWatch } from "react-hook-form";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { RentFormType } from "../organisms/AddRentModal";
import { useMemo } from "react";

const ProductMeasures: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RentFormType>();

  const rentProducts = useWatch({ control, name: "rentProducts" }) || [];
  const allAvailableProducts = useWatch({ control, name: "allAvailableProducts" }) || [];
  const filteredProducts = useMemo(() => {
    return (allAvailableProducts as ProductAvailabilityType[]).filter((availableProduct: ProductAvailabilityType) =>
      rentProducts.some((rentProduct) => rentProduct.product_id === availableProduct.id),
    );
  }, [allAvailableProducts, rentProducts]);

  const productIds = useMemo(() => {
    return filteredProducts.map((item) => item.id);
  }, [filteredProducts]);

  const productIdsKey = useMemo(() => productIds.join(","), [productIds]);

  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Flex w="full" align="center" justify="space-between" gap="12" flexDir="column">
        <Accordion.Root
          key={productIdsKey}
          display="flex"
          flexDirection="column"
          gap="4"
          multiple
          defaultValue={productIds}
        >
          {filteredProducts.map((rentProduct) => {
            const rentProductId = rentProducts.findIndex((item) => item.product_id === rentProduct.id);
            const hasError = !!(errors.rentProducts && errors.rentProducts[rentProductId]);

            return <ProductMeasureItem key={rentProduct.id} productAvailability={rentProduct} hasError={hasError} />;
          })}
        </Accordion.Root>
      </Flex>
    </Flex>
  );
};

export default ProductMeasures;
