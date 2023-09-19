import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IBaseController } from "../interfaces/baseController.interface";
import { IBaseResponse } from "../interfaces/baseResponse.interface";

export class BaseController<T> implements IBaseController<T> {
    create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T> {
        throw new Error("Method not implemented.");
    }
    readAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T[]> {
        throw new Error("Method not implemented.");
    }
    readById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T> {
        throw new Error("Method not implemented.");
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<null> {
        throw new Error("Method not implemented.");
    }

}