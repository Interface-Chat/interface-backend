import { Module } from '@nestjs/common';
import { UploadFileService } from './services/upload_file.service';

@Module({
  providers: [UploadFileService],
  exports:[UploadFileService]
})
export class UploadFileModule {}
