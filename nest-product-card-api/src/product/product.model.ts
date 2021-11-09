export class ProductModel {
  _id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedReting: string;
  description: string;
  advantages: string;
  disAdvantages: string;
  catigories: string;
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
