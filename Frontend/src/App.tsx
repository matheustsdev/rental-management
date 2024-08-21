import { useEffect, useState, useCallback } from "react";

import { TableColumnType } from "./types/tableColumnType";
import { DataTable } from "./molecules/DataTable";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { CirclePlusIcon } from "lucide-react";

import { ProductModalForm } from "./organisms/ProductModalForm";
import { productApi } from "./services/api/productApi";
import { ProductType } from "./types/entities/product";
import { EFormMode } from "./constants/enums/EFormMode";

function App() {
  const disclosure = useDisclosure();

  const [products, setProducts] = useState<ProductType[]>([]);

  const columns: TableColumnType<any>[] = [
    {
      name: "Referência",
      propertyName: "reference"
    },
    { 
      name: "Descrição",
      propertyName: "description"
    },
    {
      name: "Preço",
      propertyName: "price"
    }
  ];

  const getAllProducts = useCallback(async () => {
    try {
      const request = await productApi.get({
        params: {
          includes: "category"
        }
      });

      const response = request.data;

      setProducts(response.result);

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Flex padding="1rem 4rem" direction="column">
      <DataTable 
      title="Produtos" 
      items={products} 
      columns={columns}
      titleButtons={[{
        title: "Adicionar",
        leftIcon: <CirclePlusIcon />,
        onClick: disclosure.onOpen
      }]}
      paginate />
      {
        disclosure.isOpen && <ProductModalForm disclosureHook={disclosure} formMode={EFormMode.CREATE} onSave={(product) => setProducts([product, ...products])} />
      }
    </Flex>
  )
}

export default App
