import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Field(() => Number, { description: 'Page number.' })
  page: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { description: 'Page size.' })
  limit: number;
}
