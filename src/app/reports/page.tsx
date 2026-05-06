"use client";

import PageContainer from "@/components/molecules/PageContainer";
import { Accordion, Stack, Text } from "@chakra-ui/react";
import { RentReportAccordionItem } from "@/components/molecules/RentReportAccordionItem";
import { ProductReportAccordionItem } from "@/components/molecules/ProductReportAccordionItem";
import dynamic from "next/dynamic";

function ReportsContent() {
  return (
    <PageContainer title="Relatórios" flexDir="column">
      <Stack gap="8" w="full" mt={4}>
        <Text color="gray.600">Selecione o tipo de relatório que deseja gerar.</Text>

        <Accordion.Root defaultValue={["alugueis"]} variant="subtle" collapsible>
          <RentReportAccordionItem value="alugueis" />
          <ProductReportAccordionItem value="produtos" />
        </Accordion.Root>
      </Stack>
    </PageContainer>
  );
}

export default dynamic(() => Promise.resolve(ReportsContent), {
  ssr: false,
});
