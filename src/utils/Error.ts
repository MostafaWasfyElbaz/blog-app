export class ApplicationException extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number, options?: ErrorOptions) {
    super(msg, options);
    this.statusCode = statusCode;
  }
}

export class failedToCreateUser extends ApplicationException {
  constructor(msg: string = "Failed to create user", statusCode: number = 500) {
    super(msg, statusCode);
  }
}

export class invalidCredentialsError extends ApplicationException {
  constructor(msg: string = "Invalid Credentials", statusCode: number = 400) {
    super(msg, statusCode);
  }
}

export class notFoundError extends ApplicationException {
  constructor(msg: string = "Not Found", statusCode: number = 404) {
    super(msg, statusCode);
  }
}

export class validationError extends ApplicationException {
  constructor(msg: string[], statusCode: number, options?: ErrorOptions) {
    super(msg.join("\n"), statusCode, options);
  }
}
