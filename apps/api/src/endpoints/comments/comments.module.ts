import { Module } from '@nestjs/common';

import { CommentsController } from '@/endpoints/comments/comments.controller';
import { CommentsService } from '@/endpoints/comments/comments.service';

@Module({
  providers: [ CommentsService, ],
  controllers: [ CommentsController, ],
  exports: [ CommentsService, ],
})
export class CommentsModule {}
