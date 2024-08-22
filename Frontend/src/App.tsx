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
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

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

  const onSaveProduct = useCallback((product: ProductType) => {
    if (selectedProduct) {
      const newProducts = products.map((p) => {
        if (p.id === product.id) {
          return product;
        }

        return p;
      });

      console.log("Products >> ", products);

      setProducts(newProducts);
    } else {
      setProducts([product, ...products]);
    }

    setSelectedProduct(null);
  }, [products, selectedProduct]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {}, [selectedProduct]);

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
        paginate
        onItemClick={(product) => {
          setSelectedProduct(product);
          disclosure.onOpen();
         }}
      />
      {
        disclosure.isOpen && <ProductModalForm disclosureHook={disclosure} formMode={selectedProduct ? EFormMode.UPDATE : EFormMode.CREATE} product={selectedProduct} onSave={onSaveProduct} />
      }
    </Flex>
  )
}

export default App
