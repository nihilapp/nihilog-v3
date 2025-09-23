import { Module } from '@nestjs/common';

import { PostsController } from '@admin/posts/admin-posts.controller';
import { PostsService } from '@admin/posts/admin-posts.service';
import { DrizzleModule } from '@drizzle/drizzle.module';
import { PostRepository } from '@repositories/post.repository';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
