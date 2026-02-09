"use client";

import { Flex, Text, Checkbox, Status } from "@chakra-ui/react";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import Currency from "@/models/Currency";

interface IProductSelectorItemProps {
  productAvailability: ProductAvailabilityType;
  isSelected: boolean;
  onChangeSelection: (product: ProductAvailabilityType) => void;
}

const ProductSelectorItem: React.FC<IProductSelectorItemProps> = ({
  productAvailability,
  isSelected,
  onChangeSelection,
}) => {
  return (
    <Flex
      key={productAvailability.id}
      w="full"
      borderWidth={1}
      p={2}
      borderRadius="md"
      bg={isSelected ? "green.50" : "white"}
    >
      <Checkbox.Root
        variant="outline"
        checked={isSelected}
        onChange={() => onChangeSelection(productAvailability)}
        w="full"
        disabled={productAvailability.availability !== EAvailabilityStatus.AVAILABLE}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label w="full">
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
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
};

export default ProductSelectorItem;
