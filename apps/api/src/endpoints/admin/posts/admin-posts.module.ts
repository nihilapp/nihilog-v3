import { Module } from '@nestjs/common';

import { AdminPostsController } from '@/endpoints/admin/posts/admin-posts.controller';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Module({
  imports: [ PrismaModule, ],
  providers: [ AdminPostsService, PostRepository, ],
  controllers: [ AdminPostsController, ],
  exports: [ AdminPostsService, ],
})
export class AdminPostsModule {}
