import { Database, Tables, TablesInsert, TablesUpdate } from "@/types/supabase.types";

export type TableRow<T extends keyof Database["public"]["Tables"]> = Tables<T>;

// Ajuste para garantir que `referencedRelation` sempre seja um nome de tabela válido
type InjectRelations<T extends keyof Database["public"]["Tables"]> = {
  [K in Database["public"]["Tables"][T]["Relationships"][number] as K extends {
    referencedRelation: keyof Database["public"]["Tables"];
  }
    ? K["referencedRelation"]
    : never]?: TableRow<
    K extends { referencedRelation: keyof Database["public"]["Tables"] } ? K["referencedRelation"] : never
  > | null;
};

// Tipo final que inclui a entidade base e suas relações opcionais
export type EntityType<T extends keyof Database["public"]["Tables"]> = TableRow<T> & InjectRelations<T>;
export type EntityInsertDtoType<T extends keyof Database["public"]["Tables"]> = TablesInsert<T>;
export type EntityUpdateDtoType<T extends keyof Database["public"]["Tables"]> = TablesUpdate<T>;
