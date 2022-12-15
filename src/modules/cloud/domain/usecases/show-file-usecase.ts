import { Injectable } from '@nestjs/common';
import { CloudRepository } from '../repositories/cloud-repository';

@Injectable()
export class ShowFileUsecase {
  constructor(private readonly cloudRepository: CloudRepository) {}

  async call(pathUrl: string): Promise<any> {
    return await this.cloudRepository.show(pathUrl);
  }
}
