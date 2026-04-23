import { CheckProductAvailabilityUseCase } from "@/core/application/cases/product/CheckProductAvailabilityUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { subDays } from "date-fns";
import { getRandomRentalEntity } from "../../../utils/factories";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { measures_type } from "@prisma/client";

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
    const mockRent = getRandomRentalEntity({
      id: "rent-1",
      rentDate: new Date("2026-05-02"),
      returnDate: new Date("2026-05-10"),
      items: [
        new RentProduct({
          id: "rp-1",
          productId: productId,
          productDescription: "Test",
          productPrice: 100,
          measureType: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
          realReturnBufferDays: 0
        })
      ]
    });

    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.UNAVAILABLE);
    expect(result.conflictingRent?.id).toBe("rent-1");
  });

  it("should return BUFFER_OCCUPIED when the request falls within the cleaning period of a previous rent", async () => {
    const mockRent = getRandomRentalEntity({
      id: "rent-2",
      rentDate: subDays(startDate, 10),
      returnDate: subDays(startDate, 1), // Finished yesterday
      items: [
        new RentProduct({
          id: "rp-2",
          productId: productId,
          productDescription: "Test",
          productPrice: 100,
          measureType: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
          realReturnBufferDays: 3 // Still in buffer for 2 more days
        })
      ]
    });

    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.BUFFER_OCCUPIED);
    expect(result.conflictingRent?.id).toBe("rent-2");
  });

  it("should favor the first conflict (closest to start date) among multiple results", async () => {
    const mockRent1 = getRandomRentalEntity({
      id: "rent-3",
      rentDate: new Date("2026-05-01"),
      returnDate: new Date("2026-05-02"),
      items: [
        new RentProduct({
          id: "rp-3",
          productId: productId,
          productDescription: "Test",
          productPrice: 100,
          measureType: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
        })
      ]
    });
    const mockRent2 = getRandomRentalEntity({
      id: "rent-4",
      rentDate: new Date("2026-05-02"),
      returnDate: new Date("2026-05-03"),
      items: [
        new RentProduct({
          id: "rp-4",
          productId: productId,
          productDescription: "Test",
          productPrice: 100,
          measureType: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
        })
      ]
    });

    // The repo is already expected to return chronologically ordered list
    rentalRepo.findOverlappingRents.mockResolvedValue([mockRent1, mockRent2]);

    const result = await useCase.execute(productId, startDate, endDate);

    expect(result.status).toBe(EAvailabilityStatus.UNAVAILABLE);
    expect(result.conflictingRent?.id).toBe("rent-3");
  });
});
