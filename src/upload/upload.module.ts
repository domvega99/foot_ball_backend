import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class UploadModule {}
