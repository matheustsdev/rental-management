import { TableColumnType } from "./types/TableColumnType";
import { DataTable } from "./molecules/DataTable";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { CirclePlusIcon } from "lucide-react";

import { ProductModalForm } from "./organisms/ProductModalForm";

type TestType = {
  id: string;
  name: string;
  age: number;
  email: string;
}

function App() {
  const disclosure = useDisclosure();

  const tableData: TestType[] = [
    {
      id: "1",
      name: "Matheus",
      age: 25,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "2",
      name: "João",
      age: 30,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "3",
      name: "Maria",
      age: 20,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "4",
      name: "José",
      age: 40,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "5",
      name: "Ana",
      age: 35,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "6",
      name: "Matheus",
      age: 25,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "7",
      name: "João",
      age: 30,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "8",
      name: "Maria",
      age: 20,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "9",
      name: "José",
      age: 40,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "10",
      name: "Ana",
      age: 35,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "11",
      name: "Ana",
      age: 35,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "12",
      name: "Matheus",
      age: 25,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "13",
      name: "João",
      age: 30,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "14",
      name: "Maria",
      age: 20,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "15",
      name: "José",
      age: 40,
      email: "matheusts1902@gmail.com"
    },
    {
      id: "16",
      name: "Ana",
      age: 35,
      email: "matheusts1902@gmail.com"
    }
  ];

  const columns: TableColumnType<TestType>[] = [
    {
      name: "ID",
      propertyName: "id"
    },
    {
      name: "Nome",
      propertyName: "name"
    },
    {
      name: "Idade",
      propertyName: "age"
    },
    {
      name: "E-mail",
      propertyName: "email"
    },
    {
      name: "E-mail",
      propertyName: "email"
    },
    {
      name: "E-mail",
      propertyName: "email"
    },
    {
      name: "E-mail",
      propertyName: "email"
    }
  ];

  return (
    <Flex padding="1rem 4rem" direction="column">
      <DataTable 
      title="Produtos" 
      items={tableData} 
      columns={columns}
      titleButtons={[{
        title: "Adicionar",
        leftIcon: <CirclePlusIcon />,
        onClick: disclosure.onOpen
      }]}
      paginate />
      {
        disclosure.isOpen && <ProductModalForm disclosureHook={disclosure} />
      }
    </Flex>
  )
}

export default App
