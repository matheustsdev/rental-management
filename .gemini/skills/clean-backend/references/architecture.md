# Clean Architecture Layers

## 1. Domain Layer (`src/core/domain/`)
- **Entities**: Plain TypeScript classes or types representing business concepts.
- **Repositories**: Interfaces (`I...Repository.ts`) defining the contract for data access.

## 2. Application Layer (`src/core/application/`)
- **Use Cases**: Classes implementing `execute()` for specific actions.
- **DTOs**: Data Transfer Objects (`src/types/entities/`) usually based on `Prisma.ModelGetPayload`.

## 3. Infrastructure Layer (`src/core/infrastructure/`)
- **Persistence**: Prisma implementations of repository interfaces.
- **Factories**: Centralized instantiation in `repositoriesFactory.ts`.

## 4. Presentation (API) Layer (`src/app/api/`)
- Handles HTTP request/response.
- Orchestrates Use Cases.
- Uses `DefaultResponse` and `ErrorResponse` wrappers.
