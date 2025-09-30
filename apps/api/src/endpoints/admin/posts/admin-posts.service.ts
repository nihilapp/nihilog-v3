import { Injectable } from '@nestjs/common';

import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class AdminPostsService {
  constructor(private readonly postRepository: PostRepository) {}
}
