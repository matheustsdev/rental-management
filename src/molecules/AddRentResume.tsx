"use client";

import ProductResumeItem from "@/atoms/ProductResumeItem";
import ResumeItem from "@/atoms/ResumeItem";
import { RentFormType } from "@/organisms/AddRentModal";
import { ProductType } from "@/types/entities/ProductType";
import { Flex } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface IAddRentResumeProps {
  selectedProducts: ProductType[];
}

const AddRentResume: React.FC<IAddRentResumeProps> = ({ selectedProducts }) => {
  const { getValues } = useFormContext<RentFormType>();

  const values = getValues();

  return (
    <Flex flexDir="column" overflowY="auto">
      <ResumeItem prop="Cliente" value={values.clientName ?? ""} />
      <ResumeItem prop="Data do aluguel" value={values.rentDate ? new Date(values.rentDate).toDateString() : ""} />
      <ResumeItem
        prop="Data da devolução"
        value={values.returnDate ? new Date(values.returnDate).toDateString() : ""}
      />
      <ResumeItem prop="Valor total" value={values.totalValue?.toString()} />
      <ResumeItem prop="Desconto" value={values.discountValue?.toString()} />
      <ResumeItem prop="Valor a pagar" value={(values.totalValue - values.discountValue)?.toString()} />
      <ResumeItem prop="Sinal" value={values.signal?.toString()} />
      <ResumeItem prop="Restante" value={values.remainingValue?.toString()} />
      <ResumeItem prop="Observação para recibo" value={values?.receiptObservations} />
      <ResumeItem prop="Observação interna" value={values?.internalObservations} />
      <Flex flexDir="column" align="flex-start" pt="4" gap="2">
        {selectedProducts.map((product) => (
          <ProductResumeItem key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AddRentResume;
