import { DefaultResponse } from "./DefaultResponse";
import { ServerError } from "./ServerError";


export class ErrorResponse extends DefaultResponse<null> {
    constructor(serverError: ServerError) {
        super(null, serverError.message, null, null, null);

        this.errorCode = serverError.code ?? 500;
        this.errorDetail = serverError.message;
    }

    errorCode: number;
    errorDetail: string;
}