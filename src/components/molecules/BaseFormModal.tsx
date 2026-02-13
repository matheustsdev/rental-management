import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { BaseSyntheticEvent, RefObject } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface IBaseFormModalProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  contentRef: RefObject<HTMLDivElement | null>;
  onSubmit: (e?: BaseSyntheticEvent) => void;
  methods: UseFormReturn<T>;
  children: React.ReactNode;
}

const BaseFormModal = <T extends FieldValues>({
  isOpen,
  onClose,
  contentRef,
  onSubmit,
  methods,
  children,
}: IBaseFormModalProps<T>) => {
  return (
    <FormProvider {...methods}>
      <Dialog.Root lazyMount open={isOpen} onOpenChange={() => onClose()} placement="center">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner p="4">
            <Dialog.Content
              as="form"
              p="4"
              bg="body.400"
              color="black"
              onSubmit={onSubmit}
              ref={contentRef}
              h="75vh"
              overflowY="auto"
            >
              {children}
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </FormProvider>
  );
};

export default BaseFormModal;
