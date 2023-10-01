import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntityColumns } from "../class/baseEntityColumns";

@Entity({name: "reg_user"})
export class UserEntity extends BaseEntityColumns {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn()
    user_id: string;

    @Column()
    description: string;
}

