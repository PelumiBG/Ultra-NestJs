import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserPayload = {
  userId: string;
  email: string;
};

export const GetCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user; 
  },
);