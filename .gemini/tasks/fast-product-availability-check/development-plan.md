# [cite_start]Development Plan: Fast Product Availability Check [cite: 1]

## 1. Requisitos

### Requisitos funcionais
- **RF01**: Permitir a verificação de disponibilidade de um produto específico através de seu ID/Referência e um intervalo de datas (Data Início e Data Fim).
- **RF02**: Exibir status "Disponível" quando o produto não possuir aluguéis ou períodos de buffer conflitantes no intervalo solicitado.
- **RF03**: Exibir status "Indisponível / Alugado" quando houver sobreposição direta com um aluguel existente (status `SCHEDULED`, `RENTED` ou `FINISHED`).
- **RF04**: Exibir status "Em Preparação / Buffer" quando o intervalo solicitado cair dentro do período de higienização de um aluguel anterior.
- **RF05**: Renderizar o componente `RentCard.tsx` com os detalhes do aluguel conflitante sempre que o status for diferente de "Disponível".
- **RF06**: Se houver múltiplos conflitos no período, retornar o primeiro conflito encontrado (mais próximo da data de início).

### Requisitos não funcionais
- **RN01**: **Soft Delete**: Ignorar estritamente aluguéis e produtos onde `deleted_at` não seja nulo.
- **RN02**: **Cálculo de Buffer**: Utilizar a data real de retorno para calcular o buffer se o aluguel estiver `FINISHED`. Caso contrário, usar a data de devolução prevista.
- **RN03**: **Validação**: Garantir via Zod que `endDate` seja maior ou igual a `startDate`.
- **RN04**: **Arquitetura**: Seguir rigorosamente os padrões da Clean Architecture (Domain -> Application -> Infrastructure -> Presentation).
- **RN05**: **Performance**: Realizar a busca de conflitos em uma única query otimizada sempre que possível.

## 2. Planejamento Técnico

### Backend

#### ✅ Atualização de Tipagem e Entidades
Definir a estrutura de resposta da disponibilidade para garantir tipagem forte em todo o fluxo.

**Arquivos a serem alterados:**
- `src/types/entities/AvailabilityType.ts` [NEW]
- `src/constants/EAvailabilityStatus.ts` [MODIFY]

#### ✅ Atualização de Repositório (Domain & Infra)
Adicionar método para buscar aluguéis sobrepostos considerando as regras de negócio e soft delete.

**Arquivos a serem alterados:**
- `src/core/domain/repositories/IRentalRepository.ts` [MODIFY]
- `src/core/infrastructure/repositories/PrismaRentalRepository.ts` [MODIFY]

#### ✅ Criação do Use Case (Application)
Implementar a lógica de negócio central que decide o status da disponibilidade (Available, Rented, Buffer) baseada nos dados do repositório.

**Arquivos a serem alterados:**
- `src/core/application/cases/product/CheckProductAvailabilityUseCase.ts` [NEW]
- `src/core/application/dto/CheckAvailabilityResponseDTO.ts` [NEW]

#### ✅ Atualização da Rota API (Presentation)
Refatorar a rota `GET /api/availability` para aceitar range de datas, validar parâmetros com Zod e chamar o novo Use Case via Repository Factory.

**Arquivos a serem alterados:**
- `src/app/api/availability/route.ts` [MODIFY]

### Frontend

#### ✅ Criação do Componente de Verificação (Molecules)
Desenvolver o componente `AvailabilityChecker.tsx` que contém o formulário de busca (Produto + Datas) e gerencia os estados de loading e erro.

**Arquivos a serem alterados:**
- `src/components/molecules/AvailabilityChecker.tsx` [NEW]

#### ✅ Integração Visual e Feedback
Implementar a exibição condicional dos alertas de status e a renderização do `RentCard.tsx` para conflitos.

**Arquivos a serem alterados:**
- `src/components/molecules/AvailabilityChecker.tsx` [MODIFY]
- `src/components/molecules/RentCard.tsx` [CHECK FOR REUSE]

#### ✅ Inclusão na Interface Principal
Adicionar o acionador (botão/modal) do Check de Disponibilidade na página de Produtos ou Dashboard.

**Arquivos a serem alterados:**
- `src/app/products/page.tsx` [MODIFY]