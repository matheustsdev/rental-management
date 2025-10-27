import { createSupabaseEnum } from "@/utils/createSupabaseEnum";

export const EAvailabilityStatus = createSupabaseEnum("availability_status");

export type EAvailabilityStatusType = keyof typeof EAvailabilityStatus
