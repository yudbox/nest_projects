import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
  @Prop({ unique: true, type: String, required: true})
  email: string;

  @Prop({type: String, required: true})
  passwordHash: string;

  @Prop({type: Date, required: true})
  createdAt: Date;

}
export const AuthSchema = SchemaFactory.createForClass(Auth);

// AuthSchema.index({ email: 1 }, { unique: true });
