"use client";

import { CloseButton, Dialog, Portal, Flex } from "@chakra-ui/react";
import PrimaryButton from "@/atoms/PrimaryButton";
import SecondaryButton from "@/atoms/SecondaryButton";

interface IConfirmationModalProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ isOpen, onClose, onSave, message }) => {
  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="4">
          <Dialog.Content maxW="320px" p="4" bg="body.400" color="black">
            <Dialog.Header py="4">
              <Dialog.Title>Confirmação</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex>{message ?? "Deseja confirmar essa ação?"}</Flex>
            </Dialog.Body>
            <Dialog.Footer display="flex" alignItems="center" justifyContent="flex-end" pt="8">
              <Flex gap="4">
                <Dialog.ActionTrigger asChild>
                  <SecondaryButton variant="outline" onClick={onClose}>
                    Cancelar
                  </SecondaryButton>
                </Dialog.ActionTrigger>
                <PrimaryButton w="24" onClick={() => onSave()}>
                  Salvar
                </PrimaryButton>
              </Flex>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;
