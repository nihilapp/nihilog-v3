import { Injectable } from '@nestjs/common';

import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}
}
