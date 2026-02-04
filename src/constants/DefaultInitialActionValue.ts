import { DefaultResponse } from "@/models/DefaultResponse";

export const defaultInitialActionValue: DefaultResponse<null> = {
    data: null,
    message: "",
    page: 0,
    pageSize: 0,
    total: 0,
};