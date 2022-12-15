import { Injectable } from '@nestjs/common';
import { CloudRepository } from '../repositories/cloud-repository';

@Injectable()
export class UploadFileUsecase {
  constructor(private readonly cloudRepository: CloudRepository) {}

  async call(file: Express.Multer.File): Promise<void> {
    return await this.cloudRepository.upload(file);
  }
}
