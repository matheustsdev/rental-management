"use client";

import { useState } from "react";
import PageContainer from "@/components/molecules/PageContainer";
import DefaultInput from "@/components/atoms/DefaultInput";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import ProductSearchInput from "@/components/molecules/ProductSearchInput";
import { ProductType } from "@/types/entities/ProductType";
import { api } from "@/services/api";
import { EAvailabilityStatus, EAvailabilityStatusType } from "@/constants/EAvailabilityStatus";
import RentCard from "@/components/molecules/RentCard";
import { RentType } from "@/types/entities/RentType";
import { toaster } from "@/components/atoms/Toaster";

type AvailabilityResult = {
  status: EAvailabilityStatusType;
  rent?: RentType;
};

export default function Availability() {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState<ProductType | null>(null);
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckAvailability = async () => {
    if (!date || !product) {
      toaster.create({
        title: "Erro de validação",
        description: "Por favor, selecione um produto e uma data.",
        type: "error",
        duration: 5000,
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await api.get<AvailabilityResult>("/availability", {
        params: {
          productId: product.id,
          date,
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro",
        description: "Erro ao verificar disponibilidade.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (loading) {
      return (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!result) {
      return null;
    }

    switch (result.status) {
      case EAvailabilityStatus.AVAILABLE:
        return (
          <div className="p-4 mt-8 bg-green-200 rounded-lg">
            <p className="font-bold text-center text-green-800">Produto Disponível!</p>
          </div>
        );
      case EAvailabilityStatus.BUFFER_OCCUPIED:
        return (
          <div className="p-4 mt-8 bg-yellow-200 rounded-lg">
            <p className="font-bold text-center text-yellow-800">Produto em limpeza</p>
            <p className="text-sm text-center text-yellow-700">O produto estará disponível em breve.</p>
          </div>
        );
      case EAvailabilityStatus.UNAVAILABLE:
        if (result.rent) {
          return (
            <div className="mt-8">
              <div className="p-4 mb-4 bg-red-200 rounded-lg">
                <p className="font-bold text-center text-red-800">Produto Alugado</p>
              </div>
              <RentCard rent={result.rent} menuItens={[]} />
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <PageContainer title="Verificar disponibilidade">
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
        <ProductSearchInput label="Produto" onProductSelected={(p) => setProduct(p)} />
        <DefaultInput type="date" label="Data" value={date} onChange={(e) => setDate(e.target.value)} />
        <PrimaryButton onClick={handleCheckAvailability} disabled={loading}>
          Verificar
        </PrimaryButton>

        <div className="mt-4">{renderResult()}</div>
      </div>
    </PageContainer>
  );
}
