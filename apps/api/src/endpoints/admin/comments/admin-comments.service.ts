import { Injectable } from '@nestjs/common';

import type { DeleteCommentDto, UpdateCommentDto } from '@/dto';
import type { MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CommentRepository } from '@/endpoints/repositories/comment.repository';

@Injectable()
export class AdminCommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  /**
   * @description 관리자 댓글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async adminMultipleUpdateComment(userNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.commentRepository.multipleUpdateComment(userNo, updateData);
  }

  /**
   * @description 관리자 댓글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제 데이터
   */
  async adminMultipleDeleteComment(userNo: number, deleteData: DeleteCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.commentRepository.multipleDeleteComment(userNo, deleteData);
  }
}
