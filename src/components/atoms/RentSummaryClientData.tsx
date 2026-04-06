"use client";

import React from "react";
import { Flex, Text, Box, Grid, GridItem } from "@chakra-ui/react";
import { RentSummaryDTO } from "@/types/entities/RentType";
import TextRow from "@/components/atoms/TextRow";
import Tag from "@/components/atoms/Tag";
import { formatDate } from "@/utils/formatDate";

interface IRentSummaryClientDataProps {
  rent: RentSummaryDTO;
}

const RentSummaryClientData: React.FC<IRentSummaryClientDataProps> = ({ rent }) => {
  const isFinished = rent.status === "FINISHED";

  return (
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
          <TextRow label="Retirada" value={formatDate(new Date(rent.rent_date), "dd/MM/yyyy")} />
          <TextRow label="Devolução" value={formatDate(new Date(rent.return_date), "dd/MM/yyyy")} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RentSummaryClientData;
