import { Request, Response } from 'express';
import { IBaseResponse } from './baseResponse.interface';

export interface IBaseController<T> {
    create(req: Request, res: Response): IBaseResponse<T>;
    readAll(req: Request, res: Response): IBaseResponse<T[]>;
    readById(req: Request, res: Response): IBaseResponse<T>;
    update(req: Request, res: Response): IBaseResponse<T>;
    delete(req: Request, res: Response): IBaseResponse<null>;
}