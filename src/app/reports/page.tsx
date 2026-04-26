"use client";

import PageContainer from "@/components/molecules/PageContainer";
import { Button, Card, Field, HStack, Input, Stack, Text, Icon, Grid, GridItem, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { format, differenceInDays, parseISO, addDays } from "date-fns";
import { usePDF } from "@react-pdf/renderer";
import DailyReportView from "@/components/molecules/RentReportView";
import { api } from "@/services/api";
import { RentType } from "@/types/entities/RentType";
import { FaFilePdf } from "react-icons/fa";
import { toaster } from "@/components/atoms/Toaster";
import dynamic from "next/dynamic";

function ReportsContent() {
  const [startDate, setStartDate] = useState(format(addDays(new Date(), -7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [shouldDownload, setShouldDownload] = useState(false);

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
      setShouldDownload(true);
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
    if (shouldDownload && !instance.loading && instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `Relatorio_Alugueis_${startDate}_a_${endDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShouldDownload(false);

      toaster.create({
        title: "Relatório gerado",
        description: "O download do PDF deve iniciar automaticamente.",
        type: "success",
      });
    }
  }, [instance.loading, instance.url, shouldDownload, startDate, endDate]);

  return (
    <PageContainer title="Relatórios" flexDir="column">
      <Stack gap="8" w="full" mt={4}>
        <Text color="gray.600">Selecione o tipo de relatório que deseja gerar.</Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap="6">
          <GridItem>
            <Card.Root variant="outline" borderColor="gray.200" boxShadow="sm">
              <Card.Header borderBottomWidth="1px" borderColor="gray.100" bg="gray.50" p="4">
                <HStack>
                  <Icon as={FaFilePdf} color="primary.300" />
                  <Card.Title fontSize="md">Aluguéis por período</Card.Title>
                </HStack>
              </Card.Header>
              <Card.Body p="4">
                <Flex gap="4" direction="column">
                  <Flex gap="4">
                    <Field.Root invalid={rangeDays < 0}>
                      <Field.Label fontSize="xs" fontWeight="bold">
                        Data Inicial
                      </Field.Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        size="sm"
                        px="2"
                      />
                    </Field.Root>

                    <Field.Root invalid={rangeDays > 30 || rangeDays < 0}>
                      <Field.Label fontSize="xs" fontWeight="bold">
                        Data Final
                      </Field.Label>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        size="sm"
                        px="2"
                      />
                    </Field.Root>
                  </Flex>

                  {(rangeDays > 30 || rangeDays < 0) && (
                    <Text color="red.500" fontSize="xs">
                      {rangeDays > 30 ? "Intervalo máx: 30 dias." : "Data final inválida."}
                    </Text>
                  )}

                  <Button
                    alignSelf="flex-end"
                    colorPalette="primary"
                    onClick={handleGenerateReport}
                    loading={isLoadingData || (instance.loading && shouldDownload)}
                    disabled={isInvalidRange}
                    size="sm"
                    width="1/4"
                  >
                    Gerar PDF
                  </Button>
                </Flex>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </Stack>
    </PageContainer>
  );
}

export default dynamic(() => Promise.resolve(ReportsContent), {
  ssr: false,
});
