import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../enums/topLevelCategory.enum';

export class FindTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
