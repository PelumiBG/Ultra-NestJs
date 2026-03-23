import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true})

export class Message extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: string;

    @Prop()
    senderId: mongoose.Schema.Types.ObjectId

    @Prop()
    receiverId: mongoose.Schema.Types.ObjectId

    @Prop({ required: true, trim: true})
    content: string

    @Prop({ default: false})
    isRead: boolean
}

export const messageSchema = SchemaFactory.createForClass(Message)