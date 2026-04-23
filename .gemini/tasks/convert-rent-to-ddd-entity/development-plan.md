# Development Plan - Convert Rent to DDD Entity

## Requisitos
### Requisitos funcionais
- **RF01**: Criar entidade `Rent` como Aggregate Root com métodos de cálculo financeiro.
- **RF02**: Criar entidade `RentProduct` como entidade filha.
- **RF03**: Implementar máquina de estados para transições de status na `Rent`.
- **RF04**: Substituir totalmente a entidade `Rental.ts` pela `Rent.ts`.
- **RF05**: Refatorar `CreateRentUseCase` e `UpdateRentUseCase` para utilizar a nova entidade.

### Requisitos não funcionais
- **RN01**: Seguir princípios de Clean Architecture (lógica no domínio).
- **RN02**: Manter tipagem estrita com TypeScript.
- **RN03**: Garantir que o repositório retorne instâncias da entidade (Repository Pattern purista).

## Backend

### 1. Criar Entidade RentProduct
Criar a entidade filha que conterá os dados específicos do item no aluguel.

#### Arquivos a serem criados:
- `src/core/domain/entities/RentProduct.ts`
    ```ts
    export class RentProduct {
      constructor(
        public readonly id: string,
        public readonly productId: string,
        public readonly productPrice: number,
        public readonly productDescription: string,
        public readonly measureType: string,
        public readonly measures: Record<string, number | null>,
        public readonly realReturnDate?: Date | null,
        public readonly realReturnBufferDays?: number | null
      ) {}
    }
    ```

### 2. Criar Entidade Rent (Aggregate Root)
Esta entidade substituirá a `Rental.ts`. Ela deve conter o método `conflictsWith` e as lógicas financeiras.

#### Arquivos a serem criados:
- `src/core/domain/entities/Rent.ts`
    ```ts
    import { RentProduct } from "./RentProduct";
    import { ERentStatus } from "@prisma/client";

    export class Rent {
      constructor(
        private props: RentProps
      ) {}

      // Métodos de cálculo
      public calculateTotal(): number { ... }
      public calculateRemainingBalance(): number { ... }
      
      // Validação de Status
      public transitionTo(newStatus: ERentStatus): void {
        // Lógica da máquina de estados
      }

      // Substituição da lógica de Rental.ts
      public conflictsWith(startDate: Date, endDate: Date, bufferDays: number): boolean {
        // Implementação vinda da antiga Rental.ts
      }
    }
    ```

### 3. Refatorar IRentalRepository
Alterar a interface para trabalhar com a entidade `Rent`.

#### Arquivos a serem alterados:
- `src/core/domain/repositories/IRentalRepository.ts`
- `src/core/infrastructure/repositories/PrismaRentalRepository.ts` (Implementar Mappers)

### 4. Refatorar Use Cases
Simplificar os casos de uso delegando a lógica para a entidade.

#### Arquivos a serem alterados:
- `src/core/application/cases/rent/CreateRentUseCase.ts`
- `src/core/application/cases/rent/UpdateRentUseCase.ts`

### 5. Remover Antiga Entidade
#### Arquivos a serem removidos:
- `src/core/domain/entities/Rental.ts`
