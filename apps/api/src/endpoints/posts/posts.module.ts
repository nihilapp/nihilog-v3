import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { PostsController } from '@/endpoints/posts/posts.controller';
import { PostsService } from '@/endpoints/posts/posts.service';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
