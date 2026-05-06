"use client";

import { Accordion, Box, Button, Field, HStack, Input, Text, Icon, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import ProductReportView from "@/components/molecules/ProductReportView";
import { api } from "@/services/api";
import { ProductType } from "@/types/entities/ProductType";
import { CategoryType } from "@/types/entities/CategoryType";
import { LuPackage } from "react-icons/lu";
import { toaster } from "@/components/atoms/Toaster";
import { printPdf } from "@/utils/printPdf";
import Select from "@/components/atoms/Select";

export interface ProductReportAccordionItemProps {
  value: string;
}

export function ProductReportAccordionItem({ value }: ProductReportAccordionItemProps) {
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [shouldPrintProducts, setShouldPrintProducts] = useState(false);

  const [productInstance, updateProductInstance] = usePDF({
    document: <ProductReportView products={[]} />,
  });

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const handleGenerateProductReport = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await api.get("/products", {
        params: {
          search: productSearch,
          categoryId: productCategoryId || undefined,
          pageSize: 1000,
          orderBy: "description",
          ascending: true,
        },
      });
      const data = response.data.data as ProductType[];

      if (data.length === 0) {
        toaster.create({
          title: "Nenhum produto encontrado",
          description: "Não existem produtos para os filtros selecionados.",
          type: "info",
        });
        setIsLoadingProducts(false);
        return;
      }

      const categoryName = categories.find((c) => c.id === productCategoryId)?.name;
      updateProductInstance(<ProductReportView products={data} search={productSearch} categoryName={categoryName} />);
      setShouldPrintProducts(true);
    } catch {
      toaster.create({
        title: "Erro ao buscar dados",
        description: "Ocorreu um problema ao buscar os produtos para o relatório.",
        type: "error",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (shouldPrintProducts && !productInstance.loading && productInstance.url) {
      printPdf(productInstance.url);
      setShouldPrintProducts(false);
    }
  }, [productInstance.loading, productInstance.url, shouldPrintProducts]);

  return (
    <Accordion.Item
      value={value}
      mt="4"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
    >
      <Accordion.ItemTrigger _hover={{ bg: "gray.50" }} cursor="pointer" p="4">
        <HStack gap="4" width="full">
          <Icon as={LuPackage} color="primary.500" fontSize="lg" />
          <Box flex="1" textAlign="left">
            <Text fontWeight="bold">Relatório de produtos</Text>
            <Text fontSize="xs" color="gray.500">
              Relatório de produtos com filtros por referência, nome ou categoria.
            </Text>
          </Box>
          <Accordion.ItemIndicator />
        </HStack>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Box p="4" borderTop="1px solid" borderColor="gray.100">
          <Flex gap="6" direction={{ base: "column", md: "row" }} align={{ md: "flex-end" }}>
            <Field.Root maxW="200px">
              <Field.Label fontSize="xs" fontWeight="bold">
                Busca (Ref/Nome/Descrição)
              </Field.Label>
              <Input value={productSearch} onChange={(e) => setProductSearch(e.target.value)} size="sm" px="2" />
            </Field.Root>

            <Box>
              <Select
                label="Categoria"
                selectedValue={productCategoryId}
                onChange={(value) => setProductCategoryId(value)}
                onClear={() => setProductCategoryId("")}
                options={categories.map((c) => ({ label: c.name, value: c.id }))}
                size="sm"
                width="200px"
              />
            </Box>

            <Button
              colorPalette="primary"
              onClick={handleGenerateProductReport}
              loading={isLoadingProducts || (productInstance.loading && shouldPrintProducts)}
              size="sm"
              px="8"
            >
              Imprimir
            </Button>
          </Flex>
        </Box>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
