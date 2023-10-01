import { Request, Response, Express } from 'express';
import { IBaseResponse } from './baseResponse.interface';
import { IBaseService } from './baseService.interface';

export interface IServiceObject {
    [key: string]: IBaseService<any> | null;
}

export interface IBaseController<T> {
    services: IServiceObject;
    app: Express;

    setServices(services: IServiceObject): void;
    create(req: Request, res: Response): IBaseResponse<T>;
    readAll(req: Request, res: Response): IBaseResponse<T[]>;
    readById(req: Request, res: Response): IBaseResponse<T>;
    update(req: Request, res: Response): IBaseResponse<T>;
    delete(req: Request, res: Response): IBaseResponse<null>;
    execute(): void;
}