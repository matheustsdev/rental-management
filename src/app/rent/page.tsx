"use client";

import PageContainer from "@/molecules/PageContainer";
import AddRentModal from "@/organisms/AddRentModal";
import { RentType } from "@/types/entities/RentType";
import { Grid, GridItem, Icon, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RentCard from "@/molecules/RentCard";
import { toaster } from "@/atoms/Toaster";
import { api } from "@/services/api";
import Fab from "@/atoms/Fab";
import { AiOutlinePlus } from "react-icons/ai";
import { IncludeConfigType } from "@/services/crud/baseCrudService";

const RentPage = () => {
  const { onClose, onOpen, open } = useDisclosure();

  const [rents, setRents] = useState<RentType[]>([]);
  const [selectedRent, setSelectedRent] = useState<RentType | null>(null);
  //const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadRents = async () => {
    try {
      //setIsLoading(true);

      const includeConfig: IncludeConfigType = {
        rent_products: {
          table: "rent_products",
          foreignKey: "rent_id",
          includes: {
            products: {
              table: "products",
              foreignKey: "product_id",
              includes: {
                category: {
                  table: "categories",
                  foreignKey: "category_id",
                },
              },
            },
          },
        },
      };

      const rentsListRequest = (
        await api.get("/rents", {
          params: {
            include: JSON.stringify(includeConfig),
          },
        })
      ).data;

      setRents(rentsListRequest.data);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar categorias",
        description: (e as Error).message,
      });
    } finally {
      //setIsLoading(false);
    }
  };

  const handleOpenEditRent = (rent: RentType) => {
    setSelectedRent(rent);
    onOpen();
  };

  const handleCloseModal = (updatedRent?: RentType) => {
    if (updatedRent) {
      const newRents = rents.map((rent) => (rent.id === updatedRent.id ? updatedRent : rent));

      setRents(newRents);
    }

    setSelectedRent(null);
    onClose();
  };

  useEffect(() => {
    loadRents().then();
  }, []);

  return (
    <PageContainer title="Alugueis" flexDir="column" align="center">
      <Grid w="full" templateColumns="repeat(auto-fill, 320px)" gap="8">
        {rents.map((rent) => (
          <GridItem key={rent.id}>
            <RentCard rent={rent} onEdit={handleOpenEditRent} />
          </GridItem>
        ))}
      </Grid>
      <Fab onClick={onOpen} fontSize="2xl">
        <Icon boxSize="8">
          <AiOutlinePlus />
        </Icon>
      </Fab>
      <AddRentModal isOpen={open} onClose={handleCloseModal} rentOnEdit={selectedRent} />
    </PageContainer>
  );
};

export default RentPage;
