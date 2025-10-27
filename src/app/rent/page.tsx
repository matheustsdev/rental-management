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
import ReceiptView from "@/molecules/ReceiptView";
import { usePDF } from "@react-pdf/renderer";

const RentPage = () => {
  const { onClose, onOpen, open } = useDisclosure();

  const [rents, setRents] = useState<RentType[]>([]);
  const [selectedRent, setSelectedRent] = useState<RentType | null>(null);
  const [instance, updateInstance] = usePDF({ document: <></> });
  const [downloadRequested, setDownloadRequested] = useState(false);

  const { loading: pdfLoading, url: pdfUrl } = instance;

  const loadRents = async () => {
    try {
      //setIsLoading(true);

      const rentsListRequest = (await api.get("/rents")).data;

      console.log("rentsList >> ", rentsListRequest);

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

  const handleGerarRecibo = (rent: RentType) => {
    setSelectedRent(rent);
    updateInstance(<ReceiptView rent={rent} />);
    setDownloadRequested(true);
  };

  useEffect(() => {
    loadRents().then();
  }, []);

  useEffect(() => {
    if (downloadRequested && !pdfLoading && pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `Recibo ${selectedRent?.code} - ${selectedRent?.client_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadRequested(false);
      setSelectedRent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfLoading, pdfUrl, downloadRequested]);

  return (
    <PageContainer title="Alugueis" flexDir="column" align="center">
      <Grid w="full" templateColumns="repeat(auto-fill, 320px)" gap="8">
        {rents.map((rent) => (
          <GridItem key={rent.id}>
            <RentCard rent={rent} onEdit={handleOpenEditRent} onClickPreview={handleGerarRecibo} />
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
