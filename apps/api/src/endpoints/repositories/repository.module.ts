import { Global, Module } from '@nestjs/common';

import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { PostRepository } from '@/endpoints/repositories/post.repository';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { TagRepository } from '@/endpoints/repositories/tag.repository';
import { UserRepository } from '@/endpoints/repositories/user.repository';

@Global()
@Module({
  providers: [
    UserRepository,
    PostRepository,
    TagRepository,
    SubscribeRepository,
    CategorySubscribeRepository,
    TagSubscribeRepository,
  ],
  exports: [
    UserRepository,
    PostRepository,
    TagRepository,
    SubscribeRepository,
    CategorySubscribeRepository,
    TagSubscribeRepository,
  ],
})
export class RepositoryModule {}
