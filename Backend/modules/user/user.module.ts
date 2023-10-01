import { BaseModule } from "../../base/class/baseModule";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export class UserModule extends BaseModule {
    constructor() {
        super({
            dependencies: [new UserService()],
            services: [],
            controllers: [new UserController()],
            repositories: []
        });
    }
}