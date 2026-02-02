"use client";

import SecondaryButton from "@/atoms/SecondaryButton";
import TextRow from "@/atoms/TextRow";
import Currency from "@/models/Currency";
import { RentType } from "@/types/entities/RentType";
import { formatDate } from "@/utils/formatDate";
import { Card, Flex } from "@chakra-ui/react";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";

interface IRentCardProps {
  rent: RentType;
  onClickPreview: (rent: RentType) => void;
  onEdit: (rent: RentType) => void;
}

const RentCard: React.FC<IRentCardProps> = ({ rent, onEdit, onClickPreview }) => {
  return (
    <Card.Root h="full" p="4" boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)" bg="terracotta.50">
      <Card.Header pb="2" fontWeight="bold">
        {Number(rent.code)} - {rent.client_name}
      </Card.Header>
      <Card.Body fontSize="sm" pb="4">
        <Flex flexDir="column">
          <TextRow
            label="Período do aluguel"
            value={`${formatDate(new Date(rent.rent_date), "dd 'de' MMM")} - ${rent.return_date ? formatDate(new Date(rent.return_date), "dd 'de' MMM") : ""}`}
          />
          <TextRow
            label="Sinal / Total"
            value={`${new Currency(rent.signal_value).toString()} / ${new Currency(rent.total_value).toString()}`}
          />
          <TextRow label="Telefone" value={rent?.phone ?? undefined} />
        </Flex>
      </Card.Body>
      <Card.Footer w="full">
        <Flex w="full" pt="4" align="center" justify="flex-start" gap="4">
          <SecondaryButton onClick={() => onClickPreview(rent)}>
            <MdOutlineRemoveRedEye />
            Ver mais
          </SecondaryButton>
          <SecondaryButton onClick={() => onEdit(rent)}>
            <MdEdit />
            Editar
          </SecondaryButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default RentCard;
