import { IBaseService } from "../interfaces/baseService.interface";

export class BaseService<T> implements IBaseService<T> {
    constructor() {}

    create(data: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    readAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    readById(id: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
}