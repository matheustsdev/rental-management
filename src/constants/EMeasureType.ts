import { createSupabaseEnum } from "@/utils/createSupabaseEnum";

export const EMeasureType = createSupabaseEnum("measures_type");
export type MeasureType = (typeof EMeasureType)[keyof typeof EMeasureType];
