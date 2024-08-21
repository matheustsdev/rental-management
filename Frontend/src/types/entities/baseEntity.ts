export type BaseEntity = {
    id: string;
    updatedAt?: Date;
    createdAt: Date;
    deletedAt?: Date;
    deleted: boolean;
}