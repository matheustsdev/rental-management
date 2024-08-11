import { EStatusResponse } from "../constants/enums/EStatusResponse";

export type ResponseModel<T> = {
    result: T;
    message: string;
    status: EStatusResponse;
}