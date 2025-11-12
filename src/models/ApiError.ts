export class ApiError extends Error {
    constructor(message?: string, code?: number) {
        super(message);

        this.code = code;
    }

    code?: number;
}