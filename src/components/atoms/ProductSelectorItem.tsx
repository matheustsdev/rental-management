"use client";

import { Flex, Text, Checkbox, Status } from "@chakra-ui/react";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import Currency from "@/utils/models/Currency";
import { availability_status } from "@prisma/client";

interface IProductSelectorItemProps {
  productAvailability: ProductAvailabilityType;
  isSelected: boolean;
  onChangeSelection: (product: ProductAvailabilityType) => void;
  forceSelected?: boolean;
}

const ProductSelectorItem: React.FC<IProductSelectorItemProps> = ({
  productAvailability,
  isSelected,
  onChangeSelection,
  forceSelected,
}) => {
  const getAvailabilityText = (availability: availability_status, forceSelected?: boolean) => {
    if (forceSelected) return "Selecionado";
    if (availability === EAvailabilityStatus.AVAILABLE) return "Disponível";
    if (availability === EAvailabilityStatus.UNAVAILABLE) return "Alugado";
    if (availability === EAvailabilityStatus.BUFFER_OCCUPIED) return "Em limpeza";

    return "";
  };

  const getAvailabilityColor = (availability: availability_status, forceSelected?: boolean) => {
    if (forceSelected) return "green";
    if (availability === EAvailabilityStatus.AVAILABLE) return "green";
    if (availability === EAvailabilityStatus.UNAVAILABLE) return "red";
    if (availability === EAvailabilityStatus.BUFFER_OCCUPIED) return "orange";

    return "";
  };

  const isDisabled = !forceSelected && productAvailability.availability !== EAvailabilityStatus.AVAILABLE;

  return (
    <Flex
      key={productAvailability.id}
      w="full"
      borderWidth={1}
      p={2}
      borderRadius="md"
      bg={isSelected || forceSelected ? "green.50" : "white"}
      opacity={isDisabled ? 0.6 : 1}
    >
      <Checkbox.Root
        variant="outline"
        checked={isSelected || forceSelected}
        onChange={() => !isDisabled && onChangeSelection(productAvailability)}
        w="full"
        disabled={isDisabled}
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
            <Status.Root colorPalette={getAvailabilityColor(productAvailability.availability, forceSelected)}>
              <Text fontSize="xs">{getAvailabilityText(productAvailability.availability, forceSelected)}</Text>
              <Status.Indicator />
            </Status.Root>
          </Flex>
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
};

export default ProductSelectorItem;
