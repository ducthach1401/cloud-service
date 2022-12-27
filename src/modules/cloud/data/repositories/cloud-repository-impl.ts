import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { PicfitModel } from '../../domain/models/picfit-model';
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

  async show(pathUrl: string, options: PicfitModel | undefined): Promise<any> {
    if (options) {
      return await this.cloudService.showPicfit(pathUrl, options);
    } else {
      return await this.cloudService.show(pathUrl);
    }
  }

  async upload(file: Express.Multer.File): Promise<void> {
    await this.cloudService.upload(file);
  }
}
