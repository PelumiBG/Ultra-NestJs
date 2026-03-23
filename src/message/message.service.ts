import { Injectable } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schema/message.schema';
import { FilterByInclude } from '@nestjs/core';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(senderId: string, receiverId: string, content: string) {
    const message = new this.messageModel({
      content,
      senderId: new Types.ObjectId(senderId),
      receiverId: new Types.ObjectId(receiverId),
    });

    await message.save();

    return {
      message: 'Message sent successfully',
      data: message,
    };
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    const $senderId = new Types.ObjectId(senderId);
    const $receiverId = new Types.ObjectId(receiverId);

    return this.messageModel
      .find({
        $or: [
          { senderId: $senderId, receiverId: $receiverId },
          { senderId: $receiverId, receiverId: $senderId },
        ],
      } as any)
      .populate('senderId', 'username email')
      .populate('receiverId', 'username email')
      .sort({ createdAt: 1 });
  }
}