import { Module } from '@nestjs/common';

import { PostsBookmarkController } from '@/endpoints/posts/bookmark/posts-bookmark.controller';
import { PostsBookmarkService } from '@/endpoints/posts/bookmark/posts-bookmark.service';
import { PrismaModule } from '@/endpoints/prisma/prisma.module';

@Module({
  imports: [ PrismaModule, ],
  providers: [ PostsBookmarkService, ],
  controllers: [ PostsBookmarkController, ],
  exports: [ PostsBookmarkService, ],
})
export class PostsBookmarkModule {}
