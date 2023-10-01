import { BaseService } from "../../base/class/baseService";
import { UserEntity } from "../../../Shared/entity/user.entity"

export class UserService extends BaseService<UserEntity> {

    create(data: UserEntity): Promise<UserEntity[]> {
        console.log("Create")
        throw new Error("Method not implemented.");
    }
    readAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    readById(id: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
  
}