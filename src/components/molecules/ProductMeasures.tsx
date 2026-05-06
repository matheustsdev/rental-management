"use client";

import { Accordion, Flex } from "@chakra-ui/react";
import ProductMeasureItem from "@/components/atoms/ProductMeasureItem";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { RentFormType } from "../organisms/AddRentModal";
import { useMemo } from "react";
import RentFinancialSummary from "./RentFinancialSummary";

const ProductMeasures: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RentFormType>();

  const { fields: rentProducts } = useFieldArray({
    control,
    name: "rentProducts",
  });

  const allAvailableProducts = useWatch({ control, name: "allAvailableProducts" }) ?? [];

  const productsMap = useMemo(() => {
    const map = new Map<string, ProductAvailabilityType>();

    allAvailableProducts.forEach((product: ProductAvailabilityType) => map.set(product.id, product));

    return map;
  }, [allAvailableProducts]);

  const productIds = useMemo(() => {
    return rentProducts.map((field) => field.product_id);
  }, [rentProducts]);

  const productIdsKey = useMemo(() => productIds.join(","), [productIds]);

  return (
    <Flex flexDir="column" gap={4} align="center" w="full" pb="4">
      <Flex w="full" align="center" justify="space-between" gap="12" flexDir="column">
        <Accordion.Root
          key={productIdsKey}
          display="flex"
          flexDirection="column"
          gap="4"
          multiple
          defaultValue={productIds}
        >
          {rentProducts.map((field, index) => {
            const productAvailability = productsMap.get(field.product_id);

            if (!productAvailability) return null;

            const hasError = !!(errors.rentProducts && errors.rentProducts[index]);

            return (
              <ProductMeasureItem
                key={field.id}
                productAvailability={productAvailability}
                hasError={hasError}
                index={index}
              />
            );
          })}
        </Accordion.Root>
      </Flex>

      <RentFinancialSummary />
    </Flex>
  );
};

export default ProductMeasures;
