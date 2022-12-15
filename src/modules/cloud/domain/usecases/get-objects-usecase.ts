import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { CloudRepository } from '../repositories/cloud-repository';

@Injectable()
export class GetObjectsUsecase {
  constructor(private readonly cloudRepository: CloudRepository) {}

  async call(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<any> {
    return await this.cloudRepository.list(search, paginationParams);
  }
}
