import { AvailabilityService } from "@/core/domain/services/AvailabilityService";
import { Rental } from "@/core/domain/entities/Rental";

describe("AvailabilityService", () => {
  const productId = "prod-1";

  it("should return true when product is available (no conflicts)", () => {
    const rentDate = new Date("2025-03-01");
    const returnDate = new Date("2025-03-05");
    const existingRentals: Rental[] = [];

    const result = AvailabilityService.isAvailable(rentDate, returnDate, existingRentals, 2);

    expect(result).toBe(true);
  });

  it("should return false when rental exists in range", () => {
    const rentDate = new Date("2025-03-01");
    const returnDate = new Date("2025-03-05");
    const existingRental = new Rental(
      "rent-1",
      productId,
      new Date("2025-03-02"),
      new Date("2025-03-04"),
      'ACTIVE'
    );

    const result = AvailabilityService.isAvailable(rentDate, returnDate, [existingRental], 1);

    expect(result).toBe(false);
  });

  it("should respect buffer days for SUIT category (2 days)", () => {
    // Existing rent ends on March 8th. With 2 days buffer, it's busy until March 10th.
    const existingRental = new Rental(
      "rent-1",
      productId,
      new Date("2025-03-05"),
      new Date("2025-03-08"),
      'ACTIVE'
    );

    // New rent starts on March 9th -> should be busy
    const newRentStart = new Date("2025-03-09");
    const newRentEnd = new Date("2025-03-12");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 2);

    expect(result).toBe(false);
  });

  it("should respect buffer days for DRESS category (1 day)", () => {
    // Existing rent ends on March 8th. With 1 day buffer, it's busy until March 9th.
    const existingRental = new Rental(
      "rent-1",
      productId,
      new Date("2025-03-05"),
      new Date("2025-03-08"),
      'ACTIVE'
    );

    // New rent starts on March 10th -> should be available
    const newRentStart = new Date("2025-03-10");
    const newRentEnd = new Date("2025-03-12");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 1);

    expect(result).toBe(true);
  });

  it("should detect conflict for same day return/rent (boundary condition)", () => {
    // Rent 1 ends March 5th.
    const existingRental = new Rental(
      "rent-1",
      productId,
      new Date("2025-03-01"),
      new Date("2025-03-05"),
      'ACTIVE'
    );

    // Rent 2 starts March 5th. Even with 0 buffer, it should conflict because of inclusive range.
    const newRentStart = new Date("2025-03-05");
    const newRentEnd = new Date("2025-03-10");

    const result = AvailabilityService.isAvailable(newRentStart, newRentEnd, [existingRental], 0);

    expect(result).toBe(false);
  });

  it("should return false if any of multiple rentals overlaps", () => {
    const rentals = [
      new Rental("r1", productId, new Date("2025-01-01"), new Date("2025-01-05"), 'ACTIVE'),
      new Rental("r2", productId, new Date("2025-03-01"), new Date("2025-03-05"), 'ACTIVE'),
      new Rental("r3", productId, new Date("2025-05-01"), new Date("2025-05-05"), 'ACTIVE'),
    ];

    const result = AvailabilityService.isAvailable(new Date("2025-03-04"), new Date("2025-03-10"), rentals, 1);

    expect(result).toBe(false);
  });

  it("should prioritize real return date over planned return date", () => {
    // Planned return: March 5th. Actual return: March 6th.
    const existingRental = new Rental(
      "rent-1",
      productId,
      new Date("2025-03-01"),
      new Date("2025-03-05"),
      'ACTIVE',
      new Date("2025-03-06") // realReturnDate
    );

    // New rent request starts March 6th. With 0 buffer, it should still conflict because of realReturnDate.
    const result = AvailabilityService.isAvailable(new Date("2025-03-06"), new Date("2025-03-10"), [existingRental], 0);

    expect(result).toBe(false);
  });

  it("should handle historical (past) date scenarios", () => {
      // It's technically possible to record historical rents.
      const pastRent = new Rental("p1", productId, new Date("2025-01-01"), new Date("2025-01-05"), 'ACTIVE');
      
      const result = AvailabilityService.isAvailable(new Date("2025-01-03"), new Date("2025-01-10"), [pastRent], 1);
      expect(result).toBe(false);
  });
});
