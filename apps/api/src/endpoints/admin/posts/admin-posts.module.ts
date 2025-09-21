import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/endpoints/drizzle/drizzle.module';
import { PostRepository } from '@/endpoints/repositories/post.repository';
import { PostsController } from '@/endpoints/admin/posts/admin-posts.controller';
import { PostsService } from '@/endpoints/admin/posts/admin-posts.service';

@Module({
  imports: [ DrizzleModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
