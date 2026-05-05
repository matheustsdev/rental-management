"use client";

import PageContainer from "@/components/molecules/PageContainer";
import { Accordion, Box, Button, Card, Field, HStack, Input, Stack, Text, Icon, Grid, GridItem, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { format, differenceInDays, parseISO, addDays } from "date-fns";
import { usePDF } from "@react-pdf/renderer";
import DailyReportView from "@/components/molecules/RentReportView";
import ProductReportView from "@/components/molecules/ProductReportView";
import { api } from "@/services/api";
import { RentType } from "@/types/entities/RentType";
import { ProductType } from "@/types/entities/ProductType";
import { CategoryType } from "@/types/entities/CategoryType";
import { FaFilePdf } from "react-icons/fa";
import { LuBarChart3, LuPackage, LuChevronDown } from "react-icons/lu";
import { toaster } from "@/components/atoms/Toaster";
import dynamic from "next/dynamic";
import { printPdf } from "@/utils/printPdf";
import Select from "@/components/atoms/Select";

function ReportsContent() {
  // Rent Report States
  const [startDate, setStartDate] = useState(format(addDays(new Date(), -7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);

  // Product Report States
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [shouldPrintProducts, setShouldPrintProducts] = useState(false);

  const [instance, updateInstance] = usePDF({
    document: <DailyReportView rents={[]} startDate={startDate} endDate={endDate} />,
  });

  const [productInstance, updateProductInstance] = usePDF({
    document: <ProductReportView products={[]} />,
  });

  const rangeDays = differenceInDays(parseISO(endDate), parseISO(startDate));
  const isInvalidRange = rangeDays > 30 || rangeDays < 0;

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const handleGenerateReport = async () => {
    if (isInvalidRange) return;

    setIsLoadingData(true);
    try {
      const response = await api.get("/rents", {
        params: {
          startDate,
          endDate,
          pageSize: 500,
          orderBy: "rent_date",
          ascending: true,
        },
      });
      const data = response.data.data as RentType[];

      if (data.length === 0) {
        toaster.create({
          title: "Nenhum aluguel encontrado",
          description: "Não existem aluguéis agendados para este período.",
          type: "info",
        });
        setIsLoadingData(false);
        return;
      }

      updateInstance(<DailyReportView rents={data} startDate={startDate} endDate={endDate} />);
      setShouldPrint(true);
    } catch {
      toaster.create({
        title: "Erro ao buscar dados",
        description: "Ocorreu um problema ao buscar os aluguéis para o relatório.",
        type: "error",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

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
    if (shouldPrint && !instance.loading && instance.url) {
      printPdf(instance.url);
      setShouldPrint(false);
    }
  }, [instance.loading, instance.url, shouldPrint]);

  useEffect(() => {
    if (shouldPrintProducts && !productInstance.loading && productInstance.url) {
      printPdf(productInstance.url);
      setShouldPrintProducts(false);
    }
  }, [productInstance.loading, productInstance.url, shouldPrintProducts]);

  return (
    <PageContainer title="Relatórios" flexDir="column">
      <Stack gap="8" w="full" mt={4}>
        <Text color="gray.600">Selecione o tipo de relatório que deseja gerar.</Text>

        <Accordion.Root defaultValue={["financeiro"]} variant="subtle" collapsible>
          {/* Categorias entrarão aqui */}
        </Accordion.Root>
      </Stack>
    </PageContainer>
  );
}

export default dynamic(() => Promise.resolve(ReportsContent), {
  ssr: false,
});
