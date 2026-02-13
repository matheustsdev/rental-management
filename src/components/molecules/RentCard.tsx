"use client";

import TextRow from "@/components/atoms/TextRow";
import Currency from "@/utils/models/Currency";
import { RentType } from "@/types/entities/RentType";
import { formatDate } from "@/utils/formatDate";
import { Card, Flex, Separator, Text } from "@chakra-ui/react";
import ButtonMenu, { ButtonMenuItemsType } from "../atoms/ButtonMenu";
import { MdDateRange, MdOutlineAttachMoney, MdPhone } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import Tag from "../atoms/Tag";
import { RentHelper } from "@/utils/models/RentHelper";

interface IRentCardProps {
  rent: RentType;
  menuItens: ButtonMenuItemsType<RentType>[];
}

const RentCard: React.FC<IRentCardProps> = ({ rent, menuItens }) => {
  return (
    <Card.Root
      display="flex"
      flexDir="row"
      alignItems="flex-start"
      minH="full"
      w="full"
      boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)"
      borderRadius="xl"
    >
      <Flex w="full" minH="full" borderRadius="xl">
        <Flex bg={RentHelper.getStatusColor(rent.status)} minH="full" w="6" borderLeftRadius="xl" />
        <Flex direction="column" p="4" w="full" h="full">
          <Card.Header pb="4" display="flex" flexDir="column">
            <Flex w="full" justify="space-between" align="flex-start">
              <Text as="h3" textStyle="2xl" fontWeight="bold" style={{ lineHeight: "1rem" }}>
                {rent.client_name}
              </Text>
              <Tag w="24" label={RentHelper.getStatusLabel(rent.status)} bg={RentHelper.getStatusColor(rent.status)} />
            </Flex>
            <TextRow
              color="gray.500"
              fontSize="sm"
              iconSize="md"
              icon={<MdDateRange />}
              value={`${formatDate(new Date(rent.rent_date), "dd 'de' MMM")} - ${rent.return_date ? formatDate(new Date(rent.return_date), "dd 'de' MMM") : ""}`}
            />
            <Separator />
          </Card.Header>
          <Card.Body fontSize="sm" pb="4">
            <Flex flexDir="column" gap="1">
              <TextRow
                icon={<MdOutlineAttachMoney />}
                value={`${new Currency(rent.total_value).toString()} (${new Currency(rent.signal_value).toString()})`}
              />
              <TextRow icon={<MdPhone />} value={rent?.phone ?? undefined} />
            </Flex>
          </Card.Body>
          <Card.Footer w="full">
            <Flex w="full" pt="4" align="center" justify="flex-end">
              <ButtonMenu items={menuItens} actionData={rent} justifyContent="space-between">
                Ver mais
                <IoChevronForward />
              </ButtonMenu>
            </Flex>
          </Card.Footer>
        </Flex>
      </Flex>
    </Card.Root>
  );
};

export default RentCard;
