"use client";

import { Field, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RentFormType } from "@/organisms/AddRentModal";
import { useFormContext, useWatch } from "react-hook-form";
import ProductSelectorItem from "@/atoms/ProductSelectorItem";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import InputField from "@/atoms/InputField";
import { EMeasureType } from "@/constants/EMeasureType";
import { ProductWithMeasureRentDtoType } from "@/types/entities/RentType";

const ProductSelector: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductAvailabilityType[]>([]);

  const {
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext<RentFormType>();
  const products = useWatch({ control, name: "products" });
  const productsIds = useWatch({ control, name: "productIds" });
  const rentDate = useWatch({ control, name: "rentDate" });
  const returnDate = useWatch({ control, name: "returnDate" });
  const availableProducts = useWatch({ control, name: "allAvailableProducts" });

  const toggleProductSelection = (productAvailability: ProductAvailabilityType) => {
    const { product } = productAvailability;

    const newFormProduct: ProductWithMeasureRentDtoType = {
      id: product.id,
      measure_type: product.categories?.measure_type ?? EMeasureType.DRESS,
      waist: undefined,
      bust: undefined,
      hip: undefined,
      shoulder: undefined,
      sleeve: undefined,
      height: undefined,
      back: undefined,
    };

    if (!products || products.length === 0) {
      setValue("products", [newFormProduct]);
      setValue("productIds", [newFormProduct.id]);

      return;
    }

    const newProductList: ProductWithMeasureRentDtoType[] = products.some((item) => item.id === product.id)
      ? products.filter((item) => item.id !== product.id)
      : [...products, newFormProduct];

    setValue("products", newProductList);
    setValue(
      "productIds",
      newProductList.map((product) => product.id)
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

  return (
    <Flex flexDir="column" gap={4} align="center" w="full">
      <Flex w="full" align="center" justify="space-between" gap="12">
        <InputField type="date" label="Data de saída" error={errors.rentDate} registerProps={register("rentDate")} />
        <InputField
          type="date"
          label="Data de devolução"
          error={errors.returnDate}
          registerProps={register("returnDate")}
        />
      </Flex>
      <Field.Root invalid={!!errors.productIds?.message} mb={4}>
        <Input
          placeholder="Buscar produto..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          px="4"
        />
        <Field.ErrorText>{errors.productIds?.message}</Field.ErrorText>
      </Field.Root>

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
