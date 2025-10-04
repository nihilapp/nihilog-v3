import { Module } from '@nestjs/common';

import { PrismaModule } from '@/endpoints/prisma/prisma.module';
import { PostsController } from '@/endpoints/posts/posts.controller';
import { PostsService } from '@/endpoints/posts/posts.service';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Module({
  imports: [ PrismaModule, ],
  providers: [ PostsService, PostRepository, ],
  controllers: [ PostsController, ],
  exports: [ PostsService, ],
})
export class PostsModule {}
