# Development Plan - Product Internal Observation

Add a persistent internal observation field to each product in a rental, allowing tracking of item-specific details and displaying them in reports.

## Requisitos

### Requisitos funcionais
- **RF01**: Permitir adicionar uma observação interna para cada produto individual em um aluguel.
- **RF02**: Exibir as observações internas dos produtos no relatório de "Aluguéis por Período" (PDF).
- **RF03**: Persistir as observações tanto na criação quanto na edição de um aluguel.

### Requisitos não funcionais
- **RN01**: O campo de observação deve suportar múltiplos caracteres (tipo TEXT no banco).
- **RN02**: A interface deve ser responsiva e integrada aos componentes existentes.
- **RN03**: Seguir rigorosamente a Clean Architecture.

## Planejamento Técnico

### Backend

### ✅ [Task 1: Schema and Migration]
Atualizar o schema do banco de dados para incluir o novo campo `internal_observations` na tabela `rent_products` e gerar a migration correspondente.

#### Arquivos a serem alterados:
- `prisma/schema.prisma`
    ```prisma
    model rent_products {
      // ... campos existentes
      internal_observations String? @db.Text
    }
    ```

### [Task 2: Domain Layer Update]
Atualizar a entidade de domínio e os tipos para suportar o novo campo.

#### Arquivos a serem alterados:
- `src/core/domain/entities/RentProduct.ts`
- `src/types/entities/RentProductType.ts`

### [Task 3: Data Mapping and Repository]
Atualizar o mapper para converter o campo do banco para a entidade e vice-versa. Atualizar o repositório Prisma para persistir o novo campo.

#### Arquivos a serem alterados:
- `src/core/application/mappers/RentMapper.ts`
- `src/core/infrastructure/database/PrismaRentalRepository.ts`

### [Task 4: Use Cases Update]
Garantir que os casos de uso de criação e atualização processem o novo campo.

#### Arquivos a serem alterados:
- `src/core/application/cases/rent/CreateRentUseCase.ts` (Verificar se necessário)
- `src/core/application/cases/rent/UpdateRentUseCase.ts` (Verificar se necessário)

---

### Frontend

### [Task 5: Form Integration]
Adicionar o campo de entrada para observações internas no formulário de aluguel, dentro de cada item de produto.

#### Arquivos a serem alterados:
- `src/constants/schemas/RentProductSchema.ts` (ou onde o schema Zod estiver)
- `src/components/atoms/ProductMeasureItem.tsx`

### [Task 6: Report Update]
Exibir a observação interna no relatório PDF logo abaixo da descrição do produto.

#### Arquivos a serem alterados:
- `src/components/molecules/RentReportView.tsx`
