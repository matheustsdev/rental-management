"use client";

import { Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RentFormType } from "@/organisms/AddRentModal";
import { useFormContext, useWatch } from "react-hook-form";
import ProductSelectorItem from "@/atoms/ProductSelectorItem";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import InputField from "@/atoms/InputField";
import { EMeasureType } from "@/constants/EMeasureType";

interface IProductSelectorProps {
  availableProducts: ProductAvailabilityType[];
}

const ProductSelector: React.FC<IProductSelectorProps> = ({ availableProducts }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductAvailabilityType[]>(availableProducts);

  const {
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext<RentFormType>();
  const products = useWatch({ control, name: "products" });
  const rentDate = useWatch({ control, name: "rentDate" });
  const returnDate = useWatch({ control, name: "returnDate" });

  const toggleProductSelection = (productAvailability: ProductAvailabilityType) => {
    const { product } = productAvailability;

    const newFormProduct = {
      id: product.id,
      measure_type: product.categories?.measure_type ?? EMeasureType.DRESS,
      waist: 0,
    };

    if (!products || products.length === 0) {
      setValue("products", [newFormProduct]);

      return;
    }

    setValue(
      "products",
      products.some((item) => item.id === product.id)
        ? products.filter((item) => item.id !== product.id)
        : [...products, newFormProduct]
    );
  };

  useEffect(() => {
    const products = availableProducts.filter(
      ({ product }) =>
        product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.reference?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredProducts(searchText ? products : availableProducts);
  }, [availableProducts, searchText]);

  useEffect(() => {
    console.log("Filtered products >> ", rentDate, returnDate);
  }, [filteredProducts]);

  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField type="date" label="Data de saída" error={errors.rentDate} registerProps={register("rentDate")} />
        <InputField
          type="date"
          label="Data do retorno"
          error={errors.returnDate}
          registerProps={register("returnDate")}
        />
      </Flex>
      <Input
        placeholder="Buscar produto..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        mb={4}
        px="4"
      />

      <Flex align="flex-start" gap="4" flexDir="column" overflowY="auto" w="full">
        {(!rentDate || !returnDate) && (
          <Flex align="center" justify="center" w="full">
            <Text>Informe a data do aluguel e do retorno</Text>
          </Flex>
        )}
        {availableProducts.length > 0 && filteredProducts.length === 0 && (
          <Flex align="center" justify="center" w="full">
            <Text>Nenhum aluguel encontrado</Text>
          </Flex>
        )}

        {filteredProducts.map((productAvailability) => (
          <ProductSelectorItem
            key={productAvailability.product.id}
            productAvailability={productAvailability}
            isSelected={products.some((item) => item.id === productAvailability.product.id)}
            onChangeSelection={toggleProductSelection}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductSelector;
