import { useState, useCallback, useEffect } from "react";
import { Flex, UseDisclosureReturn } from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldController } from "../molecules/TextFieldController";
import { FormModal } from "../molecules/Modal";
import { AutocompleteField } from "../molecules/AutocompleteField";
import { EFormMode } from "../constants/enums/EFormMode";
import { categoryApi } from "../services/api";
import { productApi } from "../services/api/productApi";
import { CategoryType } from "../types/entities/category";
import { ProductType } from "../types/entities/product";

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
    formMode: EFormMode;
    onSave?: (product: ProductType) => void;
    product?: ProductType | null;
}

export function ProductModalForm({ disclosureHook, formMode, onSave, product }: IProductModalForm) {
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
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const getAllCategories = useCallback(async () => {
        try {
            const response = await categoryApi.get();
            
            setCategories(response.data.result);

        } catch (error) {
            console.log(error);
        }
    }, []);

    const submitForm = useCallback(async (data: FormSchemaType) => {
        if (formMode === EFormMode.CREATE) {
        
            const createRequest = await productApi.post({
                categoryId: data.category.id,
                description: data.description,
                price: data.price,
                receiptDescription: data.receiptDescription,
                reference: data.reference
            });

            onSave && onSave(createRequest.data.result);
        }

        if (formMode === EFormMode.UPDATE && product) {
            const updatedProduct = await productApi.put({
                id: product.id,
                categoryId: data.category.id,
                description: data.description,
                price: data.price,
                receiptDescription: data.receiptDescription,
                reference: data.reference
            });

            onSave && onSave(updatedProduct.data.result);
        }

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
    }, [formMode, onClose, onSave, reset, stillAdding]);

    const onSubmit = handleSubmit(submitForm);

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setValue("reference", product.reference);
            setValue("price", product.price);
            setValue("description", product.description);
            setValue("receiptDescription", product.receiptDescription);
            setValue("category", product.category);
        }
    }, [product]);

    return (
        <FormModal
            title="Adicionar produto"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            onChangeStillAdding={formMode === EFormMode.CREATE ? (value) => setStillAdding(value) : undefined}
            stillAddingValue={stillAdding}
            submitButtonTitle={formMode === EFormMode.CREATE ? "Adicionar" : "Atualizar"}
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
                    options={categories}
                    optionsLabel={(option) => option?.name ?? ""}
                />                       
            </Flex>
        </FormModal>
    )
}
