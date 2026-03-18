import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true})

export class Message extends Document {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user'})
    userId: string;

    @Prop({ required: true, trim: true})
    sender: string;

    @Prop({ required: true, trim: true})
    receiver: string

    @Prop({ required: true, trin: true})
    text: string
}

export const messageSchema = SchemaFactory.createForClass(Message)