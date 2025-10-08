import { Inject, Injectable } from '@nestjs/common';
import { CommentStatus, type Prisma, type PrismaClient } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreateCommentDto, DeleteCommentDto, SearchCommentDto, UpdateCommentDto } from '@/dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { SelectCommentListItemType, SelectCommentType } from '@/endpoints/prisma/types/comment.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class CommentRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ================================================
  // 일반 사용자 기능
  // ================================================

  /**
   * @description 댓글 목록 조회
   * @param searchData 검색 데이터
   */
  async getCommentList(searchData: SearchCommentDto): Promise<RepoResponseType<ListType<SelectCommentListItemType>> | null> {
    try {
      const { page, strtRow, endRow, delYn, cmntSts, srchType, srchKywd, crtDtFrom, crtDtTo, orderBy, pstNo, useYn, } = searchData;

      const where: Prisma.CmntInfoWhereInput = {
        ...(delYn && { delYn, }),
        ...(useYn && { useYn, }),
        ...(srchKywd && (srchType === 'userEmlAddr') && {
          creator: {
            is: {
              emlAddr: srchKywd,
            },
          },
        }),
        ...(srchKywd && (srchType === 'cmntCntnt') && {
          cmntCntnt: {
            contains: srchKywd,
          },
        }),
        ...(srchKywd && (srchType === 'userNm') && {
          creator: {
            is: {
              userNm: srchKywd,
            },
          },
        }),
        ...(pstNo && { pstNo, }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
          },
        }),
        ...(cmntSts && (cmntSts === 'PENDING') && {
          cmntSts: CommentStatus.PENDING,
        }),
        ...(cmntSts && (cmntSts === 'APPROVED') && {
          cmntSts: CommentStatus.APPROVED,
        }),
        ...(cmntSts && (cmntSts === 'REJECTED') && {
          cmntSts: CommentStatus.REJECTED,
        }),
        ...(cmntSts && (cmntSts === 'SPAM') && {
          cmntSts: CommentStatus.SPAM,
        }),
      };

      const { offset: skip, limit: take, } = pageHelper(page, strtRow, endRow);

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.cmntInfo.findMany({
          where,
          skip,
          take,
          include: {
            post: true,
            parentComment: true,
            replies: true,
            creator: true,
          },
          orderBy: {
            ...(orderBy === 'LATEST') && {
              crtDt: 'desc',
            },
            ...(orderBy === 'OLDEST') && {
              crtDt: 'asc',
            },
          },
        }),
        this.prisma.cmntInfo.count({ where, }),
      ]);

      return prismaResponse(true, {
        list: list.map((item, index) => ({
          ...item,
          totalCnt,
          rowNo: skip + index + 1,
        })),
        totalCnt,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 상세 조회
   * @param cmntNo 댓글 번호
   */
  async getCommentByCmntNo(cmntNo: number): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const comment = await this.prisma.cmntInfo.findUnique({
        where: {
          cmntNo,
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      return prismaResponse(true, comment);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 생성
   * @param userNo 사용자 번호
   * @param createData 생성 데이터
   */
  async createComment(userNo: number, createData: CreateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const { pstNo, cmntCntnt, cmntSts, prntCmntNo, } = createData;

      const newComment = await this.prisma.cmntInfo.create({
        data: {
          pstNo,
          cmntCntnt,
          cmntSts: cmntSts || CommentStatus.PENDING,
          prntCmntNo: prntCmntNo || null,
          useYn: 'Y',
          delYn: 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      return prismaResponse(true, newComment);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async updateComment(userNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const updateComment = await this.prisma.cmntInfo.update({
        where: {
          cmntNo: updateData.cmntNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      return prismaResponse(true, updateComment);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제 데이터
   */
  async deleteComment(userNo: number, deleteData: DeleteCommentDto): Promise<RepoResponseType<boolean> | null> {
    try {
      const deleteComment = await this.prisma.cmntInfo.update({
        where: {
          cmntNo: deleteData.cmntNo,
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        },
      });

      return prismaResponse(true, !!deleteComment);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  // ================================================
  // 어드민 기능
  // ================================================

  /**
   * @description 댓글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async multipleUpdateComment(userNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const updatedComments = await this.prisma.cmntInfo.updateManyAndReturn({
        where: {
          cmntNo: { in: updateData.cmntNoList, },
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        select: {
          cmntNo: true,
        },
      });

      const failNoList = updateData.cmntNoList.filter((item) => !updatedComments.some((updatedComment) => updatedComment.cmntNo === item));

      return prismaResponse(true, {
        successCnt: updatedComments.length,
        failCnt: updateData.cmntNoList.length - updatedComments.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제 데이터
   */
  async multipleDeleteComment(userNo: number, deleteData: DeleteCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletedComments = await this.prisma.cmntInfo.updateManyAndReturn({
        where: {
          cmntNo: { in: deleteData.cmntNoList, },
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        },
        select: {
          cmntNo: true,
        },
      });

      const failNoList = deleteData.cmntNoList.filter((item) => !deletedComments.some((deletedComment) => deletedComment.cmntNo === item));

      return prismaResponse(true, {
        successCnt: deletedComments.length,
        failCnt: deleteData.cmntNoList.length - deletedComments.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
