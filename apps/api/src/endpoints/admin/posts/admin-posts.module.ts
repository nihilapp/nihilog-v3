import { Module } from '@nestjs/common';

import { DrizzleModule } from '@drizzle/drizzle.module';
import { PostRepository } from '@repositories/post.repository';
import { PostsController } from '@admin/posts/admin-posts.controller';
import { PostsService } from '@admin/posts/admin-posts.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
