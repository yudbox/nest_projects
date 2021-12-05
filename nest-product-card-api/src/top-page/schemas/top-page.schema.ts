import { TopLevelCategory } from '../enums/topLevelCategory.enum';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class hhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;

  @Prop()
  updatedAt: Date;
}

export class TopPageAdvantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ autoIndex: true, timestamps: true })
export class TopPage {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => hhData })
  hh?: hhData;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}
export const TopPageSchema = SchemaFactory.createForClass(TopPage);

TopPageSchema.index({ title: 'text', seoText: 'text' });
