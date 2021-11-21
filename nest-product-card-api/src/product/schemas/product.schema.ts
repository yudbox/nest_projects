import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ProductCharacteristic {
  name: string;
  value: string;
}

@Schema()
export class Product extends Document {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedReting: string;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop({ type: () => [String] })
  catigories: string[];

  @Prop({ type: () => [String] })
  tags: string[];

  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);

// @Prop({type: ()=> [ProductCharacteristic], _id: false}) означает что нам не нужны id
// для каждого элемента объекта ProductCharacteristic
