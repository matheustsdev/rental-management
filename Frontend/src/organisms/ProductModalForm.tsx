import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, UseDisclosureReturn, Form, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { EHierarchyStyle } from "../constants/EHierarchyStyle";
import { Button } from "../atoms/Button";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldController } from "../molecules/TextFieldController";
import { FormModal } from "../molecules/Modal";
import { AutocompleteField } from "../molecules/AutocompleteField";

const schema = Yup.object().shape({
    reference: Yup.string().required("Campo obrigatório"),
    price: Yup.number().required("Campo obrigatório"),
    description: Yup.string().required("Campo obrigatório"),
    receiptDescription: Yup.string().required("Campo obrigatório"),
    categoryId: Yup.string().required("Campo obrigatório")
});

type FormSchemaType = {
    reference: string;
    price: number;
    description: string;
    receiptDescription: string;
    categoryId: string;
}

interface IProductModalForm {
    disclosureHook: UseDisclosureReturn;
}

export function ProductModalForm({ disclosureHook }: IProductModalForm) {
    const { onClose, isOpen } = disclosureHook;
    const { control, setValue, formState: { errors }, handleSubmit } = useForm<FormSchemaType>({
        resolver: yupResolver(schema),
        reValidateMode: "onBlur"
    })

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <FormModal
            title="Adicionar produto"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
        >
            <Flex direction="column" gap="4">
                <TextFieldController<FormSchemaType> 
                    control={control}
                    setValue={setValue}
                    name="reference"
                    label="Referência"
                    error={errors.reference?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    setValue={setValue}
                    name="price"
                    label="Preço"
                    error={errors.price?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    setValue={setValue}
                    name="description"
                    label="Descrição"
                    error={errors.description?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    setValue={setValue}
                    name="receiptDescription"
                    label="Descrição para recibo"
                    error={errors.receiptDescription?.message}
                />
                <AutocompleteField<FormSchemaType>
                    control={control}
                    setValue={setValue}
                    name="categoryId"
                    label="Categoria"
                    error={errors.categoryId?.message}
                    options={[
                        {id: "1", name: "Categoria 1"},
                        {id: "2", name: "Categoria 2"},
                        {id: "3", name: "Categoria 3"},
                        {id: "4", name: "Categoria 4"}
                    ]}
                    optionsLabel={(option) => option.name}
                />                       
            </Flex>
        </FormModal>
    )
}