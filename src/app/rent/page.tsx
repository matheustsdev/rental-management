"use client";

import PageContainer from "@/atoms/PageContainer";
import PrimaryButton from "@/atoms/PrimaryButton";
import AddRentModal from "@/organisms/AddRentModal";
import { DataTable, DataTableColumn } from "@/molecules/DataTable";
import { RentType } from "@/types/entities/RentType";
import { Button, ButtonGroup, Steps, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";

const RentPage = () => {
  const { onClose, onOpen, open } = useDisclosure();

  const [rents, setRents] = useState<RentType[]>([]);

  const columns: DataTableColumn<RentType>[] = [
    {
      header: "Data do aluguel",
      key: "rent_date",
      cell: (rent) => format(new Date(rent.rent_date), "dd 'de' MMM "),
    },
  ];

  return (
    <PageContainer>
      <DataTable columns={columns} data={rents} />
      <PrimaryButton onClick={onOpen}>Abrir modal</PrimaryButton>
      <AddRentModal isOpen={open} onClose={onClose} onSave={() => console.log("Save")} receiptOnEdit={null} />
    </PageContainer>
  );
};

export default RentPage;
