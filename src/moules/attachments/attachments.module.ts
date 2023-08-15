import { Module } from '@nestjs/common';
import { AttachmentsService } from './services/attachments.service';
import { AttachmentsController } from './controllers/attachments.controller';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule {}
