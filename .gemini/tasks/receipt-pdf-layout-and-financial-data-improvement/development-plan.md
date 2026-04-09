# Development Plan - Melhoria no Layout e Dados Financeiros do Recibo em PDF

Melhorar o recibo em PDF do sistema de aluguel para incluir detalhamento financeiro completo, layout em duas vias (Cliente e Loja) lado a lado em formato A4 Paisagem, e identidade visual moderna baseada no Chakra UI.

## 1. Requisitos

### Requisitos funcionais
- **RF01**: Gerar o recibo em PDF no formato A4 com orientação Paisagem (Landscape).
- **RF02**: Exibir duas cópias idênticas do recibo (Via do Cliente e Via da Loja) dividindo a página ao meio.
- **RF03**: Listar detalhamento financeiro completo: Subtotal, Desconto aplicado, Sinal pago e Valor Restante a pagar.
- **RF04**: Calcular o `remainingBalance` (Valor Restante = Total - Desconto - Sinal) na camada de aplicação.
- **RF05**: Exibir estado de carregamento (spinner) no botão de emissão enquanto o PDF é gerado.
- **RF06**: Exibir notificação de erro caso a geração do PDF falhe.
- **RF07**: Diferenciar observações por via: Via do Cliente exibe `receipt_observations`, Via da Loja exibe `internal_observations`.

### Requisitos não funcionais
- **RN01**: Design visual moderno seguindo o padrão do Chakra UI (cores primárias, bordas arredondadas, tipografia limpa).
- **RN02**: Tratamento de paginação para listas longas de produtos utilizando `wrap={true}`.
- **RN03**: Limitação ou truncamento de observações extensas para evitar quebra de layout.
- **RN04**: O Valor Restante deve ser no mínimo R$ 0,00, nunca negativo.

## 2. Planejamento Técnico

### Backend

#### [Criação/Atualização do DTO de Aluguel]
Garantir que a estrutura de dados de retorno de aluguel inclua o campo `remaining_balance`. Como o projeto usa tipos baseados no Prisma Payload, adicionaremos o campo calculado no DTO ou estenderemos o tipo.

**Arquivos a serem alterados:**
- `src/types/entities/RentType.ts`

#### [Atualização dos Casos de Uso de Busca e Listagem]
Implementar a lógica de cálculo do `remaining_balance` nos casos de uso que retornam dados de aluguel para o frontend.

**Arquivos a serem alterados:**
- `src/core/application/cases/rent/FindRentUseCase.ts`
- `src/core/application/cases/rent/ListRentUseCase.ts`

#### [Atualização da Rota da API]
Garantir que os endpoints de aluguel retornem o objeto com o novo campo calculado.

**Arquivos a serem alterados:**
- `src/app/api/rents/[id]/route.ts`
- `src/app/api/rents/route.ts`

### Frontend

#### [Refatoração do Molecule `ReceiptView.tsx`]
- Alterar a configuração do `@react-pdf/renderer` para `A4` e `landscape`.
- Criar o subcomponente `ReceiptTicket` para renderizar uma via do recibo.
- Implementar o layout de 2 colunas com divisor central.
- Estilizar o recibo com bordas arredondadas, cores do tema e tipografia aprimorada.
- Adicionar os campos financeiros: Subtotal, Desconto, Sinal e Valor Restante.
- Garantir que `wrap={true}` seja usado nas tabelas de produtos.

**Arquivos a serem alterados:**
- `src/components/molecules/ReceiptView.tsx`

#### [Aprimoramento da UX em `RentPage.tsx`]
- Implementar estado de loading no botão de "Emitir recibo".
- Adicionar tratamento de erro com `toaster` caso `pdfLoading` resulte em erro ou timeout.
- Sincronizar o estado de `selectedRent` e a geração da instância do PDF para evitar múltiplos cliques.

**Arquivos a serem alterados:**
- `src/app/rents/page.tsx`

#### [Ajustes no Atom `ButtonMenu.tsx`]
- (Opcional) Adicionar suporte a `isLoading` nos itens do menu para feedback visual direto no botão clicado.

**Arquivos a serem alterados:**
- `src/components/atoms/ButtonMenu.tsx`
