import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { CreateCommentDto, SearchCommentDto, UpdateCommentDto } from '@/dto';
import { searchCommentSchema } from '@/endpoints/prisma/schemas/comment.schema';
import type { SelectCommentListItemType, SelectCommentType } from '@/endpoints/prisma/types/comment.types';
import type { ListType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CommentRepository } from '@/endpoints/repositories/comment.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  /**
   * @description 댓글 목록 조회
   * @param searchData 검색 데이터
   */
  async getCommentList(searchData: SearchCommentDto): Promise<RepoResponseType<ListType<SelectCommentListItemType>> | null> {
    const safeData = searchCommentSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.commentRepository.getCommentList(safeData.data);
  }

  /**
   * @description 댓글 번호로 댓글 조회
   * @param cmntNo 댓글 번호
   */
  async getCommentByCmntNo(cmntNo: number): Promise<RepoResponseType<SelectCommentType> | null> {
    return this.commentRepository.getCommentByCmntNo(cmntNo);
  }

  /**
   * @description 댓글 생성
   * @param userNo 사용자 번호
   * @param createData 생성 데이터
   */
  async createComment(userNo: number, createData: CreateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    return this.commentRepository.createComment(
      userNo,
      createData
    );
  }

  /**
   * @description 댓글 수정
   * @param userNo 사용자 번호
   * @param cmntNo 댓글 번호
   * @param updateData 수정 데이터
   */
  async updateComment(userNo: number, cmntNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    return this.commentRepository.updateComment(
      userNo,
      cmntNo,
      updateData
    );
  }

  /**
   * @description 댓글 삭제
   * @param userNo 사용자 번호
   * @param cmntNo 댓글 번호
   */
  async deleteComment(userNo: number, cmntNo: number): Promise<RepoResponseType<boolean> | null> {
    return this.commentRepository.deleteComment(
      userNo,
      cmntNo
    );
  }
}
