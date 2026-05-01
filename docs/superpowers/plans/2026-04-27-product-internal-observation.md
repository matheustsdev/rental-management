# Internal Observations for Rental Products Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add a persistent internal observation field to each product in a rental, allowing tracking of item-specific details and displaying them in reports.

**Architecture:** Following Clean Architecture, we will update the Prisma schema, Domain Entities, Mappers, Repositories, Use Cases, and finally the UI components and PDF Reports.

**Tech Stack:** Next.js 15, Prisma, TypeScript, Chakra UI v3, React Hook Form, Zod, Jest, React PDF.

---

### Task 1: Schema and Migration

**Files:**
- Modify: `prisma/schema.prisma`

- [x] **Step 1: Add field to schema**
Modify `rent_products` model in `prisma/schema.prisma`:
```prisma
model rent_products {
  // ... existing fields
  internal_observations String? @db.Text
}
```

- [x] **Step 2: Generate migration**
Run: `npx prisma migrate dev --name add_internal_observations_to_rent_products`
Expected: Migration generated and applied to the database.

---

### Task 2: Domain Layer Update

**Files:**
- Modify: `src/core/domain/entities/RentProduct.ts`
- Modify: `src/types/entities/RentProductType.ts`
- Test: `tests/core/domain/entities/RentProduct.test.ts` (Create if not exists)

- [x] **Step 1: Update RentProductProps and RentProduct class**
Add `internalObservations: string | null;` to `RentProductProps` and a getter to `RentProduct` in `src/core/domain/entities/RentProduct.ts`. Update `toJSON` as well.

- [x] **Step 2: Update RentProductType and DTOs**
Add `internal_observations: string | null;` to `RentProductType` in `src/types/entities/RentProductType.ts`. Ensure DTO types include it.

- [x] **Step 3: Write tests for RentProduct entity**
Create `tests/core/domain/entities/RentProduct.test.ts`:
```typescript
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { EMeasureType } from "@/constants/EMeasureType";

describe("RentProduct Entity", () => {
  it("should correctly store and return internalObservations", () => {
    const props = {
      id: "1",
      productId: "p1",
      productPrice: 100,
      productDescription: "Test",
      measureType: EMeasureType.NONE,
      internalObservations: "Needs repair",
      bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null
    };
    const entity = new RentProduct(props);
    expect(entity.internalObservations).toBe("Needs repair");
  });
});
```

- [x] **Step 4: Run tests**
Run: `npm test tests/core/domain/entities/RentProduct.test.ts`
Expected: PASS

---

### Task 3: Data Mapping and Repository

**Files:**
- Modify: `src/core/application/mappers/RentMapper.ts`
- Modify: `src/core/infrastructure/database/PrismaRentalRepository.ts`
- Test: `tests/core/infrastructure/database/PrismaRentalRepository.test.ts` (if exists) or use existing integration tests.

- [x] **Step 1: Update RentMapper**
In `src/core/application/mappers/RentMapper.ts`, update `toDto` to map `itemJson.internalObservations` to `internal_observations`.

- [x] **Step 2: Update PrismaRentalRepository**
In `src/core/infrastructure/database/PrismaRentalRepository.ts`, update `create` and `update` methods to include `internal_observations` in the `rent_products` payloads.

- [x] **Step 3: Verify with integration test**
If no specific repository test exists, ensure a test rental is created/updated in `tests/core/cases/rent/CreateRentUseCase.test.ts` and verify the field via a manual database check or by adding a retrieval assertion.

---

### Task 4: Application Layer (Use Cases)

**Files:**
- Modify: `tests/core/cases/rent/CreateRentUseCase.test.ts`
- Modify: `tests/core/cases/rent/UpdateRentUseCase.test.ts`

- [x] **Step 1: Update CreateRentUseCase tests**
Add `internal_observations` to the mock input in `tests/core/cases/rent/CreateRentUseCase.test.ts`.

- [x] **Step 2: Run tests**
Run: `npm test tests/core/cases/rent/CreateRentUseCase.test.ts`
Expected: PASS

---

### Task 5: Frontend Integration (Form)

**Files:**
- Modify: `src/constants/schemas/RentProductSchema.ts` (if it exists, find it first)
- Modify: `src/components/atoms/ProductMeasureItem.tsx`

- [x] **Step 1: Update RentProductSchema**
Search for `RentProductSchema` and add `internal_observations: z.string().optional()`.

- [x] **Step 2: Add Input to ProductMeasureItem**
In `src/components/atoms/ProductMeasureItem.tsx`, add a `Textarea` or `InputField` for `internal_observations` below the measures grid or within the `Accordion.ItemContent`.

```tsx
<InputField
  label="Observação Interna do Produto"
  registerProps={register(`rentProducts.${productIndex}.internal_observations` as Path<RentFormType>)}
  error={errors.rentProducts?.[productIndex]?.internal_observations}
/>
```

---

### Task 6: Report Update

**Files:**
- Modify: `src/components/molecules/RentReportView.tsx`

- [x] **Step 1: Display observation in PDF**
In `src/components/molecules/RentReportView.tsx`, update the item loop to render the observation below the product description.

```tsx
<View key={index} style={styles.tableRow}>
  <View style={styles.colProduct}>
    <Text>{item.productDescription}</Text>
    {item.internal_observations && (
      <Text style={{ fontSize: 7, color: COLORS.secondary, marginTop: 2 }}>
        Obs: {item.internal_observations}
      </Text>
    )}
  </View>
  <Text style={styles.colMeasures}>{activeMeasures || "Nenhuma medida necessária"}</Text>
</View>
```

- [x] **Step 2: Verify visually**
Generate a report in the application (development server) and verify the PDF output.
