import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { CreateCommentDto, SearchCommentDto, UpdateCommentDto } from '@/dto';
import { searchCommentSchema } from '@/endpoints/prisma/schemas/comment.schema';
import type { SelectCommentListItemType, SelectCommentType } from '@/endpoints/prisma/types/comment.types';
import type { ListType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CommentRepository } from '@/endpoints/repositories/comment.repository';
import { PostRepository } from '@/endpoints/repositories/post.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository
  ) { }

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
    const result = await this.commentRepository.getCommentByCmntNo(cmntNo);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.COMMENT.USER.NOT_FOUND
      );
    }

    return result;
  }

  /**
   * @description 댓글 생성
   * @param userNo 사용자 번호
   * @param createData 생성 데이터
   */
  async createComment(userNo: number, createData: CreateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    // 포스트 존재 확인
    if (createData.pstNo) {
      const post = await this.postRepository.getPostByPstNo(createData.pstNo);
      if (!post?.success || !post.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.COMMENT.USER.POST_NOT_FOUND
        );
      }
    }

    // 부모 댓글 존재 확인 및 검증
    if (createData.prntCmntNo) {
      const parentComment = await this.commentRepository.getCommentByCmntNo(createData.prntCmntNo);
      if (!parentComment?.success || !parentComment.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.COMMENT.USER.PARENT_NOT_FOUND
        );
      }

      // 부모 댓글이 삭제되었는지 확인
      if (parentComment.data.delYn === 'Y') {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.PARENT_DELETED
        );
      }

      // 부모 댓글이 같은 포스트에 속하는지 확인
      if (createData.pstNo && parentComment.data.pstNo !== createData.pstNo) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.PARENT_WRONG_POST
        );
      }
    }

    // 댓글 내용 검증 (빈 문자열이나 공백만 있는 경우 체크)
    if (createData.cmntCntnt && createData.cmntCntnt.trim().length === 0) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMENT.USER.CONTENT_REQUIRED
      );
    }

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
    // 댓글 존재 확인
    const existingComment = await this.commentRepository.getCommentByCmntNo(cmntNo);
    if (!existingComment?.success || !existingComment.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.COMMENT.USER.NOT_FOUND
      );
    }

    // 이미 삭제된 댓글인지 확인
    if (existingComment.data.delYn === 'Y') {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMENT.USER.ALREADY_DELETED
      );
    }

    // 권한 확인 (작성자만 수정 가능)
    if (existingComment.data.crtNo !== userNo) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.COMMENT.USER.UNAUTHORIZED
      );
    }

    // 댓글 내용 검증
    if (updateData.cmntCntnt !== undefined) {
      if (!updateData.cmntCntnt || updateData.cmntCntnt.trim().length === 0) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.CONTENT_REQUIRED
        );
      }
      if (updateData.cmntCntnt.length > 1000) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.CONTENT_TOO_LONG
        );
      }
    }

    // 부모 댓글 변경 시 검증
    if (updateData.prntCmntNo !== undefined) {
      // null로 변경하는 경우는 허용 (최상위 댓글로 변경)
      if (updateData.prntCmntNo !== null) {
        const parentComment = await this.commentRepository.getCommentByCmntNo(updateData.prntCmntNo);
        if (!parentComment?.success || !parentComment.data) {
          return prismaResponse(
            false,
            null,
            'NOT_FOUND',
            MESSAGE.COMMENT.USER.PARENT_NOT_FOUND
          );
        }

        // 부모 댓글이 삭제되었는지 확인
        if (parentComment.data.delYn === 'Y') {
          return prismaResponse(
            false,
            null,
            'BAD_REQUEST',
            MESSAGE.COMMENT.USER.PARENT_DELETED
          );
        }

        // 부모 댓글이 같은 포스트에 속하는지 확인
        if (parentComment.data.pstNo !== existingComment.data.pstNo) {
          return prismaResponse(
            false,
            null,
            'BAD_REQUEST',
            MESSAGE.COMMENT.USER.PARENT_WRONG_POST
          );
        }

        // 자기 자신을 부모 댓글로 설정하는 것을 방지
        if (updateData.prntCmntNo === cmntNo) {
          return prismaResponse(
            false,
            null,
            'BAD_REQUEST',
            MESSAGE.COMMENT.USER.PARENT_SELF
          );
        }
      }
    }

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
    // 댓글 존재 확인
    const existingComment = await this.commentRepository.getCommentByCmntNo(cmntNo);
    if (!existingComment?.success || !existingComment.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.COMMENT.USER.NOT_FOUND
      );
    }

    // 이미 삭제된 댓글인지 확인
    if (existingComment.data.delYn === 'Y') {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMENT.USER.ALREADY_DELETED
      );
    }

    // 권한 확인 (작성자만 삭제 가능)
    if (existingComment.data.crtNo !== userNo) {
      return prismaResponse(
        false,
        null,
        'UNAUTHORIZED',
        MESSAGE.COMMENT.USER.UNAUTHORIZED
      );
    }

    return this.commentRepository.deleteComment(
      userNo,
      cmntNo
    );
  }
}
