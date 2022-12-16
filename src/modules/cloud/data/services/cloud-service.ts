import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { createReadStream, createWriteStream, renameSync } from 'fs';
import * as FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class CloudService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getBaseUrl(): string {
    return this.configService.get<string>('cloud.storage.baseUrl');
  }

  private async auth() {
    const response = await lastValueFrom(
      this.httpService.post(`${this.getBaseUrl()}/api/v1/auth/login`, {
        client_id: this.configService.get<string>('cloud.storage.clientId'),
        client_secret: this.configService.get<string>(
          'cloud.storage.clientSecret',
        ),
      }),
    );
    return `Bearer ${response.data.access_token}`;
  }

  async list(search: string, paginationParams: PaginationParams): Promise<any> {
    const token = await this.auth();
    const response = await lastValueFrom(
      this.httpService.get(`${this.getBaseUrl()}/api/v1/storage`, {
        headers: {
          Authorization: token,
        },
        params: {
          search: search,
          page: paginationParams.page,
          limit: paginationParams.limit,
        },
      }),
    );
    response.data.map((value: any) => delete value.public_url);
    return response.data;
  }

  async show(pathUrl: string): Promise<any> {
    const publicUrl = this.configService.get<string>('cloud.storage.publicUrl');
    const bucket = this.configService.get<string>('cloud.storage.bucket');
    const file = createWriteStream(`/tmp/cache`);
    const fileStream = await this.httpService.axiosRef({
      baseURL: `${publicUrl}/${bucket}`,
      url: encodeURI(pathUrl),
      method: 'GET',
      responseType: 'stream',
    });
    fileStream.data.pipe(file);
    return file;
  }

  async upload(file: Express.Multer.File): Promise<void> {
    const token = await this.auth();
    const payload = new FormData();
    const path =
      'public/' +
      JSON.stringify(new Date())
        .split('T')[0]
        .slice(1)
        .split('-')
        .slice(0, 2)
        .join('/');
    payload.append('file', createReadStream(file.path), {
      filename: uuidv4() + extname(file.originalname),
    });
    payload.append('path', path);

    await lastValueFrom(
      this.httpService.post(
        `${this.getBaseUrl()}/api/v1/storage/upload`,
        payload,
        {
          headers: {
            Authorization: token,
            ...payload.getHeaders(),
          },
        },
      ),
    );

    renameSync(file.path, '/tmp/remove');
  }
}
