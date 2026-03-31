import { Rental } from "../entities/Rental";

export class AvailabilityService {
  static isAvailable(
    newStart: Date,
    newEnd: Date,
    existingRentals: Rental[],
    cleaningDays: number = 2
  ): boolean {
     const hasConflict = existingRentals.some(rental => 
        rental.conflictsWith(newStart, newEnd, cleaningDays)
     );

    return !hasConflict;
  }
}
