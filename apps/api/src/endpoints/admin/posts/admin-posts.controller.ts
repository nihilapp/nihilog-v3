import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from '@admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@auth/admin-auth.guard';

@ApiTags('admin/posts')
@Controller('admin/posts')
@UseGuards(AdminAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
