"use client";

import ProductResumeItem from "@/atoms/ProductResumeItem";
import ResumeItem from "@/atoms/ResumeItem";
import { RentFormType } from "@/organisms/AddRentModal";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { Flex } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { formatDate } from "@/utils/formatDate";
import Currency from "@/models/Currency";

interface IAddRentResumeProps {
  selectedProducts: ProductAvailabilityType[];
}

const AddRentResume: React.FC<IAddRentResumeProps> = ({ selectedProducts }) => {
  const { getValues } = useFormContext<RentFormType>();

  const values = getValues();

  return (
    <Flex flexDir="column" overflowY="auto">
      <ResumeItem prop="Cliente" value={values.clientName ?? ""} />
      <ResumeItem
        prop="Data do aluguel"
        value={values.rentDate ? formatDate(new Date(values.rentDate), "dd 'de' MMMM") : ""}
      />
      <ResumeItem
        prop="Data da devolução"
        value={values.returnDate ? formatDate(new Date(values.returnDate), "dd 'de' MMMM") : ""}
      />
      <ResumeItem prop="Valor total" value={new Currency(values.totalValue).toString()} />
      <ResumeItem prop="Desconto" value={new Currency(values.discountValue).toString()} />
      <ResumeItem prop="Valor a pagar" value={new Currency(values.totalValue - values.discountValue).toString()} />
      <ResumeItem prop="Sinal" value={new Currency(values.signal).toString()} />
      <ResumeItem prop="Restante" value={new Currency(values.remainingValue).toString()} />
      <ResumeItem prop="Observação para recibo" value={values?.receiptObservations} />
      <ResumeItem prop="Observação interna" value={values?.internalObservations} />
      <Flex flexDir="column" align="flex-start" pt="4" gap="2">
        {selectedProducts.map((product) => (
          <ProductResumeItem key={product.product.id} productAvailability={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AddRentResume;
