import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { CloudRepository } from '../../domain/repositories/cloud-repository';
import { CloudService } from '../services/cloud-service';

@Injectable()
export class CloudRepositoryImpl extends CloudRepository {
  constructor(private readonly cloudService: CloudService) {
    super();
  }

  async list(search: string, paginationParams: PaginationParams): Promise<any> {
    return await this.cloudService.list(search, paginationParams);
  }

  async show(pathUrl: string): Promise<any> {
    return await this.cloudService.show(pathUrl);
  }

  async upload(file: Express.Multer.File): Promise<void> {
    await this.cloudService.upload(file);
  }
}
