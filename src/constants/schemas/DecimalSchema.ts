import { z } from "zod";
import type { DecimalJsLike } from "@prisma/client/runtime/library.js";

export const decimalSchema = z.union([
  z.custom<DecimalJsLike>(),
  z.string(),
  z.number(),
]);