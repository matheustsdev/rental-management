# Developmental Plan: Rent Summary (Fast View & Confirmation)

## Requisitos funcionais
- **RF01**: Nova ação "Ver Resumo" no menu de opções do aluguel.
- **RF02**: Exibição estruturada (Cliente, Datas, Status, Produtos, Medidas, Financeiro) em um Drawer lateral.
- **RF03**: Implementação de um passo de revisão obrigatório no `AddRentModal` antes do salvamento.
- **RF04**: Cálculo dinâmico dos valores financeiros no frontend.
- **RF05**: Suporte a produtos inativos (soft-deleted) carregando de `Rent Products`.

## Requisitos não funcionais
- **RNF01**: Skeleton Loaders para carregamento inicial.
- **RNF02**: Scroll interno para listagem de múltiplos produtos.
- **RNF03**: Reutilização de componente visual entre Drawer e Step de Revisão.

---

## Technical Planning (Frontend / Backend)

### Frontend

#### [1] Criar Molécula `RentSummaryDetails.tsx`
Componente puro que recebe `RentType` ou dados do formulário e renderiza por seções (Header, Itens, Medidas, Footer Financeiro).
**Arquivos a serem criados:**
- `src/components/molecules/RentSummaryDetails.tsx`

#### [2] Criar Organismo `RentSummaryDrawer.tsx`
Componente Drawer do Chakra UI que gerencia o estado de abertura, busca o aluguel via API (ID) e renderiza o `RentSummaryDetails`.
**Arquivos a serem criados:**
- `src/components/organisms/RentSummaryDrawer.tsx`

#### [3] Atualizar `RentCard.tsx` e `ButtonMenu.tsx`
Adicionar a opção de visualização no menu.
**Arquivos a serem alterados:**
- `src/components/molecules/RentCard.tsx`
- `src/components/atoms/ButtonMenu.tsx` (Se necessário para lidar com novas prop-actions).

#### [4] Refatorar `AddRentModal.tsx`
Incluir o último step de confirmação utilizando `RentSummaryDetails`.
**Arquivos a serem alterados:**
- `src/components/organisms/AddRentModal.tsx`

---

### Backend

#### [1] Validar Caso de Uso e Repositório
O caso de uso `FindRentUseCase` já está completo, garantindo apenas que ele seja utilizado na nova rota de frontend ou via API de consulta direta se necessário.
**Arquivos a serem validados (sem alterações previstas):**
- `src/core/application/cases/rent/FindRentUseCase.ts`
- `src/core/infrastructure/database/PrismaRentalRepository.ts`
