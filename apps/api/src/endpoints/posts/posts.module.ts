import { Module } from '@nestjs/common';

import { DrizzleModule } from '@drizzle/drizzle.module';
import { PostRepository } from '@repositories/post.repository';
import { PostsController } from '@posts/posts.controller';
import { PostsService } from '@posts/posts.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
