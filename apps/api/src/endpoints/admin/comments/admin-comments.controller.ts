import { Controller } from '@nestjs/common';

import { AdminCommentsService } from '@/endpoints/admin/comments/admin-comments.service';

@Controller('admin-comments')
export class AdminCommentsController {
  constructor(private readonly adminCommentsService: AdminCommentsService) { }
}
