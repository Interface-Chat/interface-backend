import { Module } from '@nestjs/common';
import { UploadFileService } from './services/upload_file.service';

@Module({
  providers: [UploadFileService]
})
export class UploadFileModule {}
