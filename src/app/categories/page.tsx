"use client";

import { Flex, Spinner, useDisclosure, Box } from "@chakra-ui/react";
import { DataTable, DataTableColumn } from "@/components/molecules/DataTable";
import { useDevice } from "@/hooks/useDevice";
import PageContainer from "@/components/molecules/PageContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryType } from "@/types/entities/CategoryType";
import { api } from "@/services/api";
import { toaster } from "@/components/atoms/Toaster";
import CategoryModal from "@/components/organisms/CategoryModal";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import { useDebounce } from "@/hooks/useDebounce";
import { MdEdit, MdDelete } from "react-icons/md";
import CategoryCard from "@/components/molecules/CategoryCard";

export default function CategoriesPage() {
  const { isMobile } = useDevice();
  const { open: isModalOpen, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
  const { open: isConfirmOpen, onClose: onCloseConfirm, onOpen: onOpenConfirm } = useDisclosure();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { value: debounce, isLoading: isLoadingDebounce } = useDebounce(searchText, 300);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const measureTypeLabels: Record<string, string> = {
    NONE: "Nenhum",
    DRESS: "Vestido",
    SUIT: "Terno/Paletó",
  };

  const columns: DataTableColumn<CategoryType>[] = [
    {
      header: "Nome",
      key: "name",
      sortable: true,
    },
    {
      header: "Tipo de Medida",
      key: "measure_type",
      cell: (row) => measureTypeLabels[row.measure_type || "NONE"] || row.measure_type,
    },
    {
      header: "Preparo (dias)",
      key: "post_return_buffer_days",
      cell: (row) => `${row.post_return_buffer_days} dias`,
      align: "end",
    },
    {
      header: "Produtos",
      key: "id", // Use any key, cell will override
      cell: (row) => row._count.products,
      align: "end",
    },
  ];

  const actions = (category: CategoryType) => {
    return (
      <Flex gap="2" py="1" px="2">
        <SecondaryButton p="2" onClick={() => handleEdit(category)}>
          <MdEdit />
        </SecondaryButton>
        <SecondaryButton p="2" onClick={() => handleDeleteClick(category)} colorPalette="red">
          <MdDelete />
        </SecondaryButton>
      </Flex>
    );
  };

  const loadCategories = async (newPage: number, search: string, shouldAppend: boolean = false) => {
    try {
      setIsLoading(true);
      const response = await api.get("/categories", {
        params: {
          page: newPage,
          search: search,
          orderBy: "name",
          ascending: true,
        },
      });

      if (shouldAppend) {
        setCategories((prev) => [...prev, ...response.data.data]);
      } else {
        setCategories(response.data.data);
      }
      
      setPagesTotal(Math.ceil(response.data.total / 10) || 1);
      setCurrentPage(newPage);
    } catch (error: any) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar categorias",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: CategoryType) => {
    setSelectedCategory(category);
    onOpenModal();
  };

  const handleDeleteClick = (category: CategoryType) => {
    if (category._count.products > 0) {
      toaster.create({
        type: "error",
        title: "Não é possível excluir",
        description: `Esta categoria possui ${category._count.products} produtos vinculados.`,
      });
      return;
    }
    setCategoryToDelete(category);
    onOpenConfirm();
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setIsLoading(true);
      await api.delete(`categories/${categoryToDelete.id}`);
      
      toaster.create({
        type: "success",
        title: "Categoria excluída!",
      });

      setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
      onCloseConfirm();
    } catch (error: any) {
      toaster.create({
        type: "error",
        title: "Erro ao excluir categoria",
        description: error.response?.data?.error || error.message,
      });
    } finally {
      setIsLoading(false);
      setCategoryToDelete(null);
    }
  };

  const handleSave = (savedCategory: CategoryType, isUpdate: boolean) => {
    if (isUpdate) {
      setCategories((prev) =>
        prev.map((c) => (c.id === savedCategory.id ? savedCategory : c))
      );
    } else {
      setCategories((prev) => [savedCategory, ...prev]);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    loadCategories(1, debounce);
  }, [debounce]);

  const handlePageChange = async (page: number) => {
    await loadCategories(page, debounce);
  };

  // Infinite scroll effect for mobile
  useEffect(() => {
    if (!isMobile) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (currentPage < pagesTotal && !isLoading) {
          loadCategories(currentPage + 1, debounce, true);
        }
      }
    });

    if (sentinelRef.current) {
      intersectionObserver.observe(sentinelRef.current);
    }

    return () => intersectionObserver.disconnect();
  }, [isMobile, currentPage, pagesTotal, isLoading, debounce]);

  const MobileDisplay = (
    <Flex flexDir="column" w="full" gap="4" pb="10">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
        />
      ))}
      <Box ref={sentinelRef} h="20px" w="full" />
      {isLoading && (
        <Flex w="full" py="4" justify="center">
          <Spinner size="lg" />
        </Flex>
      )}
    </Flex>
  );

  const DesktopDisplay = (
    <DataTable
      columns={columns}
      data={categories}
      currentPage={currentPage}
      totalPages={pagesTotal}
      onPageChange={handlePageChange}
      actions={actions}
      isLoading={isLoading}
    />
  );

  return (
    <PageContainer
      title="Lista de categorias"
      flexDir="column"
      align="center"
      gap="8"
      searchBarProps={{
        onChange: (e) => handleSearchChange(e.target.value),
        value: searchText,
        isLoading: isLoadingDebounce,
        placeholder: "Buscar por nome...",
      }}
      buttonProps={{
        onClick: () => {
          setSelectedCategory(null);
          onOpenModal();
        },
        children: "Nova Categoria",
      }}
      flex="1"
    >
      {isLoading && categories.length === 0 ? (
        <Flex w="full" h="40" align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex w="full" flexDir="column">
          {isMobile ? MobileDisplay : DesktopDisplay}
        </Flex>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        categoryOnEdit={selectedCategory}
        onSave={handleSave}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
        onClickActionButton={confirmDelete}
        message={`Tem certeza que deseja excluir a categoria "${categoryToDelete?.name}"?`}
        actionLabel="Excluir"
      />
    </PageContainer>
  );
}
