"use client";

import PageContainer from "@/components/molecules/PageContainer";
import AddRentModal from "@/components/organisms/AddRentModal";
import { RentType } from "@/types/entities/RentType";
import { Flex, Grid, GridItem, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import RentCard from "@/components/molecules/RentCard";
import { toaster } from "@/components/atoms/Toaster";
import { api } from "@/services/api";
import ReceiptView from "@/components/molecules/ReceiptView";
import { usePDF } from "@react-pdf/renderer";
import { ButtonMenuItemsType } from "@/components/atoms/ButtonMenu";
import { MdDelete, MdEdit, MdOutlineRemoveRedEye, MdCheck } from "react-icons/md";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";
import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { useDebounce } from "@/hooks/useDebounce";
import RentReturnModal from "@/components/organisms/RentReturnModal";
import { ERentStatus } from "@prisma/client";
import { FaWhatsapp } from "react-icons/fa";

const RentPage = () => {
  const { onClose, onOpen, open } = useDisclosure();
  const {
    onClose: onCloseDeleteConfirmation,
    onOpen: onOpenDeleteConfirmation,
    open: isOpenDeleteConfirmation,
  } = useDisclosure();
  const {
    onClose: onCloseRentReturnModal,
    onOpen: onOpenRentReturnModal,
    open: isOpenRentReturnModal,
  } = useDisclosure();

  const [rents, setRents] = useState<RentType[]>([]);
  const [selectedRent, setSelectedRent] = useState<RentType | null>(null);
  const [instance, updateInstance] = usePDF({ document: <></> });
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { value: debounce, isLoading: isLoadingDebounce } = useDebounce(searchText, 300);

  const { loading: pdfLoading, url: pdfUrl } = instance;

  const menuItems: ButtonMenuItemsType<RentType>[] = [
    {
      label: "Emitir recibo",
      action: (rent) => handleGetReceipt(rent),
      icon: <MdOutlineRemoveRedEye />,
    },
    {
      label: "Editar",
      action: (rent) => handleOpenEditRent(rent),
      icon: <MdEdit />,
    },
    {
      label: "Excluir",
      action: (rent) => handleOpenDeleteConfirmation(rent),
      icon: <MdDelete />,
    },
    {
      label: "Devolução",
      action: (rent) => handleOpenRentReturnModal(rent),
      icon: <MdCheck />,
      getDisabled: (rent) => rent.status === ERentStatus.FINISHED,
    },
    {
      label: "Contatar",
      action: (rent) => {
        const phone = rent.phone?.replace(/\D/g, "");
        if (phone) window.open(`https://wa.me/55${phone}`, "_blank");
      },
      icon: <FaWhatsapp />,
    },
  ];

  const loadRents = async (page: number, searchText: string) => {
    try {
      setIsLoading(true);

      const rentsListRequest = await api.get("/rents", {
        params: {
          orderBy: "code",
          ascending: false,
          search: searchText,
          page,
          pageSize: 50,
        },
      });

      const rentsList = rentsListRequest.data.data;

      setRents(rentsList);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar alugueis",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditRent = (rent: RentType) => {
    setSelectedRent(rent);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedRent(null);
    onClose();
  };

  const handleSaveRent = (rent: RentType, isUpdate: boolean) => {
    if (isUpdate) {
      const newRents = rents.map((item) => (item.id === rent.id ? rent : item));

      setRents(newRents);
    } else setRents([rent, ...rents]);
  };

  const handleGetReceipt = (rent: RentType) => {
    setSelectedRent(rent);
    updateInstance(<ReceiptView rent={rent} />);
    setDownloadRequested(true);
  };

  const handleOpenDeleteConfirmation = (rent: RentType) => {
    setSelectedRent(rent);
    onOpenDeleteConfirmation();
  };

  const handleOnChangeSearchText = (newSearchText: string) => {
    if (!newSearchText) {
      setSearchText("");

      return;
    }

    setSearchText(newSearchText);
  };

  const handleOpenRentReturnModal = (rent: RentType) => {
    setSelectedRent(rent);
    onOpenRentReturnModal();
  };

  const handleSearchTextChange = useCallback((text: string) => {
    loadRents(1, text);
  }, []);

  const deleteRent = async (id: string) => {
    try {
      if (!id) throw new Error("ID não informado");

      const query = await api.delete(`rents/${id}`);
      const response = query.data;

      if (response instanceof ErrorResponse) throw response;

      const newRents = rents.filter((rent) => rent.id !== selectedRent?.id);

      setRents(newRents);

      onCloseDeleteConfirmation();

      toaster.create({
        type: "success",
        title: "Sucesso",
        description: response.message,
      });
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Erro ao deletar",
        description: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    loadRents(1, "").then();
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

  useEffect(() => {
    handleSearchTextChange(debounce);
  }, [debounce, handleSearchTextChange]);

  return (
    <PageContainer
      title="Lista de alugueis"
      flexDir="column"
      align="center"
      searchBarProps={{
        onChange: (e) => handleOnChangeSearchText(e.target.value),
        value: searchText,
        isLoading: isLoadingDebounce,
      }}
      buttonProps={{
        onClick: () => onOpen(),
      }}
      pb="40"
      flex="1"
    >
      {isLoading ? (
        <Flex w="full" minH="full" align="center" justify="center" flex="1">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Grid
          w="full"
          minH="full"
          templateColumns={{ base: "repeat(auto-fill, 100%)", lg: "repeat(auto-fill, 400px)" }}
          templateRows="repeat(auto-fill, 240px)"
          columnGap="8"
          rowGap="2"
          alignItems="flex-start"
        >
          {rents.length === 0 ? (
            <Text>Nenhum aluguel encontrado</Text>
          ) : (
            rents.map((rent) => (
              <GridItem key={rent.id}>
                <RentCard rent={rent} menuItens={menuItems} />
              </GridItem>
            ))
          )}
        </Grid>
      )}

      <AddRentModal isOpen={open} onClose={handleCloseModal} onSave={handleSaveRent} rentOnEdit={selectedRent} />
      {selectedRent && (
        <RentReturnModal
          rentOnEdit={selectedRent}
          isOpen={isOpenRentReturnModal}
          onClose={onCloseRentReturnModal}
          onSave={() => {}}
        />
      )}
      <ConfirmationModal
        actionLabel="Deletar"
        isOpen={isOpenDeleteConfirmation}
        onClose={onCloseDeleteConfirmation}
        message={`Deseja deletar o aluguel de código ${selectedRent?.code ?? ""}`}
        onClickActionButton={() => deleteRent(selectedRent?.id ?? "")}
      />
    </PageContainer>
  );
};

export default RentPage;
