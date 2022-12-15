import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';

export class GetObjectsQueryDto extends PartialType(PaginationParamsDto) {
  @IsOptional()
  @IsString()
  search: string | undefined;
}
