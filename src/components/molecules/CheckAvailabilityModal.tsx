"use client";

import { Dialog, Portal, CloseButton, Separator, Text, Flex } from "@chakra-ui/react";
import AvailabilityChecker from "./AvailabilityChecker";
import { ProductType } from "@/types/entities/ProductType";

interface ICheckAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType | null;
}

const CheckAvailabilityModal: React.FC<ICheckAvailabilityModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={() => onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="4">
          <Dialog.Content
            p="6"
            bg="white"
            color="black"
            maxH="90vh"
            w="full"
            maxW="2xl"
            overflowY="auto"
            borderRadius="xl"
          >
            <Dialog.Header pb="4">
              <Text as="h3" textStyle="2xl" fontWeight="bold">
                Consultar Disponibilidade
              </Text>
            </Dialog.Header>

            <Dialog.Body pt="4">
              <Text color="gray.600" fontSize="md" pb="4">
                Verifique se o produto <strong>{product.reference} - {product.description}</strong> está disponível em uma data específica.
              </Text>
              <AvailabilityChecker product={product} />
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top="4" right="4" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CheckAvailabilityModal;
