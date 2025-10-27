import { DefaultResponse } from "./DefaultResponse";


export class ErrorResponse extends DefaultResponse<null> {
    constructor(message: string, code?: number, errorMessage?: string) {
        super(null, message, null, null, null);

        this.errorCode = code ?? 500;
        this.errorDetail = errorMessage ?? "";
    }

    errorCode: number;
    errorDetail: string;
}