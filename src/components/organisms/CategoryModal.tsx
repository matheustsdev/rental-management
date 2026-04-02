"use client";

import { Dialog, Flex, Spinner, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toaster } from "@/components/atoms/Toaster";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import { CategoryType } from "@/types/entities/CategoryType";
import InputField from "@/components/atoms/InputField";
import Select from "@/components/atoms/Select";
import BaseFormModal from "../molecules/BaseFormModal";
import { z } from "zod";

// Shared form schema for the modal
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  post_return_buffer_days: z.number().min(0, "Mínimo 0 dias"),
  measure_type: z.string().min(1, "Tipo de medida é obrigatório"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface ICategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryOnEdit: CategoryType | null;
  onSave: (category: CategoryType, isUpdate: boolean) => void;
}

const CategoryModal: React.FC<ICategoryModalProps> = ({ isOpen, onClose, categoryOnEdit, onSave }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMeasureWarning, setShowMeasureWarning] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      post_return_buffer_days: 0,
      measure_type: "NONE",
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, control, watch } = methods;

  const currentMeasureType = watch("measure_type");

  useEffect(() => {
    if (categoryOnEdit) {
      reset({
        id: categoryOnEdit.id,
        name: categoryOnEdit.name,
        post_return_buffer_days: categoryOnEdit.post_return_buffer_days ?? 0,
        measure_type: categoryOnEdit.measure_type || "NONE",
      });
    } else {
      reset({
        name: "",
        post_return_buffer_days: 0,
        measure_type: "NONE",
      });
    }
    setShowMeasureWarning(false);
  }, [categoryOnEdit, isOpen, reset]);

  // Alert logic: if category has products and measure_type is changing
  useEffect(() => {
    if (categoryOnEdit && categoryOnEdit._count.products > 0) {
      if (currentMeasureType !== categoryOnEdit.measure_type) {
        setShowMeasureWarning(true);
      } else {
        setShowMeasureWarning(false);
      }
    }
  }, [currentMeasureType, categoryOnEdit]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      let response;

      if (categoryOnEdit) {
        response = await api.put(`categories/${categoryOnEdit.id}`, data);
      } else {
        response = await api.post("categories", data);
      }

      const savedCategory = response.data.data;
      onSave(savedCategory, !!categoryOnEdit);

      toaster.create({
        type: "success",
        title: categoryOnEdit ? "Categoria atualizada!" : "Categoria criada!",
      });

      handleOnClose();
    } catch (error: any) {
      toaster.create({
        type: "error",
        title: "Erro ao salvar categoria",
        description: error.response?.data?.error || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  const measureOptions = [
    { label: "Nenhum", value: "NONE" },
    { label: "Vestido", value: "DRESS" },
    { label: "Terno/Paletó", value: "SUIT" },
  ];

  return (
    <BaseFormModal
      isOpen={isOpen}
      onClose={handleOnClose}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      contentRef={contentRef}
    >
      <Dialog.Header py="4">
        <Dialog.Title>{categoryOnEdit ? "Editar Categoria" : "Nova Categoria"}</Dialog.Title>
      </Dialog.Header>
      
      <Dialog.Body>
        <Flex flexDir="column" gap="4">
          <InputField
            label="Nome da Categoria"
            placeholder="Ex: Vestidos de Gala"
            registerProps={register("name")}
            error={errors.name}
          />

          <InputField
            label="Dias de Preparo (pós-retorno)"
            type="number"
            registerProps={register("post_return_buffer_days", { valueAsNumber: true })}
            error={errors.post_return_buffer_days}
          />

          <Controller
            control={control}
            name="measure_type"
            render={({ field }) => (
              <Select
                label="Tipo de Medida"
                options={measureOptions}
                selectedValue={field.value}
                onChange={field.onChange}
                placeholder="Selecione o tipo de medida"
                dialogContentRef={contentRef}
              />
            )}
          />

          {showMeasureWarning && (
            <Text color="orange.600" fontSize="sm" fontWeight="bold" mt="2" bg="orange.50" p="2" borderRadius="md">
              ⚠️ Atenção: Esta categoria possui {categoryOnEdit?._count.products} produto(s). Alterar o tipo de medida pode afetar as medidas registradas nos alugueis desses produtos.
            </Text>
          )}
        </Flex>
      </Dialog.Body>

      <Dialog.Footer display="flex" gap="4" pt="8">
        <SecondaryButton variant="outline" type="button" onClick={handleOnClose} disabled={isLoading}>
          Cancelar
        </SecondaryButton>
        <PrimaryButton type="submit" loading={isLoading}>
          Salvar
        </PrimaryButton>
      </Dialog.Footer>
    </BaseFormModal>
  );
};

export default CategoryModal;
