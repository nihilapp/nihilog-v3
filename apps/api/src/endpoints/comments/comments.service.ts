import { Injectable } from '@nestjs/common';

import { CommentRepository } from '@/endpoints/repositories/comment.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}
}
