import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntityColumns extends BaseEntity {

    constructor() {
        super()
    }

    
    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    public created_date: Date;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    public updated_date: Date;

}