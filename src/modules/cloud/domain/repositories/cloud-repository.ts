import { PaginationParams } from 'src/core/models/pagination-params';
import { PicfitModel } from '../models/picfit-model';

export abstract class CloudRepository {
  abstract list(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<any>;

  abstract show(
    pathUrl: string,
    options: PicfitModel | undefined,
  ): Promise<any>;

  abstract upload(file: Express.Multer.File): Promise<void>;
}
