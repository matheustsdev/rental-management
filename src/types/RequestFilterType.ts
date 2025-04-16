// types/filters.ts
export type FilterOperator =
  | "eq" // igual
  | "neq" // não igual
  | "gt" // maior que
  | "lt" // menor que
  | "gte" // maior ou igual
  | "lte" // menor ou igual
  | "like" // similar
  | "ilike" // similar (case-insensitive)
  | "in"; // dentro de uma lista

export type RequestFilterType<T> = {
  [K in keyof T]?: {
    operator: FilterOperator;
    value: any;
  };
};
