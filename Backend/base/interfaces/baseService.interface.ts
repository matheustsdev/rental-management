export interface IBaseService<T> {
    create(data: T): Promise<T[]>;
    readAll(): Promise<T[]>;
    readById(id: string): Promise<T | null>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<null>;
}