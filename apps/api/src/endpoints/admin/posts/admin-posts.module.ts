import { Module } from '@nestjs/common';

import { AdminPostsController } from '@/endpoints/admin/posts/admin-posts.controller';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';

@Module({
  providers: [ AdminPostsService, ],
  controllers: [ AdminPostsController, ],
  exports: [ AdminPostsService, ],
})
export class AdminPostsModule {}
