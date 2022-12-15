import { PaginationParams } from 'src/core/models/pagination-params';

export abstract class CloudRepository {
  abstract list(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<any>;

  abstract show(pathUrl: string): Promise<any>;

  abstract upload(file: Express.Multer.File): Promise<void>;
}
