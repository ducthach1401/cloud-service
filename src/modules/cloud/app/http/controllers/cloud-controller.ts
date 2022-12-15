import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { PaginationParams } from 'src/core/models/pagination-params';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { Public } from 'src/modules/auth/app/decorators/metadata';
import { GetObjectsUsecase } from 'src/modules/cloud/domain/usecases/get-objects-usecase';
import { ShowFileUsecase } from 'src/modules/cloud/domain/usecases/show-file-usecase';
import { UploadFileUsecase } from 'src/modules/cloud/domain/usecases/upload-file-usecase';

@Public()
@Controller('api/v1/cloud')
export class CloudController {
  constructor(
    private readonly getObjectsUsecase: GetObjectsUsecase,
    private readonly showFileUsecase: ShowFileUsecase,
    private readonly uploadFileUsecase: UploadFileUsecase,
  ) {}

  @Get()
  async getObjects(@Query() query: any, @Res() res: Response) {
    const objects = await this.getObjectsUsecase.call(
      query.search,
      new PaginationParams(),
    );
    res.json(objects);
  }

  @Get('show/:name')
  async showFile(@Param() params: any, @Res() res: Response) {
    const file = await this.showFileUsecase.call(params.name);
    createReadStream(file.path).pipe(res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new LogicalException(
        ErrorCode.UNDEFINED_ERROR,
        'Not found file.',
        undefined,
      );
    }
    await this.uploadFileUsecase.call(file);
    res.json(normalizeResponseData(true));
  }
}
