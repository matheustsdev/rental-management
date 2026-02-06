"use client";

import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { DataTable, DataTableColumn } from "@/components/molecules/DataTable";
import { useDevice } from "@/hooks/useDevice";
import AddProductModal from "@/components/molecules/AddProductModal";
import PageContainer from "@/components/molecules/PageContainer";
import { useCallback, useEffect, useState } from "react";
import { ProductType } from "@/types/entities/ProductType";
import { api } from "@/services/api";
import { toaster } from "@/components/atoms/Toaster";
import ProductCard from "@/components/molecules/ProductCard";
import { MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import Fab from "@/components/atoms/Fab";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import SearchBar from "@/components/atoms/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const { isMobile } = useDevice();
  const { open, onClose, onOpen } = useDisclosure();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(1);
  const [selectedProductRow, setSelectedProductRow] = useState<ProductType | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { value: debounce, isLoading: isLoadingDebounce } = useDebounce(searchText, 300);

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

  const loadProducts = async (newPage: number, searchText: string) => {
    try {
      setIsLoading(true);

      const productsListRequest = (
        await api.get("/products", {
          params: {
            page: newPage,
            orderBy: "reference",
            search: searchText,
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
        prev.map((prevProduct) => (prevProduct.id === selectedProductRow.id ? upsertedProduct : prevProduct)),
      );

      return;
    }

    setProducts((prev) => [upsertedProduct, ...prev]);
    setPagesTotal(Math.ceil(products.length + 1 / 10));
  };

  const handleOnChangeSearchText = (newSearchText: string) => {
    if (!newSearchText) {
      setSearchText("");

      return;
    }

    setSearchText(newSearchText);
  };

  const handleSearchTextChange = useCallback((text: string) => {
    loadProducts(1, text);
  }, []);

  const MobileDataDisplay = (
    <Flex flexDir="column" w="full" gap="4" pb="40">
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
      onPageChange={(updatedPage) => loadProducts(updatedPage, debounce)}
      totalPages={pagesTotal}
      actions={actions}
      isLoading={isLoading}
    />
  );

  useEffect(() => {
    handleSearchTextChange(debounce);
  }, [debounce, handleSearchTextChange]);

  return (
    <PageContainer title="Lista de produtos" flexDir="column" align="center" gap="8" overflowY="hidden">
      <Flex w="full" flexDir="column" align="flex-start" justify="center">
        <SearchBar
          onChange={(e) => handleOnChangeSearchText(e.target.value)}
          value={searchText}
          isLoading={isLoadingDebounce}
        />
        {isMobile ? MobileDataDisplay : DesktopDataDisplay}
      </Flex>
      <Fab onClick={onOpen} fontSize="2xl">
        <Icon boxSize="8">
          <AiOutlinePlus />
        </Icon>
      </Fab>
      <AddProductModal
        isOpen={open}
        onClose={handleOnCloseModal}
        onSave={onUpsertProduct}
        productOnEdit={selectedProductRow}
      />
    </PageContainer>
  );
}
