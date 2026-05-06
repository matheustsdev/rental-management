# Redesign da Página de Relatórios Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar a página de relatórios para usar uma interface organizada por categorias com Accordions, melhorando a organização e escalabilidade.

**Architecture:** Refatoração do componente `ReportsContent` em `src/app/reports/page.tsx` para substituir o `Grid` por um `Accordion.Root`. A lógica de estado e as chamadas de API serão mantidas, mas o JSX será reorganizado.

**Tech Stack:** React 19, Next.js 15, Chakra UI v3, Lucide Icons / React Icons.

---

### Task 1: Preparação e Estrutura Base do Accordion

**Files:**
- Modify: `src/app/reports/page.tsx`

- [ ] **Step 1: Adicionar imports necessários do Chakra UI e Ícones**

```typescript
// Adicionar ao topo do arquivo
import { Accordion, Box, Text, Icon } from "@chakra-ui/react";
import { LuBarChart3, LuPackage, LuChevronDown } from "react-icons/lu";
```

- [ ] **Step 2: Substituir a estrutura de Grid pelo Accordion.Root básico**

```tsx
// Substituir o conteúdo do PageContainer
<Stack gap="8" w="full" mt={4}>
  <Text color="gray.600">Selecione o tipo de relatório que deseja gerar.</Text>

  <Accordion.Root defaultValue={["financeiro"]} variant="subtle" collapsible>
    {/* Categorias entrarão aqui */}
  </Accordion.Root>
</Stack>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/reports/page.tsx
git commit -m "refactor: add accordion base structure to reports page"
```

---

### Task 2: Implementar Categoria "Movimentação e Financeiro"

**Files:**
- Modify: `src/app/reports/page.tsx`

- [ ] **Step 1: Criar o Accordion.Item para Financeiro e mover o Relatório de Aluguéis**

```tsx
<Accordion.Item value="financeiro">
  <Accordion.ItemTrigger>
    <HStack gap="4" width="full">
      <Icon as={LuBarChart3} color="primary.500" />
      <Box flex="1" textAlign="left">
        <Text fontWeight="bold">Movimentação e Financeiro</Text>
        <Text fontSize="xs" color="gray.500">Relatórios de aluguéis, faturamento e fluxo de caixa.</Text>
      </Box>
      <Accordion.ItemIndicator />
    </HStack>
  </Accordion.ItemTrigger>
  <Accordion.ItemContent>
    <Box p="4" bg="gray.50/50" borderRadius="md" border="1px solid" borderColor="gray.100">
      <Text fontWeight="bold" mb="4" fontSize="sm">Aluguéis por período</Text>
      <Flex gap="6" direction={{ base: "column", md: "row" }} align={{ md: "flex-end" }}>
        <Field.Root invalid={rangeDays < 0} maxW="200px">
          <Field.Label fontSize="xs" fontWeight="bold">Data Inicial</Field.Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="sm" />
        </Field.Root>

        <Field.Root invalid={rangeDays > 30 || rangeDays < 0} maxW="200px">
          <Field.Label fontSize="xs" fontWeight="bold">Data Final</Field.Label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="sm" />
        </Field.Root>

        <Button
          colorPalette="primary"
          onClick={handleGenerateReport}
          loading={isLoadingData || (instance.loading && shouldPrint)}
          disabled={isInvalidRange}
          size="sm"
          px="8"
        >
          Gerar PDF
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
```

- [ ] **Step 2: Verificar funcionamento e commit**

```bash
git add src/app/reports/page.tsx
git commit -m "feat: implement financial category in reports accordion"
```

---

### Task 3: Implementar Categoria "Inventário e Catálogo"

**Files:**
- Modify: `src/app/reports/page.tsx`

- [ ] **Step 1: Criar o Accordion.Item para Inventário e mover o Relatório de Produtos**

```tsx
<Accordion.Item value="inventario" mt="4">
  <Accordion.ItemTrigger>
    <HStack gap="4" width="full">
      <Icon as={LuPackage} color="primary.500" />
      <Box flex="1" textAlign="left">
        <Text fontWeight="bold">Inventário e Catálogo</Text>
        <Text fontSize="xs" color="gray.500">Relatórios de produtos, categorias e disponibilidade.</Text>
      </Box>
      <Accordion.ItemIndicator />
    </HStack>
  </Accordion.ItemTrigger>
  <Accordion.ItemContent>
    <Box p="4" bg="gray.50/50" borderRadius="md" border="1px solid" borderColor="gray.100">
      <Text fontWeight="bold" mb="4" fontSize="sm">Relatório de Produtos</Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6" alignItems="flex-end">
        <Field.Root>
          <Field.Label fontSize="xs" fontWeight="bold">Busca (Ref/Nome)</Field.Label>
          <Input placeholder="Ex: Vestido..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} size="sm" />
        </Field.Root>

        <Box>
          <Select
            label="Categoria"
            placeholder="Todas as categorias"
            selectedValue={productCategoryId}
            onChange={(value) => setProductCategoryId(value)}
            onClear={() => setProductCategoryId("")}
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            size="sm"
          />
        </Box>

        <Button
          colorPalette="primary"
          onClick={handleGenerateProductReport}
          loading={isLoadingProducts || (productInstance.loading && shouldPrintProducts)}
          size="sm"
        >
          Gerar PDF
        </Button>
      </Grid>
    </Box>
  </Accordion.ItemContent>
</Accordion.Item>
```

- [ ] **Step 2: Verificar funcionamento e commit**

```bash
git add src/app/reports/page.tsx
git commit -m "feat: implement inventory category in reports accordion"
```

---

### Task 4: Polimento e Limpeza Final

**Files:**
- Modify: `src/app/reports/page.tsx`

- [ ] **Step 1: Remover imports não utilizados (Grid, GridItem, Card, etc. se aplicável)**

```typescript
// Revisar e limpar imports no topo do arquivo
```

- [ ] **Step 2: Ajustar responsividade final e espaçamentos**

- [ ] **Step 3: Testar fluxo completo (gerar ambos os PDFs)**

- [ ] **Step 4: Commit**

```bash
git add src/app/reports/page.tsx
git commit -m "style: final polish and cleanup of reports page"
```
