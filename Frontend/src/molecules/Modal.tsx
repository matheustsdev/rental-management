import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, UseDisclosureReturn, Form, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { EHierarchyStyle } from "../constants/EHierarchyStyle";
import { Button } from "../atoms/Button";
import * as Yup from "yup";

interface IFormModal {
    children: React.ReactNode;
    title?: string;
    submitButtonTitle?: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function FormModal({ children, isOpen, submitButtonTitle, onClose, title, onSubmit }: IFormModal) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <form onSubmit={onSubmit}>
                {
                    title && (
                        <ModalHeader>{title}</ModalHeader>
                    )
                }
                <ModalCloseButton />
                <ModalBody>
                   {children}
                </ModalBody>
                <ModalFooter>
                    <Flex gap="4">
                        <Button title="Fechar" hierarchy={EHierarchyStyle.SECONDARY} onClick={onClose} type="submit" />
                        <Button title={submitButtonTitle ??"Adicionar"} hierarchy={EHierarchyStyle.PRIMARY} type="submit" />
                    </Flex>
                </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}