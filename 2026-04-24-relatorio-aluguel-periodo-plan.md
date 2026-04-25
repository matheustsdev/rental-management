# Plano de Implementação: Relatório de Aluguéis por Período

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar funcionalidade de emissão de relatório em PDF de aluguéis para um período de até 30 dias na tela inicial.

**Architecture:** O relatório será gerado no frontend usando `@react-pdf/renderer`, consumindo a API de listagem de aluguéis existente com filtros de data.

**Tech Stack:** Next.js (App Router), Chakra UI, @react-pdf/renderer, Prisma, TypeScript.

---

## Status Atual
- [x] **API**: Rota `GET /api/rents` atualizada para suportar `startDate` e `endDate`.
- [x] **Componente PDF**: `src/components/molecules/DailyReportView.tsx` criado com suporte a medidas e formatação Rose Noivas.
- [ ] **Interface**: Atualização da `src/app/page.tsx` pendente.

---

## 1. Interface na Home Page

### Tarefa 1: Implementar UI de Relatórios
**Arquivos:**
- Modificar: `src/app/page.tsx`

- [ ] **Passo 1: Adicionar estados e validação**
    Implementar estados para `startDate`, `endDate` e lógica de validação de 30 dias usando `date-fns`.

- [ ] **Passo 2: Criar componentes de UI (Chakra UI)**
    Adicionar um `Card` centralizado com inputs de data e o botão de ação.

```tsx
// Exemplo de lógica de validação
const isInvalidRange = differenceInDays(parseISO(endDate), parseISO(startDate)) > 30;
```

- [ ] **Passo 3: Integrar busca de dados e PDF**
    Utilizar o hook `usePDF` e a função `updateInstance` para disparar o download quando os dados da API retornarem.

---

## 2. Verificação e Testes

- [ ] **Teste 1: Limite de 30 dias**
    Verificar se o sistema bloqueia/avisa caso o usuário selecione mais de 30 dias.
    
- [ ] **Teste 2: Filtro de Data**
    Confirmar se os aluguéis no PDF correspondem exatamente ao intervalo de `rent_date` selecionado.

- [ ] **Teste 3: Medidas dos Produtos**
    Validar se as medidas (Busto, Cintura, etc.) aparecem corretamente para Vestidos e Ternos no PDF.

- [ ] **Teste 4: Sem Resultados**
    Garantir que o sistema informe adequadamente se não houver aluguéis no período.

---

## 3. Conclusão

- [ ] **Passo 1: Commit final das alterações**
- [ ] **Passo 2: Limpeza de logs e debug**
