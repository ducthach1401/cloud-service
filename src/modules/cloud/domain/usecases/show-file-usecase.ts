import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { PicfitModel } from '../models/picfit-model';
import { CloudRepository } from '../repositories/cloud-repository';

@Injectable()
export class ShowFileUsecase {
  constructor(private readonly cloudRepository: CloudRepository) {}

  async call(pathUrl: string, options: PicfitModel | undefined): Promise<any> {
    if (options) {
      if (!options.operation) {
        throw new LogicalException(
          ErrorCode.VALIDATION_ERROR,
          'Not found operation.',
          undefined,
        );
      }
      if (!options.weight && !options.height) {
        throw new LogicalException(
          ErrorCode.VALIDATION_ERROR,
          'Not found weight or height.',
          undefined,
        );
      }
    }
    return await this.cloudRepository.show(pathUrl, options);
  }
}
