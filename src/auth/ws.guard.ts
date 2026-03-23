import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>();
    const token = client.handshake.auth?.token;
    if (!token) {
      return false;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      client.data.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}