import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Checkbox, Text } from "@chakra-ui/react";
import { EHierarchyStyle } from "../constants/enums/EHierarchyStyle";
import { Button } from "../atoms/Button";
import * as Yup from "yup";

interface IFormModal {
    children: React.ReactNode;
    title?: string;
    submitButtonTitle?: string;
    isOpen: boolean;
    onChangeStillAdding?: (stillAdding: boolean) => void;
    stillAddingValue?: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function FormModal({ children, isOpen, submitButtonTitle, onClose, title, onSubmit, onChangeStillAdding, stillAddingValue }: IFormModal) {

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
                    {
                        onChangeStillAdding ? (
                            <Flex w="full" justifyContent="space-between">
                                <Checkbox 
                                    isChecked={stillAddingValue}
                                    onChange={(e) => onChangeStillAdding(e.target.checked)}
                                >
                                    <Text fontSize="sm">
                                        Continuar adicionando
                                    </Text>
                                </Checkbox>
                                <Flex gap="4">
                                    <Button title="Fechar" hierarchy={EHierarchyStyle.SECONDARY} onClick={onClose} type="submit" />
                                    <Button title={submitButtonTitle ??"Adicionar"} hierarchy={EHierarchyStyle.PRIMARY} type="submit" />
                                </Flex>
                            </Flex>
                        ) : (
                            <Flex gap="4">
                                <Button title="Fechar" hierarchy={EHierarchyStyle.SECONDARY} onClick={onClose} type="submit" />
                                <Button title={submitButtonTitle ??"Adicionar"} hierarchy={EHierarchyStyle.PRIMARY} type="submit" />
                            </Flex>
                        )
                    }
                   
                </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}