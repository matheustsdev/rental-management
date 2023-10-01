import { BaseModule } from "../../base/class/baseModule";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Express } from 'express';

export class UserModule extends BaseModule {
    constructor(appParam: Express) {
        super({
            dependencies: [new UserService()],
            services: [],
            controllers: [new UserController()],
            repositories: [],
            app: appParam
        });
    }
}