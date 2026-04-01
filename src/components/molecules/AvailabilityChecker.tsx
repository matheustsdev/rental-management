"use client";

import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { AvailabilityType } from "@/types/entities/AvailabilityType";
import { toaster } from "@/components/atoms/Toaster";
import InputField from "@/components/atoms/InputField";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import RentCard from "./RentCard";
import { ProductType } from "@/types/entities/ProductType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";

const availabilitySchema = z.object({
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de fim é obrigatória"),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "A data de fim deve ser igual ou posterior à data de início",
  path: ["endDate"],
});

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

interface IAvailabilityCheckerProps {
  product: ProductType;
}

const AvailabilityChecker: React.FC<IAvailabilityCheckerProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
  });

  const onCheckAvailability = async (data: AvailabilityFormData) => {
    try {
      setIsLoading(true);
      setAvailability(null);

      const response = await api.get("/availability", {
        params: {
          productId: product.id,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      });

      setAvailability(response.data.data);
    } catch (error: any) {
      toaster.create({
        type: "error",
        title: "Erro ao consultar disponibilidade",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDisplay = () => {
    if (!availability) return null;

    const { status } = availability;

    switch (status) {
      case EAvailabilityStatus.AVAILABLE:
        return (
          <Box p="4" bg="green.100" color="green.800" borderRadius="md" w="full">
            <Text fontWeight="bold">Disponível</Text>
            <Text fontSize="sm">O produto está disponível para o período selecionado.</Text>
          </Box>
        );
      case EAvailabilityStatus.UNAVAILABLE:
        return (
          <VStack align="stretch" gap="4" w="full">
            <Box p="4" bg="red.100" color="red.800" borderRadius="md">
              <Text fontWeight="bold">Indisponível / Alugado</Text>
              <Text fontSize="sm">O produto já possui um aluguel para este período.</Text>
            </Box>
            {availability.conflictingRent && (
              <>
                <Text fontWeight="medium" fontSize="sm">Aluguel conflitante:</Text>
                <RentCard rent={availability.conflictingRent} menuItens={[]} />
              </>
            )}
          </VStack>
        );
      case EAvailabilityStatus.BUFFER_OCCUPIED:
        return (
          <VStack align="stretch" gap="4" w="full">
            <Box p="4" bg="yellow.100" color="yellow.800" borderRadius="md">
              <Text fontWeight="bold">Em Preparação / Buffer</Text>
              <Text fontSize="sm">O período solicitado cai no intervalo de higienização de um aluguel.</Text>
            </Box>
            {availability.conflictingRent && (
              <>
                <Text fontWeight="medium" fontSize="sm">Aluguel que gerou o buffer:</Text>
                <RentCard rent={availability.conflictingRent} menuItens={[]} />
              </>
            )}
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <VStack gap="6" w="full" align="flex-start">
      <Flex as="form" onSubmit={handleSubmit(onCheckAvailability)} w="full" gap="4" flexDir={{ base: "column", md: "row" }} align="center">
        <InputField
          label="Data Início"
          type="date"
          registerProps={register("startDate")}
          error={errors.startDate}
        />
        <InputField
          label="Data Fim"
          type="date"
          registerProps={register("endDate")}
          error={errors.endDate}
        />
        <PrimaryButton type="submit" loading={isLoading} minW="120px">
          Verificar
        </PrimaryButton>
      </Flex>


      {isLoading && (
        <Flex w="full" justify="center" py="4">
          <Spinner color="primary.500" />
        </Flex>
      )}

      {getStatusDisplay()}
    </VStack>
  );
};

export default AvailabilityChecker;
