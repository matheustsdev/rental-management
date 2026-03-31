# Atomic Design Structure

## 1. Atoms (`src/components/atoms/`)
- Basic building blocks (Buttons, Inputs, Selects, Tags).
- Usually stateless or with very minimal internal state.
- Examples: `PrimaryButton`, `SearchBar`, `Tag`.

## 2. Molecules (`src/components/molecules/`)
- Combinations of atoms working together.
- May contain state or simple logic.
- Examples: `ProductCard`, `DataTable`, `BaseFormModal`.

## 3. Organisms (`src/components/organisms/`)
- Complex, feature-rich sections (Forms, Modals, Navigation).
- Often handle complex state, validation (Zod), and API calls.
- Examples: `AddRentModal`, `RentReturnModal`, `Navbar`.

## 4. Pages (`src/app/`)
- Next.js 15 App Router pages.
- Handle data fetching (via `api` service), pagination, and search orchestration.
- Use `PageContainer` to maintain consistent layout.
