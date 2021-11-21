import { Document } from 'mongoose';

interface ProductCharacteristic {
  name: string;
  value: string;
}

export interface IProduct extends Document {
  readonly image: string;
  readonly title: string;
  readonly price: number;
  readonly oldPrice?: number;
  readonly credit: number;
  readonly calculatedReting: string;
  readonly description: string;
  readonly advantages: string;
  readonly disAdvantages: string;
  readonly catigories: string[];
  readonly tags: string[];
  readonly characteristics: ProductCharacteristic[];
}
