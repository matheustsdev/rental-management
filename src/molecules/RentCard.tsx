"use client";

import PrimaryButton from "@/atoms/PrimaryButton";
import { RentType } from "@/types/entities/RentType";
import { Card, Flex, Text } from "@chakra-ui/react";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";

interface IRentCardProps {
  rent: RentType;
  onEdit: (rent: RentType) => void;
}

const RentCard: React.FC<IRentCardProps> = ({ rent, onEdit }) => {
  return (
    <Card.Root p="4" boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)" bg="terracotta.50">
      <Card.Header pb="2" fontWeight="bold">
        {rent.client_name}
      </Card.Header>
      <Card.Body>
        <Flex flexDir="column">
          <Text>
            {rent.rent_date} - {rent.return_date}
          </Text>
          <Text>
            R$ {rent.signal_value}/{rent.total_value}
          </Text>
          <Text>{rent.phone}</Text>
        </Flex>
      </Card.Body>
      <Card.Footer w="full">
        <Flex w="full" pt="4" align="center" justify="flex-end" gap="4">
          <PrimaryButton onClick={() => onEdit(rent)}>
            <MdOutlineRemoveRedEye />
            Ver mais
          </PrimaryButton>
          <PrimaryButton onClick={() => onEdit(rent)}>
            <MdEdit />
            Editar
          </PrimaryButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default RentCard;
