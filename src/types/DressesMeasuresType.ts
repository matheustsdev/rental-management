import { TableRow } from "./EntityType";

export type DressesMeasuresType = Omit<TableRow<"product_measures">, "sleeve | height | back">;