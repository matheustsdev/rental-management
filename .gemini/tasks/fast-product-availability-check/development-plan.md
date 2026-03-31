# Development Plan

   1. Domain Layer (src/core/domain/services/AvailabilityService.ts):
       * Modify AvailabilityService.isAvailable to accept either a single checkDate: Date OR startDate: Date, endDate: Date.
       * If only checkDate is provided, infer startDate and endDate to be that same checkDate for a one-day check.
       * Adjust the logic within AvailabilityService.isAvailable and Rental.conflictsWith to correctly handle both single-day checks and date range checks.

   2. Application Layer (src/core/application/cases/product/GetProductAvailabilityUseCase.ts):
       * Update GetProductAvailabilityUseCase to accept parameters allowing specification of either a single checkDate: Date or a startDate: Date, endDate:
         Date.
       * Ensure the use case correctly passes these parameters to AvailabilityService.

   3. Infrastructure Layer (src/core/infrastructure/database/PrismaProductRepository.ts or similar):
       * No significant changes expected here, as repository methods should inherently support date range queries which can also handle single dates.

   4. Presentation Layer (src/components/molecules/ProductCard.tsx, src/components/pages/ProductsPage.tsx, etc.):
       * Update UI components to allow users to input either a single date or a start/end date range for availability checks.
       * Implement conditional rendering to clearly display availability status: Available, Unavailable (showing conflicting RentCard), or In buffer (showing
         buffer period and preceding RentCard).