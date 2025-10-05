import { Module } from '@nestjs/common';

import { PostsController } from '@/endpoints/posts/posts.controller';
import { PostsService } from '@/endpoints/posts/posts.service';

@Module({
  providers: [ PostsService, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
