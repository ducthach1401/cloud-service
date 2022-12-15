import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CloudController } from './app/http/controllers/cloud-controller';
import { CloudRepository } from './domain/repositories/cloud-repository';
import { CloudRepositoryImpl } from './data/repositories/cloud-repository-impl';
import { CloudService } from './data/services/cloud-service';
import { ConfigModule } from '@nestjs/config';
import cloud from './config/cloud';
import { GetObjectsUsecase } from './domain/usecases/get-objects-usecase';
import { ShowFileUsecase } from './domain/usecases/show-file-usecase';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileUsecase } from './domain/usecases/upload-file-usecase';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [cloud],
    }),
    MulterModule.register({
      dest: '/tmp',
    }),
  ],
  controllers: [CloudController],
  providers: [
    {
      provide: CloudRepository,
      useClass: CloudRepositoryImpl,
    },
    CloudService,
    GetObjectsUsecase,
    ShowFileUsecase,
    UploadFileUsecase,
  ],
})
export class CloudModule {}
