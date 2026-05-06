# Spec: Redesign da Página de Relatórios

## 1. Objetivo
Refatorar a interface da página de relatórios (`/reports`) para substituir o layout de cartões dispersos por uma estrutura organizada em categorias utilizando Accordions. O objetivo é melhorar a escaneabilidade, consistência visual e facilitar a expansão futura para novos tipos de relatórios.

## 2. Requisitos de Interface (UI)
- **Organização por Categorias:** Agrupar relatórios relacionados em seções expansíveis (Accordion).
- **Consistência de Tamanho:** Todos os itens de relatório devem ocupar a largura total do container principal, evitando blocos de tamanhos diferentes.
- **Acesso Direto aos Filtros:** Ao expandir um relatório, os filtros (datas, busca, categorias) devem ser exibidos diretamente na tela (Opção A do brainstorm).
- **Estética Moderna:** Utilizar ícones representativos para cada categoria e estados visuais claros (hover, active, expanded).
- **Componentes:** Utilizar exclusivamente Chakra UI v3 e ícones da biblioteca `lucide-react` ou `react-icons`.

## 3. Estrutura de Categorias Sugerida
1.  **Movimentação e Financeiro (Ícone: LuBarChart3 ou FaChartLine)**
    *   Relatório: Aluguéis por período (Filtros: Data Inicial, Data Final).
2.  **Inventário e Catálogo (Ícone: LuPackage ou FaBoxes)**
    *   Relatório: Lista de Produtos (Filtros: Busca Ref/Nome, Categoria).

## 4. Alterações Técnicas

### 4.1 Interface do Usuário (Frontend)
- **Arquivo:** `src/app/reports/page.tsx`
  - Substituir o `Grid` e `GridItem` por um componente `Accordion.Root`.
  - Criar uma estrutura de dados (ou componentes internos) para renderizar os relatórios dentro dos `Accordion.Item`.
  - Manter a lógica de estado atual (`startDate`, `endDate`, `productSearch`, `productCategoryId`) mas reorganizar o JSX para maior clareza.
  - O layout de filtros dentro de cada relatório deve ser responsivo (HStack/Grid que vira Stack em telas menores).

### 4.2 Componentes Chakra UI v3
- Usar `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`, `Accordion.ItemContent` e `Accordion.ItemIndicator`.
- Manter o uso de `Card.Root` ou `Box` estilizado dentro do Accordion para agrupar os filtros e o botão de ação.

## 5. Plano de Implementação
1.  **Limpeza:** Remover a estrutura de `Grid` e os `Card` avulsos atuais.
2.  **Estrutura Base:** Implementar o `Accordion.Root` com as categorias principais.
3.  **Migração de Funcionalidades:** Mover os filtros e botões de "Aluguéis por período" para a primeira categoria.
4.  **Migração de Funcionalidades:** Mover os filtros e botões de "Relatório de Produtos" para a segunda categoria.
5.  **Polimento:** Ajustar espaçamentos, ícones e responsividade.

## 6. Plano de Testes
- Verificar se todos os filtros continuam funcionando e disparando a geração do PDF corretamente.
- Testar a expansão e colapso das categorias.
- Validar o layout em dispositivos móveis (os filtros devem empilhar verticalmente).
- Garantir que não houve regressão na lógica de impressão (`printPdf`).
