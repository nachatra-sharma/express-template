export interface GenericError extends Error {
  statusCode: number;
}

export class InternalServerError implements GenericError {
  name: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    this.name = "Internal Server Error";
    this.message = message;
    this.statusCode = 500;
  }
}

export class BadRequest implements GenericError {
  name: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    this.name = "Bad Request";
    this.message = message;
    this.statusCode = 400;
  }
}

export class NotFoundError implements GenericError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 404;
    this.message = message;
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError implements GenericError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 401;
    this.message = message;
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError implements GenericError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 403;
    this.message = message;
    this.name = "ForbiddenError";
  }
}

export class ConflictError implements GenericError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 409;
    this.message = message;
    this.name = "ConflictError";
  }
}

export class NotImplementedError implements GenericError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 501;
    this.message = message;
    this.name = "NotImplementedError";
  }
}
