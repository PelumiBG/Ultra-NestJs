import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  OnGatewayConnection,
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsJwtGuard } from '../auth/ws.guard';
import { MessagesService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { receiverId: string, content: string }, @ConnectedSocket() client: Socket) {
    const senderId = client.data.user._id.toString();
    const message = await this.messagesService.createMessage(senderId, data.receiverId, data.content);
    client.to(data.receiverId).emit('newMessage', message);
    return message;
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}