export default interface ServerError extends Error {
    code: string;
    status: string;
    timestamp: string;
    type: string;
    title: string;
    detail: string;
    userMessage: string;
}

export class ServerErrorConstructor implements ServerError {
    code: string;
    status: string = "1";
    timestamp: string = "";
    type: string = "";
    title: string = "";
    detail: string = "";
    userMessage: string = "";
    name: string = "";
    message: string;
    stack?: string | undefined;
    cause?: Error | undefined;
  constructor(message:string, statusCode:string, cause?: Error | undefined) {
    this.message = message;
    this.code = statusCode;
    this.cause = cause;
  }
}