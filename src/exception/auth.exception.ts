import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExist extends HttpException {
    constructor(message: string = 'User already exist') {
        super(message, HttpStatus.BAD_REQUEST)
    }
};

export class InvalidCredentialsException extends HttpException {
  constructor(message: string = 'Invalid credentials') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Invalid credentials') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class UserIdException extends HttpException {
  constructor(message: string = 'Invalid credentials') {
    super(message, HttpStatus.NOT_FOUND);
  }
}