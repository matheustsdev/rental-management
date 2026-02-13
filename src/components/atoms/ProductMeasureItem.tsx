"use client";

import { Flex, Text, Status, Accordion } from "@chakra-ui/react";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { measureFieldsLabels } from "@/constants/MeasureFields";
import InputField from "./InputField";
import { Path, useFormContext, useWatch } from "react-hook-form";
import Currency from "@/utils/models/Currency";
import { RentFormType } from "../organisms/AddRentModal";

interface IProductMeasureItemProps {
  productAvailability: ProductAvailabilityType;
}

const ProductMeasureItem: React.FC<IProductMeasureItemProps> = ({ productAvailability }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RentFormType>();

  const mType = productAvailability.categories?.measure_type;
  const labels = mType ? measureFieldsLabels[mType] : measureFieldsLabels.DRESS;

  const rentProducts = useWatch({ control, name: "rentProducts" });

  return (
    <Accordion.Item
      display="flex"
      flexDir="column"
      value={productAvailability.id}
      w="full"
      borderWidth={1}
      p={2}
      borderRadius="md"
      bg="green.50"
    >
      <Accordion.ItemTrigger>
        <Flex align="flex-start" justify="space-between" w="full">
          <Flex flexDir="column">
            <Text fontWeight="bold">{productAvailability.description}</Text>
            <Text fontSize="sm" color="gray.500">
              Ref: {productAvailability.reference} | {new Currency(productAvailability.price).toString()}
            </Text>
          </Flex>
          <Status.Root
            colorPalette={productAvailability.availability === EAvailabilityStatus.AVAILABLE ? "green" : "red"}
          >
            <Text fontSize="xs">
              {productAvailability.availability === EAvailabilityStatus.AVAILABLE ? "Disponível" : "Alugado"}
            </Text>
            <Status.Indicator />
          </Status.Root>
        </Flex>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Flex w="full" gap="4" pt="2">
          {Object.entries(labels).map(([field, label]) => {
            const productIndex = rentProducts.findIndex((item) => productAvailability.id === item.product_id);

            const name = `rentProducts.${productIndex}.${field}` as Path<RentFormType>;

            const fieldName = field as keyof typeof labels;

            const inputError =
              errors.rentProducts && errors.rentProducts[productIndex]
                ? errors.rentProducts[productIndex][fieldName]
                : undefined;

            return (
              <InputField
                key={name}
                label={label}
                registerProps={register(name, { valueAsNumber: true })}
                type="number"
                step={0.1}
                error={inputError}
              />
            );
          })}
        </Flex>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
};

export default ProductMeasureItem;
