"use client";

import TextRow from "@/components/atoms/TextRow";
import Currency from "@/models/Currency";
import { RentType } from "@/types/entities/RentType";
import { formatDate } from "@/utils/formatDate";
import { Card, Flex } from "@chakra-ui/react";
import ButtonMenu, { ButtonMenuItemsType } from "../atoms/ButtonMenu";
import { MdArrowDropDown } from "react-icons/md";

interface IRentCardProps {
  rent: RentType;
  menuItens: ButtonMenuItemsType<RentType>[];
}

const RentCard: React.FC<IRentCardProps> = ({ rent, menuItens }) => {
  return (
    <Card.Root minH="full" w="full" p="4" boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)" bg="terracotta.50">
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
        <Flex w="full" pt="4" align="center" justify="flex-end" gap="4">
          <ButtonMenu items={menuItens} actionData={rent} justifyContent="space-between" gap="4">
            Ver mais
            <MdArrowDropDown />
          </ButtonMenu>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default RentCard;
