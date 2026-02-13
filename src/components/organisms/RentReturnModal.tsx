"use client";

import { Dialog, Flex, Text, Separator, Spinner } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { RentType } from "@/types/entities/RentType";
import BaseFormModal from "../molecules/BaseFormModal";
import InputField from "../atoms/InputField";
import { Prisma } from "@prisma/client";
import PrimaryButton from "../atoms/PrimaryButton";
import { toaster } from "../atoms/Toaster";
import TextRow from "../atoms/TextRow";
import Currency from "@/utils/models/Currency";
import { RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";

const schema = z.object({
  rentCode: z.string().nonempty("O código é obrigatório"),
  rentProducts: z.array(
    z.object({
      id: z.string().nonempty("O ID é obrigatório"),
      realBuffer: z.number().gte(0, "O valor deve ser maior ou igual a zero"),
      productDescription: z.string().nonempty("A descrição é obrigatória"),
    }),
  ),
});

export type RentReturnSchemaType = z.infer<typeof schema>;

type RentTypeWithCategories = Prisma.rentsGetPayload<{
  include: {
    rent_products: {
      include: {
        products: {
          include: {
            categories: true;
          };
        };
      };
    };
  };
}>;

interface IRentReturnModalProps {
  onClose: () => void;
  onSave: (rent: RentType) => void;
  isOpen: boolean;
  rentOnEdit: RentType;
}

const RentReturnModal: React.FC<IRentReturnModalProps> = ({ isOpen, onClose, onSave, rentOnEdit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<RentReturnSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      rentProducts: [],
      rentCode: rentOnEdit.code.toString(),
    },
    reValidateMode: "onBlur",
  });

  const rentProducts = useWatch({ control: methods.control, name: "rentProducts" });
  const rentCode = useWatch({ control: methods.control, name: "rentCode" });

  const contentRef = useRef<HTMLDivElement>(null);

  const loadRent = async (id: string) => {
    try {
      setIsLoading(true);

      const request = await api.get(`/rents/${id}`);

      const result = request.data.data as RentTypeWithCategories;
      const newRentProducts = result.rent_products.map((rentProduct) => ({
        id: rentProduct.id,
        realBuffer: rentProduct.products.categories?.post_return_buffer_days ?? 0,
        productDescription: `${rentProduct.products.reference} - ${rentProduct.products.description}`,
      }));

      methods.setValue("rentProducts", newRentProducts);
    } catch (e) {
      toaster.create({
        type: "error",
        title: "Erro interno",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitRentReturn = async (data: RentReturnDTO) => {
    try {
      const request = await api.post("/rents/return", data);
      const result = request.data.data as RentType;

      if (request.status !== 200) throw result;

      toaster.create({
        type: "success",
        title: "Devolução realizada com sucesso",
      });

      return result;
    } catch (e) {
      toaster.create({
        type: "error",
        title: "Erro interno",
        description: (e as Error).message,
      });
    }
  };

  const onSubmit = async (data: RentReturnSchemaType) => {
    const rentReturnDTO: RentReturnDTO = {
      id: rentOnEdit.id,
      rentProducts: data.rentProducts.map((rentProduct) => ({
        id: rentProduct.id,
        realBuffer: rentProduct.realBuffer,
      })),
    };

    const rent = await submitRentReturn(rentReturnDTO);

    if (!rent) return;

    onSave(rent);
    onClose();
  };

  useEffect(() => {
    if (rentOnEdit) loadRent(rentOnEdit.id).then();
  }, [rentOnEdit]);

  return (
    <BaseFormModal
      contentRef={contentRef}
      isOpen={isOpen}
      onClose={onClose}
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Dialog.Header py="4" fontSize="2xl" as="h2" fontWeight="bold">
        Devolução do aluguel {rentCode}
      </Dialog.Header>
      <Dialog.Body>
        <Flex direction="column">
          <TextRow label="Cliente" value={rentOnEdit.client_name} />
          <TextRow label="Valor total" value={new Currency(rentOnEdit.total_value).toString()} />
          <TextRow label="Desconto" value={new Currency(rentOnEdit.discount_value).toString()} />
          <TextRow label="Valor a pagar" value={new Currency(rentOnEdit.total_value).toString()} />
          <TextRow label="Sinal" value={new Currency(rentOnEdit.signal_value).toString()} />
          <TextRow label="Restante" value={new Currency(rentOnEdit.remaining_value).toString()} />
          <TextRow label="Observação interna" value={rentOnEdit?.internal_observations ?? ""} />
          <Flex direction="column" h="full" w="full" gap="4" pt="4">
            {isLoading ? (
              <Flex h="full" w="full" align="center" justify="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              rentProducts.map((rentProduct, index) => (
                <Flex key={rentProduct.id} direction="column" gap="1" align="flex-start">
                  <Text fontWeight="bold">{rentProduct.productDescription}</Text>
                  <InputField
                    label="Tempo para voltar para aluguel (Limpeza/ajustes)"
                    registerProps={methods.register(`rentProducts.${index}.realBuffer`)}
                  />
                  <Separator size="md" />
                </Flex>
              ))
            )}
          </Flex>
        </Flex>
      </Dialog.Body>
      <Dialog.Footer>
        <PrimaryButton disabled={methods.formState.isSubmitting || isLoading} type="submit">
          Submit
        </PrimaryButton>
      </Dialog.Footer>
    </BaseFormModal>
  );
};

export default RentReturnModal;
