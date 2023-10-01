import { Repository } from "typeorm";
import { Express } from 'express';
import { IBaseController, IServiceObject } from "../interfaces/baseController.interface";
import { IBaseService } from "../interfaces/baseService.interface";
import { DependeciesMapper } from "./dependencyMapper";

interface IBaseModuleConstructor {
    dependencies: any[];
    services: IBaseService<any>[];
    controllers: IBaseController<any>[];
    repositories: Repository<any>[];
    app: Express;
}

export class BaseModule {
    _dependencies:DependeciesMapper;
    _services: IBaseService<any>[] = [];
    _controllers: IBaseController<any>[] = [];
    _repositories: Repository<any>[] = [];
    _app: Express;

    constructor({
        dependencies, 
        services, 
        controllers, 
        repositories,
        app
    }: IBaseModuleConstructor) {
        
        this._dependencies = new DependeciesMapper();
        dependencies.forEach(dependency => {
            this._dependencies.register(dependency.constructor.name, dependency);
        })

        this._services = services;
        this._controllers = controllers;
        this._repositories = repositories;
        this._app = app;

        /* region Dependency Injection */
        this._controllers.forEach(controller => {

            const servicesNames = Object.keys(controller.services);

            const dependenciesNames = servicesNames.map(serviceName => {
                const depencyEntity = serviceName.split('Service')[0].charAt(0).toUpperCase() + serviceName.split('Service')[0].slice(1);
                const dependencyServiceName = `${depencyEntity}Service`;

                return dependencyServiceName;
            })

            let servicesObject: IServiceObject = {}
            
            dependenciesNames.forEach(dependencyName => {
                servicesObject[dependencyName] = this._dependencies.resolve(dependencyName);
            })

            controller.setServices(servicesObject);
            controller.app = this._app;
            controller.execute();

            console.log(controller.services)
        })
        /* endregion Dependency Injection */
    }
}