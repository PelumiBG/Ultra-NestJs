import { Controller, Get, Post, Body, Query, UseGuards, UsePipes, ValidationPipe, Req, Inject } from '@nestjs/common';
import { MessagesService } from './message.service';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetCurrentUser} from 'src/decorator/custom.decorator';
import type { UserPayload } from 'src/decorator/custom.decorator';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private io: Server
  ) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createMessage(@Body() createMessageDto: CreateMessageDto,
  @GetCurrentUser() user: UserPayload,
   @Req() req: any) {
    const senderId = (req.user as any)._id;
    const message = await this.messagesService.createMessage(senderId, createMessageDto.receiverId, createMessageDto.content);
    
    
    this.io.to(createMessageDto.receiverId).emit('newMessage', message);
    
    return message;
  }

  @Get('chat')
  @UseGuards(JwtAuthGuard)
  async getMessages(@Query('senderId') userId: string, @Query('receiverId') otherUserId: string) {
    return this.messagesService.getMessages(userId, otherUserId);
  }

//  @Get()
//   async getInbox(@GetCurrentUser() user: UserPayload) {
//     const messages = await this.messagesService.getInbox(user.userId);
//     return { success: true, count: messages.length, data: messages };
//   }
}