export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    readAll(): Promise<T[]>;
    readById(id: string): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<null>;
}