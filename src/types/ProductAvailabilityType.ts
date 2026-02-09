import { ProductType } from "./entities/ProductType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus"

export type ProductAvailabilityType = ProductType & {
  availability: keyof typeof EAvailabilityStatus
};
