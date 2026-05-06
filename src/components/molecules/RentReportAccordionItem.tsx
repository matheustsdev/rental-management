"use client";

import { Accordion, Box, Button, Field, HStack, Input, Text, Icon, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { format, differenceInDays, parseISO, addDays } from "date-fns";
import { usePDF } from "@react-pdf/renderer";
import DailyReportView from "@/components/molecules/RentReportView";
import { api } from "@/services/api";
import { RentType } from "@/types/entities/RentType";
import { LuChartBarBig } from "react-icons/lu";
import { toaster } from "@/components/atoms/Toaster";
import { printPdf } from "@/utils/printPdf";

export interface RentReportAccordionItemProps {
  value: string;
}

export function RentReportAccordionItem({ value }: RentReportAccordionItemProps) {
  const [startDate, setStartDate] = useState(format(addDays(new Date(), -7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);

  const [instance, updateInstance] = usePDF({
    document: <DailyReportView rents={[]} startDate={startDate} endDate={endDate} />,
  });

  const rangeDays = differenceInDays(parseISO(endDate), parseISO(startDate));
  const isInvalidRange = rangeDays > 30 || rangeDays < 0;

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

  useEffect(() => {
    if (shouldPrint && !instance.loading && instance.url) {
      printPdf(instance.url);
      setShouldPrint(false);
    }
  }, [instance.loading, instance.url, shouldPrint]);

  return (
    <Accordion.Item
      value={value}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
    >
      <Accordion.ItemTrigger _hover={{ bg: "gray.50" }} cursor="pointer" p="4">
        <HStack gap="4" width="full">
          <Icon as={LuChartBarBig} color="primary.500" fontSize="lg" />
          <Box flex="1" textAlign="left">
            <Text fontWeight="bold">Aluguéis por período</Text>
            <Text fontSize="xs" color="gray.500">
              Relatório detalhado de aluguéis dentro de um intervalo de datas (máx 30 dias).
            </Text>
          </Box>
          <Accordion.ItemIndicator />
        </HStack>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Box p="4" borderTop="1px solid" borderColor="gray.100">
          <Flex gap="6" direction={{ base: "column", md: "row" }} align={{ md: "flex-end" }}>
            <Field.Root invalid={rangeDays < 0} maxW="200px">
              <Field.Label fontSize="xs" fontWeight="bold">
                Data Inicial
              </Field.Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="sm" px="2" />
            </Field.Root>

            <Field.Root invalid={rangeDays > 30 || rangeDays < 0} maxW="200px">
              <Field.Label fontSize="xs" fontWeight="bold">
                Data Final
              </Field.Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="sm" px="2" />
            </Field.Root>

            <Button
              colorPalette="primary"
              onClick={handleGenerateReport}
              loading={isLoadingData || (instance.loading && shouldPrint)}
              disabled={isInvalidRange}
              size="sm"
              px="8"
            >
              Imprimir
            </Button>
          </Flex>
          {(rangeDays > 30 || rangeDays < 0) && (
            <Text color="red.500" fontSize="xs" mt="2">
              {rangeDays > 30 ? "Intervalo máx: 30 dias." : "Data final inválida."}
            </Text>
          )}
        </Box>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
