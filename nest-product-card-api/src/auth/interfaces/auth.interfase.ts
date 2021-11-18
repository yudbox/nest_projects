import { Document } from 'mongoose';

export interface IAuth extends Document {
  readonly email: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
}
