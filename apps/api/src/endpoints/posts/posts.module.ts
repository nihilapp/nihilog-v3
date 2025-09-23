import { Module } from '@nestjs/common';

import { DrizzleModule } from '@drizzle/drizzle.module';
import { PostsController } from '@posts/posts.controller';
import { PostsService } from '@posts/posts.service';
import { PostRepository } from '@repositories/post.repository';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
