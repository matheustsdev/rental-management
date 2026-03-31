# Testing Plan - Rental Management Application

**Status**: Planning Phase ✅  
**Last Updated**: March 23, 2026  
**Implementation Order**: Phase 0 (Completed) → Phase 1 → Phase 2 → Phase 3 → Phase 4

---

## Executive Summary

Setup Jest for unit + integration testing with SQLite (in-memory) and fully mocked external services. Focus: **Complete all Phase 1 (40 business logic tests) before moving to Phase 2 (components).**

**Target Coverage**: 80%+ (statements, functions, lines)  
**Test Framework**: Jest + @testing-library/react  
**Test Data**: Faker.js + factory functions

---

## Technology Stack

```json
{
  "devDependencies": {
    "jest": "^29.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "jest-mock-extended": "^3.x",
    "ts-jest": "^29.x",
    "@types/jest": "^29.x",
    "faker": "^6.x"
  }
}
```

---

## Phase 0: Infrastructure Setup (Prerequisite)

### 0.1 Install Dependencies
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-mock-extended ts-jest @types/jest faker
```

### 0.2 Create Configuration Files

**`jest.config.ts`**
- Test environment: node (for unit tests), jsdom (for component tests)
- Module resolution: use tsconfig paths (@/*)
- Setup files: `tests/setup.ts`
- Coverage thresholds: 80% statements, 75% branches, 80% functions, 80% lines
- Test match patterns: `**/tests/**/*.test.ts` and `**/*.test.ts`

**`tests/setup.ts`**
- Mock Supabase client (auth, database)
- Mock Prisma client (use SQLite in-memory database)
- Mock Next.js router
- Setup test utilities

**`tests/utils/factories.ts`**
- Product factory (buildProduct)
- Rent factory (buildRent)
- RentProduct factory (buildRentProduct)
- Category factory (buildCategory)

**`tests/utils/test-helpers.ts`**
- Date helpers (buildDate, nextDays, etc.)
- Faker-based random data generators
- Custom Jest matchers

### 0.3 Update package.json Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Phase 1: Business Logic & Use Case Tests ⭐ PRIMARY FOCUS

**Total: 40 test cases across rent and product domains**  
**Timeline**: Complete this phase before moving to Phase 2

### 1.1 Rent Domain Use Cases (30 tests)

#### Create rent use case (8 tests)
File: `tests/core/cases/rent/CreateRentUseCase.test.ts`

```
✅ Test 1: Create rent with valid data
   - Input: client, rentDate, returnDate, products
   - Expected: Rent created with SCHEDULED status
   - Coverage: Happy path, pricing calculation

✅ Test 2: Create rent with PERCENTAGE discount
   - Input: discount = { type: "PERCENTAGE", value: 10 }
   - Expected: Total price reduced by 10%
   - Coverage: Discount logic, edge case: 0% discount

✅ Test 3: Create rent with FIXED discount
   - Input: discount = { type: "FIXED", value: 50 }
   - Expected: Total price reduced by $50
   - Coverage: Fixed discount, edge case: discount > total

✅ Test 4: Reject rent when product not available
   - Input: Overlapping rent exists
   - Expected: Error thrown, availability validation
   - Coverage: Availability service integration

✅ Test 5: Reject rent with invalid date range
   - Input: returnDate <= rentDate
   - Expected: Error: "Return date must be after rent date"
   - Coverage: Date validation

✅ Test 6: Reject rent with past dates
   - Input: rentDate in the past
   - Expected: Error: "Rent date cannot be in the past"
   - Coverage: Date validation

✅ Test 7: Create rent with signal deposit
   - Input: signalDeposit = true, amount = 100
   - Expected: Total includes signal deposit
   - Coverage: Signal deposit calculation

✅ Test 8: Calculate total price correctly
   - Input: 2 products @ $50 each, 5-day rental
   - Expected: Total = (50 * 2) * 5 = $500
   - Coverage: Complex pricing with multiple products
```

#### ListRentUseCase (6 tests)
File: `tests/core/cases/rent/ListRentUseCase.test.ts`

```
✅ Test 9: List all active rents (not deleted)
   - Mock: 5 active rents, 2 deleted rents in database
   - Expected: Returns 5 rents only
   - Coverage: Soft delete filtering

✅ Test 10: Filter rents by client name
   - Input: clientName = "John Doe"
   - Expected: Only rents matching "John Doe" returned
   - Coverage: Search logic, case-insensitivity

✅ Test 11: Filter rents by status
   - Input: status = "IN_PROGRESS"
   - Expected: Only IN_PROGRESS rents returned
   - Coverage: Status filtering, all 3 statuses tested separately

✅ Test 12: Filter rents by date range
   - Input: startDate = 2025-03-01, endDate = 2025-03-10
   - Expected: Only rents within range returned
   - Coverage: Date range comparison, edge cases (boundary dates)

✅ Test 13: Pagination works correctly
   - Input: page = 2, limit = 10 (20 rents total)
   - Expected: Returns rents 11-20
   - Coverage: Offset/limit calculation

✅ Test 14: Sort by rent_date descending
   - Input: sortBy = "rent_date", order = "DESC"
   - Expected: Rents sorted newest first
   - Coverage: Sorting logic, ascending/descending
```

#### FindRentUseCase (3 tests)
File: `tests/core/cases/rent/FindRentUseCase.test.ts`

```
✅ Test 15: Find rent by ID
   - Input: rentId = "uuid-123"
   - Expected: Returns rent with all fields and associated products
   - Coverage: Include nested data (rent_products, measurements)

✅ Test 16: Return null for non-existent rent
   - Input: rentId = "invalid-uuid"
   - Expected: Returns null (not error)
   - Coverage: Missing data handling

✅ Test 17: Return null for soft-deleted rent
   - Input: rentId of deleted rent
   - Expected: Returns null
   - Coverage: Deleted flag checking
```

#### UpdateRentUseCase (7 tests)
File: `tests/core/cases/rent/UpdateRentUseCase.test.ts`

```
✅ Test 18: Update rent status SCHEDULED → IN_PROGRESS
   - Input: rentId, status = "IN_PROGRESS"
   - Expected: Rent updated, status changed
   - Coverage: State transition validation

✅ Test 19: Update rent status IN_PROGRESS → FINISHED
   - Input: rentId, status = "FINISHED"
   - Expected: Rent marked as finished
   - Coverage: Final state transition

✅ Test 20: Reject invalid status transition
   - Input: Try FINISHED → SCHEDULED (invalid)
   - Expected: Error thrown
   - Coverage: Transition validation logic

✅ Test 21: Update return date
   - Input: returnDate = newDate
   - Expected: Rent returnDate updated
   - Coverage: Date field updates with validation

✅ Test 22: Update actual_return_date
   - Input: actualReturnDate = 2025-03-08
   - Expected: Rent actualReturnDate updated
   - Coverage: Actual return tracking

✅ Test 23: Validate dates after update
   - Input: Update to invalid date range
   - Expected: Error thrown
   - Coverage: Post-update validation

✅ Test 24: Prevent updating deleted rents
   - Input: Try to update soft-deleted rent
   - Expected: Error: "Cannot update deleted rent"
   - Coverage: Deleted flag protection
```

#### DeleteRentUseCase (4 tests)
File: `tests/core/cases/rent/DeleteRentUseCase.test.ts`

```
✅ Test 25: Soft delete rent
   - Input: rentId
   - Expected: Rent.deleted = true, Rent.deleted_at = now()
   - Coverage: Soft delete mechanism

✅ Test 26: Cascade delete rent_products
   - Input: rentId with 3 associated rent_products
   - Expected: All rent_products marked as deleted
   - Coverage: Cascading deletes

✅ Test 27: Error when deleting already-deleted rent
   - Input: rentId of deleted rent
   - Expected: Error thrown
   - Coverage: Idempotency guard

✅ Test 28: Prevent hard deletion
   - Input: Ensure no permanent deletion occurs
   - Expected: Data recoverable from deleted_at timestamp
   - Coverage: Data integrity
```

#### RentReturnUseCase (6 tests)
File: `tests/core/cases/rent/RentReturnUseCase.test.ts`

```
✅ Test 29: Mark rent as returned
   - Input: rentId, actualReturnDate = 2025-03-08
   - Expected: actualReturnDate set, status = FINISHED
   - Coverage: Return process happy path

✅ Test 30: Validate planned vs actual return dates
   - Input: actualReturnDate = 2025-03-12 (after planned 2025-03-10)
   - Expected: Data recorded, late fee calculated
   - Coverage: Late return detection

✅ Test 31: Calculate late fees
   - Input: Planned: 2025-03-10, Actual: 2025-03-12, rate: $5/day
   - Expected: Late fee = $10
   - Coverage: Fee calculation logic

✅ Test 32: Update rent status to FINISHED
   - Input: Mark returned
   - Expected: status = "FINISHED", timestamps updated
   - Coverage: Status transition

✅ Test 33: Prevent returning already-finished rent
   - Input: Try to return rent with status = FINISHED
   - Expected: Error thrown
   - Coverage: State guard

✅ Test 34: Handle same-day return
   - Input: rentDate = 2025-03-01, actualReturnDate = 2025-03-01
   - Expected: No error, 0 days rental calculated
   - Coverage: Edge case: zero-day rental
```

### 1.2 Availability Service Tests (8 tests)

File: `tests/core/domain/services/AvailabilityService.test.ts`

```
✅ Test 35: Product available within date range (no conflicts)
   - Input: productId, rentDate: 2025-03-01, returnDate: 2025-03-05
   - Mock: No overlapping rents
   - Expected: Available = true
   - Coverage: Happy path

✅ Test 36: Product NOT available when rental exists in range
   - Input: productId, same date range
   - Mock: Overlapping rent exists
   - Expected: Available = false, conflicting rent returned
   - Coverage: Overlap detection

✅ Test 37: Buffer days respected for SUIT category
   - Input: Product category SUIT (buffer = 2 days)
   - Mock: Rent ending 2025-03-08
   - Input: New rent starting 2025-03-09 (should fail, needs 2025-03-10)
   - Expected: Available = false
   - Coverage: Category-specific buffer logic

✅ Test 38: Buffer days respected for DRESS category
   - Input: Product category DRESS (buffer = 1 day)
   - Same scenario as Test 37
   - Expected: Available = true (2025-03-09 is OK)
   - Coverage: Different buffer by category

✅ Test 39: Boundary condition - same day return/rent
   - Input: Date 2025-03-01 (return date of one rent, start of another)
   - Expected: Conflict detected (not available)
   - Coverage: Inclusive date range logic

✅ Test 40: Multiple overlapping rentals
   - Input: productId with 3 overlapping rents
   - Expected: Returns all conflicting rents
   - Coverage: Complex overlap scenarios

✅ Test 41: Real return date vs planned return date
   - Input: Rent1 planned return 2025-03-05, actual 2025-03-06
   - Input: New rent request 2025-03-05
   - Expected: Available = false (must use actual return date)
   - Coverage: Actual return date priority

✅ Test 42: Past, present, future date scenarios
   - Input: Past (2025-02-01), Present (today), Future (2025-04-01)
   - Expected: Past dates allowed (historical), future checked
   - Coverage: Date range edge cases
```

### 1.3 Product Domain Use Cases (4 tests - Medium Priority)

#### CreateProductUseCase (1 test - representative)
File: `tests/core/cases/product/CreateProductUseCase.test.ts`

```
✅ Test 43: Create product with valid fields
   - Input: reference, description, category, price
   - Expected: Product created with generated UUID
   - Coverage: Basic creation + Faker for realistic data
```

#### ListProductUseCase (1 test - representative)
File: `tests/core/cases/product/ListProductUseCase.test.ts`

```
✅ Test 44: List products with search by reference
   - Input: search = "SUIT"
   - Mock: 10 products (5 SUIT, 5 DRESS)
   - Expected: Returns only SUIT products (case-insensitive)
   - Coverage: Search logic, soft-delete filtering
```

#### ListProductAvailabilityUseCase (1 test - representative)
File: `tests/core/cases/product/ListProductAvailabilityUseCase.test.ts`

```
✅ Test 45: Show availability for date range with buffer days
   - Input: All products, date range 2025-03-01 to 2025-03-10
   - Expected: For each product: available status + conflicting rents (if any)
   - Coverage: Integration with AvailabilityService
```

#### UpdateProductUseCase (1 test - representative)
File: `tests/core/cases/product/UpdateProductUseCase.test.ts`

```
✅ Test 46: Update product price
   - Input: productId, price = 75
   - Expected: Product price updated
   - Coverage: Field updates + validation
```

---

## Phase 1 File Structure

```
tests/
├── setup.ts                           # Mock Supabase, Prisma, router
├── utils/
│   ├── factories.ts                   # buildProduct, buildRent, etc.
│   └── test-helpers.ts                # Faker helpers, custom matchers
├── core/
│   ├── cases/
│   │       ├── rent/
│   │       │   ├── create-rent/
│   │       │   │    ├── index.test.ts
│   │       │   │    ├── withValidData.test.ts
│   │       │   │    └── withPercentageDiscount.test.ts
│   │       │   │    └── ...
│   │       │   ├── list-rent/
│   │       │   │    ├── index.test.ts
│   │       │   │    ├── withActiveStatus.test.ts
│   │       │   │    ├── byClientNameFilter.test.ts
│   │       │   │    ├── ...
│   │       │   ├── find-rent/
│   │       │   │    ├── index.test.ts
│   │       │   │    ├── byId.test.ts
│   │       │   │    ├── non-existent.test.ts
│   │       │   │    ├── ...
│   │       │   ├── ...
│   │       └── product/
│   │               ├── create-product/
│   │               │    ├── index.test.ts
│   │               │    ├── withValidData.test.ts
│   │               │    ├── ...
│   │               ├── list-product/
│   │               │    ├── index.test.ts
│   │               │    ├── byReference.test.ts
│   │               │    ├── ...
│   │               ├── ...
│   └── services/
│           └── availability/
│                 ├── index.test.ts
│                 ├── forDateRange.test.ts

```

---

## Mock Strategy

### Supabase Client
```typescript
const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn().mockReturnValue({
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }),
};
```

### Prisma SQLite
```typescript
const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: "file:./test.db?mode=memory",  // In-memory SQLite
    },
  },
});
```

### Next.js Router
```typescript
const mockRouter = {
  push: jest.fn(),
  pathname: "/",
  query: {},
};
jest.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));
```

---

## Test Data Generation (Faker Examples)

```typescript
import { faker } from "@faker-js/faker";

const buildProduct = (overrides = {}) => ({
  id: faker.string.uuid(),
  reference: faker.lorem.word().toUpperCase(),
  description: faker.lorem.sentence(),
  category: faker.helpers.arrayElement(["SUIT", "DRESS"]),
  price: faker.number.int({ min: 20, max: 200 }),
  ...overrides,
});

const buildRent = (overrides = {}) => ({
  id: faker.string.uuid(),
  client_name: faker.person.fullName(),
  client_phone: faker.phone.number(),
  client_email: faker.internet.email(),
  rent_date: faker.date.future(),
  return_date: faker.date.future({ days: 10 }),
  status: "SCHEDULED",
  ...overrides,
});
```

---

## Verification Checklist for Phase 1 Completion

- [ ] All 46 tests pass: `npm test`
- [ ] Coverage report shows 80%+ statements: `npm run test:coverage`
- [ ] No console warnings or deprecated API usage
- [ ] Mocking is complete (no actual API/DB calls)
- [ ] All async operations use proper await/done callbacks
- [ ] Test database is cleaned between tests (transaction rollback)
- [ ] Faker seed set for reproducible tests (`faker.seed(12345)`)
- [ ] Integration with CI/CD ready (no file system dependencies)

---

## Phase 2 (After Phase 1) - Component Tests

**25 test cases** for UI components:
- ProductSelector (6)
- AddProductModal (8)
- AddRentInfoStep (7)
- ProductMeasures (4)

---

## Phase 3 (After Phase 2) - API Route Integration Tests

**6-8 test cases** for API endpoints:
- POST /api/rents
- GET /api/rents
- PATCH /api/rents/:id
- DELETE /api/rents/:id
- POST /api/products
- GET /api/products
- GET /api/availability

---

## Phase 4 (After Phase 3) - Database & Migration Tests

**Schema validation, constraints, indexes, seeding tests**

---

## Notes & Conventions

- Use **descriptive test names**: `it("should create rent with PERCENTAGE discount and calculate correct price")`
- Keep **single assertion per test** where possible (separate concerns)
- Use **`buildX()` factories** instead of inline object creation
- Use **`faker`** for all randomized data (client names, dates, etc.)
- Mock **all external calls** (Supabase, axios, etc.)
- **No hardcoded dates** - use `faker.date.future()` or date helpers
- Test **both happy path and error cases**
- Use **meaningful error messages**: `expect(error).toContain("Product not available")`
- **NEVER** use any or unknown types

---

## Timeline & Ownership

| Phase | Start | End | Status |
|-------|-------|-----|--------|
| Phase 0 | Now | Day 1 | 📅 Setup |
| Phase 1 | Day 1 | Day 5-7 | 🎯 **IN PROGRESS** |
| Phase 2 | Day 8 | Day 10 | ⏳ Pending |
| Phase 3 | Day 11 | Day 12 | ⏳ Pending |
| Phase 4 | Day 13 | Day 14 | ⏳ Pending |

---

## References

- Jest Docs: https://jestjs.io/
- React Testing Library: https://testing-library.com/react
- Faker.js: https://fakerjs.dev/
- Prisma Testing: https://www.prisma.io/docs/orm/testing

---

**Document Created**: March 23, 2026  
**Last Reviewed**: March 23, 2026  
**Next Review**: After Phase 1 completion
