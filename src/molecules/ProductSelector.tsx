"use client";

import { Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import { RentFormType } from "@/organisms/AddRentModal";
import { useFormContext, useWatch } from "react-hook-form";
import ProductSelectorItem from "@/atoms/ProductSelectorItem";

interface IProductSelectorProps {
  availableProducts: ProductType[];
}

const ProductSelector: React.FC<IProductSelectorProps> = ({ availableProducts }) => {
  const [searchText, setSearchText] = useState("");

  const { setValue, control } = useFormContext<RentFormType>();
  const productsIds = useWatch({ control, name: "productsIds" });

  const filteredProducts = availableProducts.filter(
    (product) =>
      product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleProductSelection = (product: ProductType) => {
    if (!productsIds || productsIds.length === 0) {
      setValue("productsIds", [product.id]);

      return;
    }

    setValue(
      "productsIds",
      productsIds.some((id) => id === product.id)
        ? productsIds.filter((id) => id !== product.id)
        : [...productsIds, product.id]
    );
  };

  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Input
        placeholder="Buscar produto..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        mb={4}
        px="4"
      />

      <Flex align="flex-start" gap="4" flexDir="column" overflowY="auto" w="full">
        {filteredProducts.map((product) => (
          <ProductSelectorItem
            key={product.id}
            product={product}
            isSelected={productsIds.some((id) => id === product.id)}
            onChangeSelection={toggleProductSelection}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductSelector;
