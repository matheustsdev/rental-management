import { Decimal, DecimalJsLike } from "@prisma/client/runtime/library";
import { z } from "zod";

export const decimalSchema = z.union([
  z.instanceof(Decimal),
  z.custom<DecimalJsLike>(),
  z.string(),
  z.number(),
]);