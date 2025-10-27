import { NullableType } from "@/types/NullableType";


export class DefaultResponse<T> {
    constructor(data: NullableType<T>, message: string, page: NullableType<number>, pageSize: NullableType<number>, total: NullableType<number> ) {
        this.data = data ?? null;
        this.message = message;
        this.page = page ?? 1;
        this.pageSize = pageSize ?? 0;
        this.total = total ?? 0;
    }

    public data: T | null
    public message: string;
    public page: number
    public pageSize: number
    public total: number
}