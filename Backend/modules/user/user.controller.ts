import { UserEntity } from '../../../Shared/entity/user.entity';
import { BaseController } from '../../base/class/baseController';
import { IBaseController } from '../../base/interfaces/baseController.interface';
import { UserService } from './user.service';

export class UserController extends BaseController<UserEntity> {

    constructor() {
        super()
        this.setDependenciesName(['userService'])
        this.services = {
            userService: null
        }
    }

}