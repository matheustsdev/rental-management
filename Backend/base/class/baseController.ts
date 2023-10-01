import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
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

        console.log("POST - ", this.constructor.name, ` - {/${routeName}}`)
        this.app.post(`/${routeName}`, this.create);

        console.log("GET - ", this.constructor.name, ` - {/${routeName}}`)
        this.app.get(`/${routeName}`, this.readAll);

        console.log("GET - ", this.constructor.name, ` - {/${routeName}/:id}`)
        this.app.get(`/${routeName}/:id`, this.readById);

        console.log("PUT - ", this.constructor.name, ` - {/${routeName}/:id}`)
        this.app.put(`/${routeName}/:id`, this.update);

        console.log("DELETE - ", this.constructor.name, ` - {/${routeName}/:id}`)
        this.app.delete(`/${routeName}/:id`, this.delete);
    }

}