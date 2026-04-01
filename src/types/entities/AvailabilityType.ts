import { EAvailabilityStatusType } from "@/constants/EAvailabilityStatus";
import { RentType } from "./RentType";

export type AvailabilityType = {
  status: EAvailabilityStatusType;
  conflictingRent?: RentType | null;
  message?: string;
};
