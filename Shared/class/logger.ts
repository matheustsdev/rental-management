export enum EHTTPMethods {
    GET = "[GET]",
    POST = "[POST]",
    PATCH = "[PATCH]",
    DELETE = "[DELETE]"
}

export class Logger {
    static print(message: string) {
        console.log(message)
    }

    static error(message: string) {
        console.error(message)
    }

    static warn(message: string) {
        console.warn(message)
    }

    static success(message: string) {
        console.log(`\x1b[32m${message}\x1b[0m`)
    }

    static message(message: string) {
        
        console.log(`\x1b[35m${message}\x1b[0m`)
    }

    static route(method: EHTTPMethods, route: string) {
        const methodLength = method.length

        this.message(`${method + " ".repeat(8 - methodLength)} - ${route}`)
    }
}