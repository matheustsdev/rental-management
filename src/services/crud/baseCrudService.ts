import { RequestFilterType } from "@/types/RequestFilterType";
import { supabase } from "@/services/supabase";
import { Database } from "@/types/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

type TableRowType<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

// Tipos para configuração de include
export type IncludeConfigType = {
  [key: string]: {
    table: keyof Database["public"]["Tables"];
    foreignKey: string;
    fields?: string[];
  };
};

type SupabaseQuery = ReturnType<SupabaseClient<Database>["from"]>["select"];

export class CrudService<K extends keyof Database["public"]["Tables"]> {
  private tableName: K;

  constructor(tableName: K) {
    this.tableName = tableName;
  }

  async create(data: Omit<TableRowType<K>, "id">) {
    const { data: result, error } = await supabase.from(this.tableName).insert(data).select("*").single();

    if (error) throw error;
    return result as TableRowType<K>;
  }

  // Método para construir query com includes
  private buildIncludeQuery(query: SupabaseQuery, includeConfig?: IncludeConfigType) {
    if (!includeConfig) return query;

    // Construir string de seleção para includes
    const includeSelects = Object.values(includeConfig).map((config) => {
      // Campos a serem selecionados (todos se não especificados)
      const fields = config.fields ? config.fields.map((field) => `${field}`).join(", ") : "*";

      return `${config.table} (${fields})`;
    });

    // Combinar seleção original com includes
    const selectString = ["*", ...includeSelects].join(",");

    // Atualizar query com nova seleção
    query = query.select(selectString, {
      count: "exact",
      head: false,
    });

    return query;
  }

  // Método find atualizado com suporte a includes
  async find(
    filters?: RequestFilterType<TableRowType<K>>,
    options?: {
      page?: number;
      pageSize?: number;
      orderBy?: keyof TableRowType<K>;
      ascending?: boolean;
      include?: IncludeConfigType;
    }
  ) {
    // Configurações de paginação
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    // Construção da query inicial
    let query = supabase.from(this.tableName).select("*");

    // Aplicar includes se existirem
    if (options?.include) {
      query = this.buildIncludeQuery(query, options.include);
    }

    // Aplicar filtros (igual à implementação anterior)
    if (filters) {
      Object.entries(filters).forEach(([key, filter]) => {
        if (filter) {
          switch (filter.operator) {
            case "eq":
              query = query.eq(key, filter.value);
              break;
            case "neq":
              query = query.neq(key, filter.value);
              break;
            case "gt":
              query = query.gt(key, filter.value);
              break;
            case "lt":
              query = query.lt(key, filter.value);
              break;
            case "gte":
              query = query.gte(key, filter.value);
              break;
            case "lte":
              query = query.lte(key, filter.value);
              break;
            case "like":
              query = query.like(key, `%${filter.value}%`);
              break;
            case "ilike":
              query = query.ilike(key, `%${filter.value}%`);
              break;
            case "in":
              query = query.in(key, filter.value);
              break;
          }
        }
      });
    }

    // Ordenação
    if (options?.orderBy) {
      query = query.order(options.orderBy as string, {
        ascending: options.ascending ?? true,
      });
    }

    // Aplicar paginação
    query = query.range(start, end);

    // Executar query
    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as TableRowType<K>[],
      page,
      pageSize,
      total: count ?? 0,
    };
  }

  // Exemplo de uso de método findById com include
  async findById(id: string, include?: IncludeConfigType) {
    let query = supabase.from(this.tableName).select("*").eq("id", id).single();

    // Aplicar includes se existirem
    if (include) {
      query = this.buildIncludeQuery(query, include);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as TableRowType<K>;
  }

  // Atualizar registro
  async update(id: string, data: Partial<Omit<TableRowType<K>, "id">>) {
    const { data: result, error } = await supabase.from(this.tableName).update(data).eq("id", id).select().single();

    if (error) throw error;
    return result as TableRowType<K>;
  }

  // Soft Delete
  async softDelete(id: string) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        deleted: true,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as TableRowType<K>;
  }

  // Hard Delete (use com cautela)
  async hardDelete(id: string) {
    const { error } = await supabase.from(this.tableName).delete().eq("id", id);

    if (error) throw error;
    return true;
  }
}
