"use client";

import React from "react";
import { Flex, Text, Box, Grid, GridItem } from "@chakra-ui/react";
import { RentSummaryDTO } from "@/types/entities/RentType";
import TextRow from "@/components/atoms/TextRow";
import Tag from "@/components/atoms/Tag";
import Currency from "@/utils/models/Currency";
import { format } from "date-fns";
import { measureFieldsLabels } from "@/constants/MeasureFields";
import { EMeasureType, MeasureType } from "@/constants/EMeasureType";
import { Helper } from "@/utils/Helper";

interface IRentSummaryDetailsProps {
  rent: RentSummaryDTO;
}

const RentSummaryDetails: React.FC<IRentSummaryDetailsProps> = ({ rent }) => {
  const isFinished = rent.status === "FINISHED";
  
  const discountAmount = rent.discount_type === "PERCENTAGE" 
    ? Number(rent.total_value) * (Number(rent.discount_value) / 100)
    : Number(rent.discount_value);

  const subtotal = Number(rent.total_value) + discountAmount;

  return (
    <Flex direction="column" gap="6">
      <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
        <Flex justify="space-between" align="center" mb="4">
          <Text fontWeight="bold" fontSize="lg">
            Pedido #{rent.code.toString()}
          </Text>
          <Tag 
            label={isFinished ? "Finalizado" : "Agendado"} 
            bg={isFinished ? "green.500" : "blue.500"}
            p="2"
          />
        </Flex>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
          <GridItem>
            <Text fontWeight="bold" mb="2" color="primary.500">
              Cliente
            </Text>
            <TextRow label="Nome" value={rent.client_name} />
            <TextRow label="Telefone" value={rent.phone ?? "-"} />
            <TextRow label="Endereço" value={rent.address ?? "-"} />
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" mb="2" color="primary.500">
              Datas
            </Text>
            <TextRow label="Retirada" value={format(new Date(rent.rent_date), "dd/MM/yyyy")} />
            <TextRow label="Devolução" value={format(new Date(rent.return_date), "dd/MM/yyyy")} />
          </GridItem>
        </Grid>
      </Box>

      <Box>
        <Text fontWeight="bold" fontSize="lg" mb="4" color="primary.500">
          Produtos ({rent.rent_products.length})
        </Text>
        <Flex direction="column" gap="4">
          {rent.rent_products.map((rp) => {
            const mType = (rp.measure_type as MeasureType) ?? EMeasureType.NONE;
            const labelsMap = (measureFieldsLabels[mType] ?? {}) as Record<string, string>;
            const measureKeys = Helper.getObjectKeys(labelsMap);

            return (
              <Box key={rp.id} p="4" borderWidth="1px" borderRadius="md">
                <Flex justify="space-between" align="flex-start" mb="2">
                  <Box>
                    <Text fontWeight="bold">{rp.product_description}</Text>
                    {rp.products?.reference && (
                      <Text fontSize="sm" color="gray.600">
                        Ref: {rp.products.reference}
                      </Text>
                    )}
                  </Box>
                  <Text fontWeight="bold">{new Currency(Number(rp.product_price)).toString()}</Text>
                </Flex>

                {measureKeys.length > 0 && (
                  <Box mt="3" p="3" bg="gray.50" borderRadius="sm">
                    <Text fontSize="sm" fontWeight="bold" mb="2">
                      Medidas
                    </Text>
                    <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }} gap="2">
                      {measureKeys.map((key) => {
                        const val = (rp as Record<string, unknown>)[key];

                        if (val === null || val === undefined) return null;

                        return (
                          <GridItem key={key}>
                            <Text fontSize="xs" color="gray.500">
                              {labelsMap[key]}
                            </Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {String(val)} cm
                            </Text>
                          </GridItem>
                        );
                      })}
                    </Grid>
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text fontWeight="bold" fontSize="lg" mb="4" color="primary.500">
          Resumo Financeiro
        </Text>
        <Flex direction="column" gap="2">
          <Flex justify="space-between">
            <Text color="gray.600">Subtotal</Text>
            <Text>{new Currency(subtotal).toString()}</Text>
          </Flex>
          {discountAmount > 0 && (
            <Flex justify="space-between">
              <Text color="gray.600">Desconto</Text>
              <Text color="green.600">- {new Currency(discountAmount).toString()}</Text>
            </Flex>
          )}
          <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
            <Text fontWeight="bold">Total do Aluguel</Text>
            <Text fontWeight="bold">{new Currency(Number(rent.total_value)).toString()}</Text>
          </Flex>
          {Number(rent.signal_value) > 0 && (
            <>
              <Flex justify="space-between" mt="2">
                <Text color="gray.600">Sinal Recebido</Text>
                <Text>- {new Currency(Number(rent.signal_value)).toString()}</Text>
              </Flex>
              <Flex justify="space-between" pt="2" borderTopWidth="1px" mt="2">
                <Text fontWeight="bold" color="red.500">
                  Valor Restante
                </Text>
                <Text fontWeight="bold" color="red.500">
                  {new Currency(Number(rent.remaining_value)).toString()}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default RentSummaryDetails;
