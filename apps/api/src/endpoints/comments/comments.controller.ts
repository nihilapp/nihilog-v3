import { Controller } from '@nestjs/common';

import { CommentsService } from '@/endpoints/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }
}
