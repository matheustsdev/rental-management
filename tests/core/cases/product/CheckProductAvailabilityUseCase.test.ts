import { CheckProductAvailabilityUseCase } from "@/core/application/cases/product/CheckProductAvailabilityUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { addDays, subDays } from "date-fns";
import { RentType } from "@/types/entities/RentType";

describe("Check product availability use case", () => {
  let useCase: CheckProductAvailabilityUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;
  const productId = "product-123";
  const startDate = new Date("2026-05-01");
  const endDate = new Date("2026-05-05");

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    useCase = new CheckProductAvailabilityUseCase(rentalRepo);
  });

  it("should return AVAILABLE when no overlapping rents exist", async () => {
    rentalRepo.findOverlappingRents.mockResolvedValue([]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.AVAILABLE);
    expect(result.conflictingRent).toBeUndefined();
  });

  it("should return UNAVAILABLE when a standard rent overlaps directly", async () => {
    const mockRent: Partial<RentType> = {
      id: "rent-1",
      rent_date: new Date("2026-05-02"),
      return_date: new Date("2026-05-10"),
      rent_products: [
        {
          product_id: productId,
          deleted: false,
          products: {
            categories: { post_return_buffer_days: 0 }
          }
        }
      ] as any
    };

    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent as RentType]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.UNAVAILABLE);
    expect(result.conflictingRent?.id).toBe("rent-1");
  });

  it("should return BUFFER_OCCUPIED when the request falls within the cleaning period of a previous rent", async () => {
    const mockRent: Partial<RentType> = {
      id: "rent-2",
      rent_date: subDays(startDate, 10),
      return_date: subDays(startDate, 1), // Finished yesterday
      rent_products: [
        {
          product_id: productId,
          deleted: false,
          products: {
            categories: { post_return_buffer_days: 3 } // Still in buffer for 2 more days
          }
        }
      ] as any
    };

    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent as RentType]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.BUFFER_OCCUPIED);
    expect(result.conflictingRent?.id).toBe("rent-2");
  });

  it("should favor the first conflict (closest to start date) among multiple results", async () => {
    const mockRent1: Partial<RentType> = {
      id: "rent-3",
      rent_date: new Date("2026-05-01"),
      return_date: new Date("2026-05-02"),
      rent_products: [{ product_id: productId } as any]
    };
    const mockRent2: Partial<RentType> = {
      id: "rent-4",
      rent_date: new Date("2026-05-02"),
      return_date: new Date("2026-05-03"),
      rent_products: [{ product_id: productId } as any]
    };

    // The repo is already expected to return chronologically ordered list
    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent1 as RentType, mockRent2 as RentType]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.UNAVAILABLE);
    expect(result.conflictingRent?.id).toBe("rent-3");
  });
});
