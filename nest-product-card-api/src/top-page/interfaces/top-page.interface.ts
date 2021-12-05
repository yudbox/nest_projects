import { TopLevelCategory } from '../enums/topLevelCategory.enum';

export interface hhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

interface TopPageAdvantage {
  title: string;
  description: string;
}

export interface ITopPage extends Document {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  hh?: hhData;
  advantages: TopPageAdvantage[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
