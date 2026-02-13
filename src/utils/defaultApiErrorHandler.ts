import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { ServerError } from "@/utils/models/ServerError";
import { NextResponse } from "next/server";

export function defaultApiErrorHandler(error: unknown) {
    if (error instanceof ServerError) {
        const errorResponse = new ErrorResponse(error);

        return NextResponse.json(errorResponse);
    }

    const serverError = new ServerError("Erro interno do servidor", 500);
    const errorResponse = new ErrorResponse(serverError);

    return NextResponse.json(errorResponse);
}