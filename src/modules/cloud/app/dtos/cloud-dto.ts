import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';
import { Type } from 'class-transformer';

export class GetObjectsQueryDto extends PartialType(PaginationParamsDto) {
  @IsOptional()
  @IsString()
  search: string | undefined;
}

export class ShowFileParamDto {
  @IsString()
  name: string;
}

export class ShowFileQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  weight: number | undefined;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height: number | undefined;

  @IsOptional()
  @IsString()
  operation: string;
}
