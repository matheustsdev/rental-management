import { RequestFilterType } from "@/types/RequestFilterType";
import { supabase } from "@/services/supabase";
import { Database } from "@/types/supabase.types";

// Tipo genérico para extrair o tipo de uma tabela
type TableRowType<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

export class CrudService<K extends keyof Database["public"]["Tables"]> {
  private tableName: K;

  constructor(tableName: K) {
    this.tableName = tableName;
  }

  // Tipagem correta para criação
  async create(data: Omit<TableRowType<K>, "id">) {
    const { data: result, error } = await supabase.from(this.tableName).insert(data).select().single();

    if (error) throw error;
    return result as TableRowType<K>;
  }

  // Busca genérica com filtros
  async find(
    filters?: RequestFilterType<TableRowType<K>>,
    options?: {
      page?: number;
      pageSize?: number;
      orderBy?: keyof TableRowType<K>;
      ascending?: boolean;
    }
  ) {
    // Configurações de paginação
    const page = options?.page || 1;
    const pageSize = options?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    // Construção da query
    let query = supabase.from(this.tableName).select("*");

    // Aplicar filtros
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
      total: count || 0,
    };
  }

  // Buscar por ID
  async findById(id: string) {
    const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single();

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
