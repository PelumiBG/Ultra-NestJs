import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true})

export class User extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user'})
    userId: string;

    @Prop({ required: true, trim: true})
    email: string;

    @Prop({ required: true, trim: true, unique: true})
    name: string;

    @Prop({ required: true, unique: true, minlength: 6})
    password: string;

    @Prop({ required: true, unique: true, minlength: 6})
    phone: string;
};

export const UserSchema = SchemaFactory.createForClass(User)