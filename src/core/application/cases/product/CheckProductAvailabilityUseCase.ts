import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { CheckAvailabilityResponseDTO } from "../../dtos/CheckAvailabilityResponseDTO";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { addDays, areIntervalsOverlapping } from "date-fns";

export class CheckProductAvailabilityUseCase {
  constructor(private rentalRepository: IRentalRepository) {}

  async execute(
    productId: string,
    startDate: Date,
    endDate: Date
  ): Promise<CheckAvailabilityResponseDTO> {
    const overlappingRents = await this.rentalRepository.findOverlappingRents(
      productId,
      startDate,
      endDate
    );

    for (const rent of overlappingRents) {
      // Find the specific product entry in this rent
      const rentProduct = rent.rent_products.find(
        (rp) => rp.product_id === productId && !rp.deleted
      );

      if (!rentProduct) continue;

      // Determine buffer days: from rent_product if finished, otherwise from category
      const bufferDays =
        rentProduct.real_return_buffer_days ??
        rentProduct.products?.categories?.post_return_buffer_days ??
        0;

      // Determine base return date (real if finished, otherwise scheduled)
      const baseReturnDate = rent.real_return_date ?? rent.return_date;
      const effectiveEndDateWithBuffer = addDays(baseReturnDate, bufferDays);

      // Check for direct overlap with the rental period (excludes buffer)
      const hasDirectOverlap = areIntervalsOverlapping(
        { start: rent.rent_date, end: baseReturnDate },
        { start: startDate, end: endDate },
        { inclusive: true }
      );

      if (hasDirectOverlap) {
        return {
          status: EAvailabilityStatus.UNAVAILABLE,
          conflictingRent: rent,
          message: "Este produto já está alugado para este período.",
        };
      }

      // Check for overlap with the buffer period
      const bufferStartDate = addDays(baseReturnDate, 1);
      const hasBufferOverlap = areIntervalsOverlapping(
        { start: bufferStartDate, end: effectiveEndDateWithBuffer },
        { start: startDate, end: endDate },
        { inclusive: true }
      );

      if (hasBufferOverlap) {
        return {
          status: EAvailabilityStatus.BUFFER_OCCUPIED,
          conflictingRent: rent,
          message: "Este produto estará em período de higienização/preparo.",
        };
      }
    }

    return {
      status: EAvailabilityStatus.AVAILABLE,
      message: "Produto disponível para o período solicitado.",
    };
  }
}
