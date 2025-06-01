import { TableRow } from "./EntityType";

export type SuitsMeasuresType = Omit<TableRow<"product_measures">, "bust | hip | shoudler">;