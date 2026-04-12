"use client";

import { CloseButton, Dialog, Portal, Input, Flex, Field, Spinner, Checkbox } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toaster } from "@/components/atoms/Toaster";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import Select from "@/components/atoms/Select";
import { CategoryType } from "@/types/entities/CategoryType";
import { ProductType, ProductUpdateWithCategoryDtoType } from "@/types/entities/ProductType";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import { CreateProductDTO } from "@/core/application/dtos/CreateProductDTO";
import { handleFrontendError } from "@/utils/handleFrontendError";

const productSchema = z.object({
  description: z.string().trim().min(2, "A descrição deve possuir no mínimo 2 caracteres"),
  categoryId: z.string().uuid("Selecione uma categoria"),
  price: z.number({ invalid_type_error: "Preço inválido" }).positive("O preço deve ser maior que 0"),
  receiptDescription: z.string().trim().optional().or(z.literal("")),
  reference: z.string().trim().min(2, "A referência deve possuir no mínimo 2 caracteres"),
});

type ProductFormType = z.infer<typeof productSchema>;

interface IAddProductModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: (newProduct: ProductType) => void;
  productOnEdit: ProductType | null;
}

const AddProductModal: React.FC<IAddProductModalProps> = ({ isOpen, onClose, onSave, productOnEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isInfiniteAdd, setIsInfiniteAdd] = useState<boolean>(false);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      description: "",
      categoryId: "",
      price: undefined,
      receiptDescription: "",
      reference: "",
    },
  });
  const categoryId = useWatch({ control, name: "categoryId" });
  const contentRef = useRef<HTMLDivElement>(null);

  const createProduct = async (data: ProductFormType) => {
    try {
      setIsLoading(true);

      const { categoryId, description, receiptDescription, price, reference } = data;

      const productInsertData: CreateProductDTO = {
        price,
        reference,
        description,
        category_id: categoryId,
        receipt_description: receiptDescription,
      };

      const newProductRequest = await api.post("products", productInsertData);

      if (newProductRequest.status !== 201)
        throw new Error(newProductRequest.data?.message ?? newProductRequest.statusText);

      toaster.create({
        type: "success",
        title: "Produto cadastrado!",
        description: newProductRequest.data.message,
      });

      onSave(newProductRequest.data.data);

      reset();

      if (!isInfiniteAdd) onClose();
    } catch (e: unknown) {
      handleFrontendError(e, "Erro ao salvar");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (data: ProductFormType) => {
    try {
      setIsLoading(true);

      const { categoryId, description, receiptDescription, price, reference } = data;

      const productInsertData: ProductUpdateWithCategoryDtoType = {
        id: productOnEdit?.id,
        price,
        reference,
        description,
        category_id: categoryId,
        receipt_description: receiptDescription,
      };

      const updatedProductRequest = await api.put("products", productInsertData);

      if (updatedProductRequest.status !== 200) throw new Error(updatedProductRequest.data.message);

      toaster.create({
        type: "success",
        title: "Produto atualizado!",
        description: updatedProductRequest.data.message,
      });

      onSave(updatedProductRequest.data.data);

      reset();

      if (!isInfiniteAdd) onClose();
    } catch (e: unknown) {
      handleFrontendError(e, "Erro ao salvar");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormType) => {
    if (productOnEdit) return updateProduct(data);

    return createProduct(data);
  };

  const loadCategories = async () => {
    try {
      const categoriesList: CategoryType[] = (await api.get("/categories")).data.data;

      setCategories(categoriesList);
    } catch (e: unknown) {
      handleFrontendError(e, "Erro ao buscar categorias");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!productOnEdit) {
      reset();

      return;
    }

    setValue("categoryId", productOnEdit.category_id ?? "");
    setValue("description", productOnEdit.description ?? "");
    setValue("price", Number(productOnEdit.price));
    setValue("receiptDescription", productOnEdit.receipt_description ?? "");
    setValue("reference", productOnEdit.reference);
  }, [productOnEdit, reset, setValue]);

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="4">
          <Dialog.Content
            as="form"
            p="4"
            bg="body.400"
            color="black"
            onSubmit={handleSubmit(onSubmit)}
            ref={contentRef}
          >
            <Dialog.Header py="4">
              <Dialog.Title>Adicionar produto</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex flexDir="column" gap={4} align="center">
                <Field.Root invalid={!!errors.description}>
                  <Field.Label>Nome</Field.Label>
                  <Input px="2" {...register("description")} />
                  <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.reference}>
                  <Field.Label>Referência</Field.Label>
                  <Input px="2" placeholder="Ex: Laptop" {...register("reference")} />
                  <Field.ErrorText>{errors.reference?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.receiptDescription}>
                  <Field.Label>Descrição para recibo</Field.Label>
                  <Input px="2" placeholder="Ex: Laptop" {...register("receiptDescription")} />
                  <Field.ErrorText>{errors.receiptDescription?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.categoryId}>
                  <Select
                    label="Categoria"
                    onChange={(value) => setValue("categoryId", value)}
                    selectedValue={categoryId}
                    options={categories.map((item) => ({ label: item.name, value: item.id }))}
                    dialogContentRef={contentRef}
                    onClear={() => setValue("categoryId", "")}
                  />
                  <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.price}>
                  <Field.Label>Preço (R$)</Field.Label>
                  <Input px="2" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                  <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
                </Field.Root>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer
              display="flex"
              alignItems="center"
              justifyContent={productOnEdit ? "flex-end" : "space-between"}
              pt="8"
            >
              {!productOnEdit && (
                <Checkbox.Root
                  checked={isInfiniteAdd}
                  onCheckedChange={(e) => setIsInfiniteAdd(!!e.checked)}
                  variant="outline"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Continuar adicionando</Checkbox.Label>
                </Checkbox.Root>
              )}
              <Flex gap="4">
                <Dialog.ActionTrigger asChild>
                  <SecondaryButton variant="outline" onClick={onClose}>
                    Cancelar
                  </SecondaryButton>
                </Dialog.ActionTrigger>
                <PrimaryButton w="24" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : productOnEdit ? "Atualizar" : "Adicionar"}
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

export default AddProductModal;
