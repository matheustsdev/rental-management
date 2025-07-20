"use client";

import { Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { DataTable, DataTableColumn } from "@/molecules/DataTable";
import { useDevice } from "@/hooks/useDevice";
import AddProductModal from "@/molecules/AddProductModal";
import PageContainer from "@/molecules/PageContainer";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import { api } from "@/services/api";
import { toaster } from "@/atoms/Toaster";
import { IncludeConfigType } from "@/services/crud/baseCrudService";
import PrimaryButton from "@/atoms/PrimaryButton";
import ProductCard from "@/molecules/ProductCard";
import { MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Fab from "@/atoms/Fab";

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
      <Flex gap="4">
        <PrimaryButton onClick={() => openUpdateModal(product)}>
          <MdEdit />
        </PrimaryButton>
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

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const includeConfig: IncludeConfigType = {
        categories: {
          table: "categories",
          foreignKey: "category_id",
        },
      };

      const productsListRequest = (
        await api.get("/products", {
          params: {
            include: JSON.stringify(includeConfig),
            page: currentPage,
          },
        })
      ).data;

      setPagesTotal(Math.ceil(productsListRequest.total / 10));
      setProducts(productsListRequest.data);
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
      onPageChange={(page) => setCurrentPage(page)}
      totalPages={pagesTotal}
      actions={actions}
      isLoading={isLoading}
    />
  );

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

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
        onSave={(newProduct) => setProducts((prev) => [newProduct, ...prev])}
        productOnEdit={selectedProductRow}
      />
    </PageContainer>
  );
}
