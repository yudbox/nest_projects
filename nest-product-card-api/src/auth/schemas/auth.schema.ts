import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Auth {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
