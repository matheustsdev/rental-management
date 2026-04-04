# Development Plan: View Rent Summary

## Requisitos funcionais
- **RF01**: Adicionar ação "Ver Resumo" na listagem de aluguéis (seja na exibição em Tabela ou dentro do `RentCard.tsx`).
- **RF02**: Ao acionar a ação "Ver Resumo", o sistema deve exibir um Modal (usando componentes do Chakra UI) sobreposto à tela atual.
- **RF03**: O Modal deve exibir de forma clara o status do aluguel em uma `Tag` (`SCHEDULED` ou `FINISHED`).
- **RF04**: Exibir de forma agrupada as informações do cliente (nome, endereço e telefone).
- **RF05**: Listar os produtos daquele aluguel através de uma tabela ou lista simplificada.
- **RF06**: Exibir as medidas personalizadas de cada produto listado (ex.: busto, cintura, quadril, ombro, manga, altura, costas).
- **RF07**: Exibir o resumo financeiro com os valores detalhados (subtotal, desconto, sinal/adiantamento e valor total final).

## Requisitos não funcionais
- **RN01**: **Nenhuma utilização de `any` (Tipagem Estrita)**. O TypeScript deve ser utilizado em todo o seu potencial tipando adequadamente os dados que trafegam para o componente. Se necessário criar novos *types* para o DTO de visualização, faça-o.
- **RN02**: **Princípio de Responsabilidade Única (SRP)**. O componente que exibe os dados (ex: `RentSummaryDetails.tsx`) deve ter como _única responsabilidade_ a **apresentação visual**. Ele não deve lidar com a busca de dados (fecth) nem lógicas de negócio complexas.
- **RN03**: Seguir os princípios do **Atomic Design** utilizado no projeto, criando componentes modulares e desacoplados.

---

## Frontend

### ✅ [Criar Tipagem para Resumo Visual (DTO/ViewModel)]
Criar ou expandir tipagens existentes para mapear com segurança todas as informações do cliente, dados de medidas por categoria do produto e valores financeiros envolvidos. *Nenhum `any` deve ser usado na tipagem do payload que irá alimentar os componentes de visualização!*

**Arquivos a serem alterados/criados:**
- `src/types/dtos/RentSummaryDTO.ts` (ou adicionar no já existente `src/types/entities/Rent.ts`)

### ✅ [Criar componente reutilizável `RentSummaryDetails`]
Criar um componente puramente visual (*molecule* ou *organism*, conforme granularidade) que receba o objeto de resumo tipado, e renderize em blocos: dados do cliente, status, a lista de produtos iterando sobre com suas respectivas medidas personalizadas e os dados financeiros.

**Arquivos a serem alterados/criados:**
- `src/components/molecules/RentSummaryDetails.tsx` (sugestão de alocação)

### ✅ [Criar `RentSummaryModal`]
Criar o Container propriamente dito (Modal customizado via Chakra UI) que será sobreposto na tela quando o usuário clicar na respectiva ação e que deve envolver o `RentSummaryDetails`. Este componente cuida do estado local de visualização (aberto/fechado).

**Arquivos a serem alterados/criados:**
- `src/components/organisms/RentSummaryModal.tsx`

### ✅ [Implementar a ação "Ver Resumo" na interface de Listagem]
Na listagem da página de aluguéis, injetar a ação "Ver Resumo". Isso implica atualizar o ActionMenu da tabela de listagem e também do `RentCard`, ligando a chamada ao gatilho de abertura do Modal para o aluguel selecionado.

**Arquivos a serem alterados:**
- `src/components/molecules/RentCard.tsx`
- `src/app/rents/page.tsx` (ou o componente responsável pela listagem, ex: `RentDataTable.tsx`)

## Backend

### [Garantia de Payload (Revisão)]
Como a estrutura da aplicação já possue os dados carregados ou fetch detalhado disponível (`GET /api/rents/[id]`), a princípio não serão necessárias inclusões no repositório. Porém é necessário garantir a passagem correta do objeto entre a chamada e a interface.

**Nenhum arquivo backend precisa ser alterado para cumprir esta funcionalidade se os retornos padrões já contemplarem relações (includes de cliente, rent_products e produtos) em sua completude.**
