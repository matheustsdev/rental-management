import { Repository } from "typeorm";
import { IBaseController } from "../interfaces/baseController.interface";
import { IBaseService } from "../interfaces/baseService.interface";
import { DependeciesMapper } from "./dependencyMapper";

interface IBaseModuleConstructor {
    dependencies: any[];
    services: IBaseService<any>[];
    controllers: IBaseController<any>[];
    repositories: Repository<any>[];
}

export class BaseModule {
    _dependencies:DependeciesMapper;
    _services: IBaseService<any>[] = [];
    _controllers: IBaseController<any>[] = [];
    _repositories: Repository<any>[] = [];

    constructor({
        dependencies, 
        services, 
        controllers, 
        repositories
    }: IBaseModuleConstructor) {
        
        this._dependencies = new DependeciesMapper();
        dependencies.forEach(dependency => {
            this._dependencies.register(dependency.constructor.name, dependency);
        })

        console.log(this._dependencies);

        this._services = services;
        this._controllers = controllers;
        this._repositories = repositories;
    }
}