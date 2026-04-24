import { RentEntity } from "../entities/RentEntity";

export class AvailabilityService {
  static isAvailable(
    newStart: Date,
    newEnd: Date,
    existingRentals: RentEntity[],
    cleaningDays: number = 2
  ): boolean {
     const hasConflict = existingRentals.some(rental => 
        rental.conflictsWith(newStart, newEnd, cleaningDays)
     );

    return !hasConflict;
  }
}
