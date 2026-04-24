import { AvailabilityService } from "@/core/domain/services/AvailabilityService";
import { RentEntity } from "@/core/domain/entities/RentEntity";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { ERentStatus, measures_type } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

describe("AvailabilityService", () => {
  const productId = "prod-1";

  const createMockRent = (rentDate: Date, returnDate: Date, realReturnDate: Date | null = null) => {
    return new RentEntity({
      id: "rent-1",
      code: new Decimal(1),
      status: ERentStatus.SCHEDULED,
      rent_date: rentDate,
      return_date: returnDate,
      client_name: "Test",
      address: null,
      phone: null,
      discount_type: null,
      discount_value: new Decimal(0),
      signal_value: new Decimal(0),
      total_value: new Decimal(100),
      remaining_value: new Decimal(100),
      rent_products: [
        {
          id: "rp-1",
          rent_id: "rent-1",
          product_id: productId,
          product_price: new Decimal(100),
          product_description: "Test",
          measure_type: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
          real_return_date: realReturnDate,
          real_return_buffer_days: null,
          deleted: false,
          deleted_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      real_return_date: realReturnDate,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
      deleted_at: null,
    } as any);
  };

  it("should return true when product is available (no conflicts)", () => {
    const rentDate = new Date("2025-03-01");
    const returnDate = new Date("2025-03-05");
    const existingRentals: RentEntity[] = [];

    const result = AvailabilityService.isAvailable(rentDate, returnDate, existingRentals, 2);

    expect(result).toBe(true);
  });

  it("should return false when rental exists in range", () => {
    const rentDate = new Date("2025-03-01");
    const returnDate = new Date("2025-03-05");
    const existingRental = createMockRent(
      new Date("2025-03-02"),
      new Date("2025-03-04")
    );

    const result = AvailabilityService.isAvailable(rentDate, returnDate, [existingRental], 1);

    expect(result).toBe(false);
  });

  it("should respect buffer days (2 days)", () => {
    // Existing rent ends on March 8th. With 2 days buffer, it's busy until March 10th.
    const existingRental = createMockRent(
      new Date("2025-03-05"),
      new Date("2025-03-08")
    );

    // New rent starts on March 9th -> should be busy
    const newRentStart = new Date("2025-03-09");
    const newRentEnd = new Date("2025-03-12");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 2);

    expect(result).toBe(false);
  });

  it("should respect buffer days (1 day)", () => {
    // Existing rent ends on March 8th. With 1 day buffer, it's busy until March 9th.
    const existingRental = createMockRent(
      new Date("2025-03-05"),
      new Date("2025-03-08")
    );

    // New rent starts on March 10th -> should be available
    const newRentStart = new Date("2025-03-10");
    const newRentEnd = new Date("2025-03-12");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 1);

    expect(result).toBe(true);
  });

  it("should detect conflict for same day return/rent (boundary condition)", () => {
    // Rent 1 ends March 5th.
    const existingRental = createMockRent(
      new Date("2025-03-01"),
      new Date("2025-03-05")
    );

    // Rent 2 starts March 5th. Even with 0 buffer, it should conflict because of inclusive range.
    const newRentStart = new Date("2025-03-05");
    const newRentEnd = new Date("2025-03-10");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 0);

    expect(result).toBe(false);
  });

  it("should return false if any of multiple rentals overlaps", () => {
    const rentals = [
      createMockRent(new Date("2025-01-01"), new Date("2025-01-05")),
      createMockRent(new Date("2025-03-01"), new Date("2025-03-05")),
      createMockRent(new Date("2025-05-01"), new Date("2025-05-05")),
    ];

    const result = AvailabilityService.isAvailable(new Date("2025-03-04"), new Date("2025-03-10"), rentals, 1);

    expect(result).toBe(false);
  });

  it("should prioritize real return date over planned return date", () => {
    // Planned return: March 5th. Actual return: March 6th.
    const existingRental = createMockRent(
      new Date("2025-03-01"),
      new Date("2025-03-05"),
      new Date("2025-03-06") // realReturnDate
    );

    // New rent request starts March 6th. With 0 buffer, it should still conflict because of realReturnDate.
    const result = AvailabilityService.isAvailable(new Date("2025-03-06"), new Date("2025-03-10"), [existingRental], 0);

    expect(result).toBe(false);
  });
});
