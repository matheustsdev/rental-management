import { Rent } from "../entities/Rent";

export class AvailabilityService {
  static isAvailable(
    newStart: Date,
    newEnd: Date,
    existingRentals: Rent[],
    cleaningDays: number = 2
  ): boolean {
     const hasConflict = existingRentals.some(rental => 
        rental.conflictsWith(newStart, newEnd, cleaningDays)
     );

    return !hasConflict;
  }
}
