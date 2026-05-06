# Spec: Relatório de Produtos (PDF)

## 1. Objetivo
Implementar a funcionalidade de geração de relatório de produtos em formato PDF, com layout de tabela estilo Excel, permitindo filtragem por texto e categoria.

## 2. Requisitos Funcionais
- Filtro por texto (Referência, Descrição ou Descrição de Recibo) replicando a lógica de `unaccent` e `ILIKE`.
- Filtro por categoria.
- Ordenação padrão por nome (descrição).
- Layout em modo Retrato (Portrait).
- Colunas da tabela:
  1. `#` (Índice incremental)
  2. `Referência`
  3. `Produto` (Campo `description`)
  4. `Descrição Detalhada` (Campo `receipt_description`)
  5. `Valor` (Formatado como moeda R$)

## 3. Alterações Técnicas

### 3.1 Camada de Dados (Repository)
- **Arquivo:** `src/core/domain/repositories/IProductRepository.ts`
  - Adicionar `categoryId?: string` ao tipo `ProductListInput`.
- **Arquivo:** `src/core/infrastructure/database/PrismaProductRepository.ts`
  - Atualizar o método `list` para incluir o filtro de `categoryId`.
  - Se houver `search`, a consulta SQL Raw deve ser atualizada para incluir `AND "category_id" = ${categoryId}` se o parâmetro for fornecido.
  - Atualizar o método `count` para aceitar os mesmos filtros e retornar o total correto.

### 3.2 Camada de Aplicação (Use Case)
- **Arquivo:** `src/core/application/cases/product/ListProductUseCase.ts`
  - Garantir que o `categoryId` seja passado do input para os métodos do repositório (`count` e `list`).

### 3.3 API Route
- **Arquivo:** `src/app/api/products/route.ts`
  - Extrair `categoryId` dos query parameters e passar para o Use Case.

### 3.4 Visualização (PDF Component)
- **Arquivo:** `src/components/molecules/ProductReportView.tsx`
  - Novo componente utilizando `@react-pdf/renderer`.
  - Estilização de tabela com bordas finas e cabeçalho destacado.
  - Cálculo de larguras de colunas para garantir legibilidade no modo Retrato.

### 3.5 Interface do Usuário (Frontend)
- **Arquivo:** `src/app/reports/page.tsx`
  - Adicionar novo card para "Relatório de Produtos".
  - Incluir filtros: Input de busca e Select de Categoria.
  - Carregar categorias da API `GET /api/categories`.
  - Implementar lógica de geração que busca os dados (com `pageSize` alto) e dispara a impressão via `printPdf`.

## 4. Design de Interface (Relatório)
- **Formato:** A4 Retrato.
- **Cabeçalho:** Título "Relatório de Produtos" e data de geração.
- **Tabela:**
  - Linhas com cores alternadas (opcional) ou apenas bordas.
  - Alinhamento à esquerda para textos e à direita para valores monetários.

## 5. Plano de Testes
- Verificar se o filtro de texto funciona corretamente com e sem acentos.
- Verificar se o filtro de categoria retorna apenas produtos daquela categoria.
- Verificar se a contagem (coluna `#`) está correta.
- Validar a formatação de moeda.
- Garantir que produtos marcados como `deleted: true` não apareçam.
