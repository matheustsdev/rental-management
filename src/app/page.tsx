"use client";

import { Button, Card, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { DataTable, DataTableColumn } from "@/molecules/DataTable";
import { useDevice } from "@/hooks/useDevice";
import AddProductModal from "@/molecules/AddProductModal";
import PageContainer from "@/atoms/PageContainer";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import { api } from "@/services/api";
import { toaster } from "@/atoms/Toaster";
import { IncludeConfigType } from "@/services/crud/baseCrudService";

export default function Home() {
  const { isMobile } = useDevice();
  const { open, onClose, onOpen } = useDisclosure();

  const [products, setProducts] = useState<ProductType[]>([]);

  const columns: DataTableColumn<ProductType>[] = [
    {
      header: "Referência",
      key: "reference",
    },
    {
      header: "Descrição",
      key: "description",
    },
    {
      header: "Categoria",
      key: "categories",
      cell: (row) => row.categories?.name,
    },
    {
      header: "Valor",
      key: "price",
      cell: (row) => `R$ ${row.price}`,
    },
  ];

  const loadProducts = async () => {
    try {
      const includeConfig: IncludeConfigType = {
        categories: {
          table: "categories",
          foreignKey: "category_id",
        },
      };

      const productsList: ProductType[] = (
        await api.get("/products", {
          params: {
            include: JSON.stringify(includeConfig),
          },
        })
      ).data.data;

      setProducts(productsList);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar categorias",
        description: (e as Error).message,
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const MobileDataDisplay = (
    <Flex gap={4}>
      {products.map((product) => (
        <Card.Root key={product.id}>
          <Card.Header>{product.description}</Card.Header>
          <Card.Body>{product.description}</Card.Body>
          <Card.Footer>{product.categories?.name}</Card.Footer>
        </Card.Root>
      ))}
    </Flex>
  );

  const DesktopDataDisplay = <DataTable columns={columns} data={products} />;

  if (isMobile) {
    return <PageContainer w="100vw" h="100vh" align="center" justify="center"></PageContainer>;
  }

  return (
    <PageContainer flexDir="column" w="100vw" h="100vh" align="center" p="20" gap="8">
      <Flex gap="4" align="flex-end" w="full">
        <Heading>Lista de produtos</Heading>
        <Button px="4" onClick={onOpen}>
          Adicionar
        </Button>
      </Flex>

      <Flex w="full" flexDir="column" align="center" justify="center">
        {isMobile ? MobileDataDisplay : DesktopDataDisplay}
      </Flex>
      <AddProductModal
        isOpen={open}
        onClose={onClose}
        onSave={(newProduct) => setProducts((prev) => [newProduct, ...prev])}
      />
    </PageContainer>
  );
}
