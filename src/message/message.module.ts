import { Module } from '@nestjs/common';
import { MessagesService } from './message.service';
import { MessagesGateway } from './message.ws';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, messageSchema } from './schema/message.schema';
import { AuthModule } from '../auth/auth.module';
import { MessagesController } from './message.controller';
import { Server } from 'socket.io';
import { WsJwtGuard } from 'src/auth/ws.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Message.name, schema: messageSchema
    }]),
    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, Server, WsJwtGuard],
  exports: [MessagesService]
})
export class MessageModule {}
