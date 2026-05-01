# Spec: Internal Observations for Rental Products

## 1. Problem Statement
The client requires a way to add internal notes to each specific product within a rental booking. Currently, observations are only available at the rental level (one internal and one for the receipt). Adding these notes at the product level allows for better tracking of item-specific details (e.g., "needs repair", "missing button", "specific cleaning required").

## 2. Goals
- Add a persistent internal observation field to each product in a rental.
- Allow users to input these observations during rental creation and editing.
- Display these observations in the "Aluguéis por Período" report, specifically positioned below each product's description.

## 3. Technical Design

### 3.1. Database (Prisma)
- **Table:** `rent_products`
- **New Field:** `internal_observations`
- **Type:** `String?` (mapped to `TEXT` in PostgreSQL)

### 3.2. Domain Layer (Clean Architecture)
- **Entity (`RentProduct`):** Add `internalObservations` property.
- **DTOs (`RentInsertWithProductDtoType`, `RentUpdateWithProductDtoType`):** Add `internalObservations` to the item structure.
- **Mapper (`RentMapper`):** Ensure bidirectional conversion between database field `internal_observations` and entity property `internalObservations`.

### 3.3. Application Layer
- **`CreateRentUseCase`:** Update to handle the new field when creating `RentProduct` instances.
- **`UpdateRentUseCase`:** Update to ensure observations are updated or preserved during rental modifications.

### 3.4. Infrastructure Layer
- **`PrismaRentalRepository`:** Update `create` and `update` methods to include the `internal_observations` field in the Prisma `createMany` and `update` payloads.

### 3.5. Presentation Layer (Frontend)
- **Rental Form (`Create/Edit Rent`):** 
    - Add a `DefaultInput` or `InputAreaField` below each product item.
    - Connect to `react-hook-form` using the `items[index].internalObservations` path.
- **Report (`RentReportView.tsx`):**
    - Update the product rendering logic to display `item.internalObservations` if present.
    - Position: Directly below the product description.
    - Styling: It should be visually distinct (e.g., slightly smaller text or italicized).

## 4. Testing Strategy (TDD)

### 4.1. Backend Tests
- **Unit Tests:**
    - `RentProduct` entity should correctly store and return `internalObservations`.
    - `RentMapper` should correctly map the new field.
- **Integration Tests:**
    - `PrismaRentalRepository.create` should persist the observation.
    - `PrismaRentalRepository.update` should update the observation.
    - `PrismaRentalRepository.find` should retrieve the observation.
- **Use Case Tests:**
    - `CreateRentUseCase` and `UpdateRentUseCase` should correctly process the new field from DTOs.

### 4.2. Frontend Tests
- **Component Tests:**
    - Verify that the input field for observations is rendered for each product in the rental form.
    - Verify that typing in the field updates the form state.
- **Report Tests:**
    - Verify that the PDF generator includes the observation text when data is provided.

## 5. Execution Stages
1. **Schema & Migration:** Apply Prisma changes and generate migration.
2. **Domain & Data Mapping:** Update entities, DTOs, and mappers (with tests).
3. **Repository Persistence:** Update repository implementation and integration tests.
4. **Application Logic:** Update use cases and verify with tests.
5. **API & Frontend Integration:** Update form components and report view.
6. **End-to-End Verification:** Manual check of the full flow.
