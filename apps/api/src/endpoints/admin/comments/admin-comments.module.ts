import { Module } from '@nestjs/common';

import { AdminCommentsController } from '@/endpoints/admin/comments/admin-comments.controller';
import { AdminCommentsService } from '@/endpoints/admin/comments/admin-comments.service';

@Module({
  controllers: [ AdminCommentsController, ],
  providers: [ AdminCommentsService, ],
  exports: [ AdminCommentsService, ],
})
export class AdminCommentsModule {}
