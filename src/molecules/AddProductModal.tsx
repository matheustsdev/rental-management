"use client";

import { CloseButton, Dialog, Portal, Input, Flex, Field, Spinner, Checkbox } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toaster } from "@/atoms/Toaster";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import Select from "@/atoms/Select";
import { CategoryType } from "@/types/entities/CategoryType";
import { ProductInsertDtoType, ProductType } from "@/types/entities/ProductType";
import PrimaryButton from "@/atoms/PrimaryButton";
import SecondaryButton from "@/atoms/SecondaryButton";

const productSchema = z.object({
  description: z.string().min(10, "Campo deve possuir, no mínimo, 10 caracteres"),
  categoryId: z.string().uuid(),
  price: z.number({ invalid_type_error: "Preço inválido" }).positive("O campo deve ser maior que 0"),
  receiptDescription: z.string().min(2, "Campo deve possuir, no mínimo, 3 caracteres"),
  reference: z.string().min(3, "Campo deve possuir, no mínimo, 3 caracteres"),
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
  });
  const categoryId = useWatch({ control, name: "categoryId" });
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: ProductFormType) => {
    try {
      setIsLoading(true);

      const { categoryId, description, receiptDescription, price, reference } = data;

      const productInsertData: ProductInsertDtoType = {
        price,
        reference,
        description,
        category_id: categoryId,
        receipt_description: receiptDescription,
      };

      const newProductRequest = await api.post("products", productInsertData);

      if (newProductRequest.status !== 201) throw new Error(newProductRequest.statusText);

      toaster.create({
        type: "success",
        title: "Produto cadastrado!",
      });

      onSave(newProductRequest.data);

      reset();

      if (!isInfiniteAdd) onClose();
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao salvar",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesList: CategoryType[] = (await api.get("/categories")).data.data;

      setCategories(categoriesList);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar categorias",
        description: (e as Error).message,
      });
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
    setValue("price", productOnEdit.price);
    setValue("receiptDescription", productOnEdit.receipt_description ?? "");
    setValue("reference", productOnEdit.reference);
  }, [productOnEdit]);

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
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
                  {isLoading ? <Spinner /> : "Adicionar"}
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
