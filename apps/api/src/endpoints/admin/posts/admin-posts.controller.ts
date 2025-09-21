import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import { PostsService } from '@/endpoints/admin/posts/admin-posts.service';

@ApiTags('admin/posts')
@Controller('admin/posts')
@UseGuards(AdminAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
