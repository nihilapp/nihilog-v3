import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from '@/endpoints/posts/posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
