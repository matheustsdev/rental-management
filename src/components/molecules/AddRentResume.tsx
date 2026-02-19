"use client";

import ProductResumeItem from "@/components/atoms/ProductResumeItem";
import ResumeItem from "@/components/atoms/ResumeItem";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { Accordion, Flex } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { formatDate } from "@/utils/formatDate";
import Currency from "@/utils/models/Currency";
import { useEffect, useState } from "react";
import { RentFormType } from "../organisms/AddRentModal";
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput";

const AddRentResume: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<ProductAvailabilityType[]>([]);
  const { control } = useFormContext<RentFormType>();
  const formValues = useWatch({ control });
  const productsIds = useWatch({ control, name: "productIds" });
  const allAvailableProducts: ProductAvailabilityType[] = useWatch({ control, name: "allAvailableProducts" });

  useEffect(() => {
    const newListOfProducts = allAvailableProducts.filter((availableProduct) =>
      productsIds.some((productId) => productId === availableProduct.id),
    );

    setSelectedProducts(newListOfProducts);
  }, [productsIds, allAvailableProducts]);

  return (
    <Flex flexDir="column" overflowY="auto">
      <ResumeItem prop="Cliente" value={formValues.clientName ?? ""} />
      <ResumeItem
        prop="Data do aluguel"
        value={formValues.rentDate ? formatDate(getUTCDateFromInput(formValues.rentDate), "dd 'de' MMMM") : ""}
      />
      <ResumeItem
        prop="Data da devolução"
        value={formValues.returnDate ? formatDate(getUTCDateFromInput(formValues.returnDate), "dd 'de' MMMM") : ""}
      />
      <ResumeItem prop="Valor total" value={new Currency(formValues.totalValue).toString()} />
      <ResumeItem prop="Desconto" value={new Currency(formValues.discountValue).toString()} />
      <ResumeItem prop="Valor a pagar" value={new Currency(formValues.finalTotalValue).toString()} />
      <ResumeItem prop="Sinal" value={new Currency(formValues.signal).toString()} />
      <ResumeItem prop="Restante" value={new Currency(formValues.remainingValue).toString()} />
      <ResumeItem prop="Observação interna" value={formValues?.internalObservations ?? ""} />
      <ResumeItem prop="Observação para recibo" value={formValues?.receiptObservations ?? ""} />
      <Accordion.Root display="flex" flexDirection="column" gap="4">
        {selectedProducts.map((product) => (
          <ProductResumeItem key={product.id} productAvailability={product} />
        ))}
      </Accordion.Root>
      <Flex flexDir="column" align="flex-start" pt="4" gap="2"></Flex>
    </Flex>
  );
};

export default AddRentResume;
