import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { EHTTPMethods, Logger } from "../../../Shared/class/logger"
import { IBaseController, IServiceObject } from "../interfaces/baseController.interface";
import { IBaseResponse } from "../interfaces/baseResponse.interface";

export class BaseController<T> implements IBaseController<T> {
    dependenciesName: string[] = [];
    services: IServiceObject = {};
    app: Express;

    constructor() {}

    setDependenciesName(dependenciesName: string[]): void {
        this.dependenciesName = dependenciesName;
    }

    setServices(services: IServiceObject): void {
        this.services = services;
    }

    create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T> {
        throw new Error("Method not implemented.");
    }
    readAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): IBaseResponse<T[]> {
        console.log("ReadAll")

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

    execute() {
        const routeName = this.constructor.name.split('Controller')[0].toLowerCase();

        console.group("\x1b[32mRoute: " + "/" + routeName + "\n" + "--".repeat(10) + "\x1b[0m");

        Logger.route(EHTTPMethods.POST, "/")
        this.app.post(`/${routeName}`, this.create);

        Logger.route(EHTTPMethods.GET, "/")
        this.app.get(`/${routeName}`, this.readAll);

        Logger.route(EHTTPMethods.GET, "/:id")
        this.app.get(`/${routeName}/:id`, this.readById);

        Logger.route(EHTTPMethods.PATCH,  "/:id")
        this.app.patch(`/${routeName}/:id`, this.update);

        Logger.route(EHTTPMethods.DELETE,  "/:id")
        this.app.delete(`/${routeName}/:id`, this.delete);

        console.groupEnd() 
    }

}