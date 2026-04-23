"use client";

import React from "react";
import { Dialog, Portal, CloseButton, Flex } from "@chakra-ui/react";
import { RentType } from "@/types/entities/RentType";
import RentSummaryDetails from "../molecules/RentSummaryDetails";
import SecondaryButton from "../atoms/SecondaryButton";

interface IRentSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  rent: RentType;
}

const RentSummaryModal: React.FC<IRentSummaryModalProps> = ({ isOpen, onClose, rent }) => {
  if (!rent) return null;

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={() => onClose()} placement="center" size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="4">
          <Dialog.Content p="6" bg="white" color="black" maxH="90vh" overflowY="auto" borderRadius="xl">
            <Dialog.Header pb="4">
              <Dialog.Title fontSize="2xl" fontWeight="bold">
                Resumo do Aluguel
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <RentSummaryDetails rent={rent} />
            </Dialog.Body>

            <Dialog.Footer pt="6">
              <Flex w="full" justify="flex-end">
                <SecondaryButton onClick={onClose}>Fechar</SecondaryButton>
              </Flex>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="2xl" position="absolute" top="2" right="4" _hover={{ bg: "transparent" }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default RentSummaryModal;
