import { Document } from 'mongoose';
import { IAddress } from './adress.interface';

export interface IUser extends Document {
  readonly email: string;
  readonly status: string;
  readonly avatar: string;
  readonly avatarId: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly gender: string;
  readonly address: IAddress;
  readonly profession: string;
  readonly searchField: string;
  readonly phone: string;
  readonly roles: string[];
  readonly password: string;
}
