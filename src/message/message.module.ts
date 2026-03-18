import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, messageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Message.name, schema: messageSchema
    }]),
    
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
