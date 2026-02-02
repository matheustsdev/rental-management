import { Rental } from "../entities/Rental";
import { areIntervalsOverlapping, addDays } from 'date-fns';

export class AvailabilityService {
  static isAvailable(
    newStart: Date,
    newEnd: Date,
    existingRentals: Rental[],
    cleaningDays: number = 2
  ): boolean {
     const hasConflict = existingRentals.some(rental => {
      const rentalEndWithCleaning = addDays(rental.endDate, cleaningDays);
      
      return areIntervalsOverlapping(
        { start: newStart, end: newEnd },
        { start: rental.startDate, end: rentalEndWithCleaning }
      );
    });

    return !hasConflict;
  }
}
