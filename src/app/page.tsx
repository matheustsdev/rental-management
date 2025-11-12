"use client";

import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { DataTable, DataTableColumn } from "@/molecules/DataTable";
import { useDevice } from "@/hooks/useDevice";
import AddProductModal from "@/molecules/AddProductModal";
import PageContainer from "@/molecules/PageContainer";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import { api } from "@/services/api";
import { toaster } from "@/atoms/Toaster";
import ProductCard from "@/molecules/ProductCard";
import { MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Fab from "@/atoms/Fab";
import { InjectRelations } from "@/types/EntityType";
import SecondaryButton from "@/atoms/SecondaryButton";

export default function Home() {
  const { isMobile } = useDevice();
  const { open, onClose, onOpen } = useDisclosure();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(1);
  const [selectedProductRow, setSelectedProductRow] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const actions = (product: ProductType) => {
    return (
      <Flex gap="4" py="1">
        <SecondaryButton p="2" onClick={() => openUpdateModal(product)}>
          <MdEdit />
        </SecondaryButton>
      </Flex>
    );
  };

  const handleOnCloseModal = () => {
    setSelectedProductRow(null);
    onClose();
  };

  const openUpdateModal = (product: ProductType) => {
    setSelectedProductRow(product);
    onOpen();
  };

  const loadProducts = async (newPage: number) => {
    try {
      setIsLoading(true);

      const includes: (keyof InjectRelations<"products">)[] = ["categories"];

      const productsListRequest = (
        await api.get("/products", {
          params: {
            include: includes,
            page: newPage,
            orderBy: "reference",
          },
        })
      ).data;

      setProducts(productsListRequest.data);
      setPagesTotal(Math.ceil(productsListRequest.total / 10));
      setCurrentPage(newPage);
    } catch (e: unknown) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar categorias",
        description: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onUpsertProduct = (upsertedProduct: ProductType) => {
    if (selectedProductRow) {
      setProducts((prev) =>
        prev.map((prevProduct) => (prevProduct.id === selectedProductRow.id ? upsertedProduct : prevProduct))
      );

      return;
    }

    setProducts((prev) => [upsertedProduct, ...prev]);
    setPagesTotal(Math.ceil(products.length + 1 / 10));
  };

  const MobileDataDisplay = (
    <Flex flexDir="column" w="full" gap="4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} onEdit={openUpdateModal} />
      ))}
    </Flex>
  );

  const DesktopDataDisplay = (
    <DataTable
      columns={columns}
      data={products}
      currentPage={currentPage}
      onPageChange={(updatedPage) => loadProducts(updatedPage)}
      totalPages={pagesTotal}
      actions={actions}
      isLoading={isLoading}
    />
  );

  useEffect(() => {
    loadProducts(1);
  }, []);

  return (
    <PageContainer title="Lista de produtos" flexDir="column" align="center" gap="8" overflowY="hidden">
      <Fab onClick={onOpen} fontSize="2xl">
        <Icon boxSize="8">
          <AiOutlinePlus />
        </Icon>
      </Fab>
      <Flex w="full" flexDir="column" align="center" justify="center">
        {isMobile ? MobileDataDisplay : DesktopDataDisplay}
      </Flex>
      <AddProductModal
        isOpen={open}
        onClose={handleOnCloseModal}
        onSave={onUpsertProduct}
        productOnEdit={selectedProductRow}
      />
    </PageContainer>
  );
}
