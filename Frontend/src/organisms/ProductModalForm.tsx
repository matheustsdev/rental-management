import { useState, useCallback } from "react";
import { Flex, UseDisclosureReturn } from "@chakra-ui/react";
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
    category: Yup.mixed().required("Campo obrigatório")
});

type FormSchemaType = {
    reference: string;
    price: number;
    description: string;
    receiptDescription: string;
    category: any;
}

interface IProductModalForm {
    disclosureHook: UseDisclosureReturn;
}

export function ProductModalForm({ disclosureHook }: IProductModalForm) {
    const { onClose, isOpen } = disclosureHook;
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm<FormSchemaType>({
        resolver: yupResolver(schema),
        reValidateMode: "onBlur",
        defaultValues: {
            reference: "",
            price: 0,
            description: "",
            receiptDescription: "",
            category: null
        }
    });
    
    const [stillAdding, setStillAdding] = useState(false);

    const submitForm = useCallback((data: FormSchemaType) => {
        console.log(data);
        
        if (stillAdding) {
            reset({
                reference: "",
                price: 0,
                description: "",
                receiptDescription: "",
                category: null
            });

            return;
        }

        onClose();
    }, [onClose, reset, stillAdding]);

    const onSubmit = handleSubmit(submitForm);

    return (
        <FormModal
            title="Adicionar produto"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            onChangeStillAdding={(value) => setStillAdding(value)}
            stillAddingValue={stillAdding}
        >
            <Flex direction="column" gap="4">
                <TextFieldController<FormSchemaType> 
                    control={control}
                    name="reference"
                    label="Referência"
                    error={errors.reference?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    name="price"
                    label="Preço"
                    error={errors.price?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    name="description"
                    label="Descrição"
                    error={errors.description?.message}
                />
                <TextFieldController<FormSchemaType> 
                    control={control}
                    name="receiptDescription"
                    label="Descrição para recibo"
                    error={errors.receiptDescription?.message}
                />
                <AutocompleteField<FormSchemaType>
                    control={control}
                    name="category"
                    label="Categoria"
                    setValue={setValue}
                    error={errors.category?.message}
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
