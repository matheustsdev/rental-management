import { ProductType } from "./entities/ProductType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus"

export type ProductAvailabilityType = {
  availability: keyof typeof EAvailabilityStatus,
  current_rent_id: string | null,
  current_rent_return_date: Date | null,
  actual_return_date: Date | null,
  buffer_end_date: Date | null
  product: ProductType
};
