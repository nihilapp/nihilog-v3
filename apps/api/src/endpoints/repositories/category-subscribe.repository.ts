import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreateCategorySubscribeDto, DeleteCategorySubscribeDto, SearchCategorySubscribeDto, UpdateCategorySubscribeDto } from '@/dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type {
  SelectCtgrySbcrMpngListItemType,
  SelectCtgrySbcrMpngType
} from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class CategorySubscribeRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 카테고리 구독 전체 이력 조회
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, crtDtFrom, crtDtTo, orderBy, ctgryNo, sbcrNo, useYn, } = searchData;

      const where = {
        ...(delYn && { delYn, }),
        ...(useYn && { useYn, }),
        ...(ctgryNo && { ctgryNo, }),
        ...(sbcrNo && { sbcrNo, }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
          },
        }),
        ...(srchKywd && srchType === 'ctgryNm') && {
          category: {
            is: {
              ctgryNm: {
                contains: srchKywd,
              },
            },
          },
        },
        ...(srchKywd && srchType === 'userNm') && {
          subscription: {
            is: {
              user: {
                is: {
                  userNm: {
                    contains: srchKywd,
                  },
                },
              },
            },
          },
        },
        ...(srchKywd && srchType === 'ctgryExpln') && {
          category: {
            is: {
              ctgryExpln: {
                contains: srchKywd,
              },
            },
          },
        },
      };
      const skip = pageHelper(
        page,
        strtRow,
        endRow
      ).offset;
      const take = pageHelper(
        page,
        strtRow,
        endRow
      ).limit;

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.ctgrySbcrMpng.findMany({
          where,
          include: {
            category: {
              select: {
                ctgryNm: true,
              },
            },
          },
          orderBy: {
            ...(orderBy === 'CTGRY_SBCR_LATEST') && {
              ctgrySbcrNo: 'desc',
            },
            ...(orderBy === 'CTGRY_SBCR_OLDEST') && {
              ctgrySbcrNo: 'asc',
            },
            ...(orderBy === 'CTGRY_NAME_ASC') && {
              ctgryNm: 'asc',
            },
            ...(orderBy === 'CTGRY_NAME_DESC') && {
              ctgryNm: 'desc',
            },
            ...(orderBy === 'USER_NAME_ASC') && {
              userNm: 'asc',
            },
            ...(orderBy === 'USER_NAME_DESC') && {
              userNm: 'desc',
            },
          },
          skip,
          take,
        }),
        this.prisma.ctgrySbcrMpng.count({
          where,
        }),
      ]);

      return prismaResponse(
        true,
        {
          list: list.map((item, index) => ({
            ...item,
            totalCnt,
            rowNo: skip + index + 1,
          })),
          totalCnt,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 번호로 카테고리 구독 조회
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  async getCategorySubscribeByCtgrySbcrNo(ctgrySbcrNo: number): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    try {
      const subscribe = await this.prisma.ctgrySbcrMpng.findUnique({
        where: {
          ctgrySbcrNo,
        },
        include: {
          category: {
            select: {
              ctgryNm: true,
            },
          },
        },
      });

      return prismaResponse(
        true,
        subscribe
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(
    userNo: number,
    searchData: SearchCategorySubscribeDto
  ): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        subscription: {
          is: {
            user: {
              is: {
                userNo,
              },
            },
          },
        },
        delYn: delYn || 'N',
        ...(srchKywd && srchType === 'ctgryNm') && {
          category: {
            is: {
              ctgryNm: {
                contains: srchKywd,
              },
            },
          },
        },
        ...(srchKywd && srchType === 'userNm') && {
          subscription: {
            is: {
              user: {
                is: {
                  userNm: {
                    contains: srchKywd,
                  },
                },
              },
            },
          },
        },
        ...(srchKywd && srchType === 'ctgryExpln') && {
          category: {
            is: {
              ctgryExpln: {
                contains: srchKywd,
              },
            },
          },
        },
      };
      const skip = pageHelper(
        page,
        strtRow,
        endRow
      ).offset;
      const take = pageHelper(
        page,
        strtRow,
        endRow
      ).limit;

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.ctgrySbcrMpng.findMany({
          where,
          include: {
            category: {
              select: {
                ctgryNm: true,
              },
            },
          },
          orderBy: {
            ctgrySbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.ctgrySbcrMpng.count({
          where,
        }),
      ]);

      return prismaResponse(
        true,
        {
          list: list.map((item, index) => ({
            ...item,
            totalCnt,
            rowNo: skip + index + 1,
          })),
          totalCnt,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByCtgryNo(
    ctgryNo: number,
    searchData: SearchCategorySubscribeDto
  ): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        ctgryNo,
        delYn: delYn || 'N',
        ...(srchKywd && srchType === 'ctgryNm') && {
          category: {
            is: {
              ctgryNm: {
                contains: srchKywd,
              },
            },
          },
        },
        ...(srchKywd && srchType === 'userNm') && {
          subscription: {
            is: {
              user: {
                is: {
                  userNm: {
                    contains: srchKywd,
                  },
                },
              },
            },
          },
        },
        ...(srchKywd && srchType === 'ctgryExpln') && {
          category: {
            is: {
              ctgryExpln: {
                contains: srchKywd,
              },
            },
          },
        },
      };
      const skip = pageHelper(
        page,
        strtRow,
        endRow
      ).offset;
      const take = pageHelper(
        page,
        strtRow,
        endRow
      ).limit;

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.ctgrySbcrMpng.findMany({
          where,
          include: {
            category: {
              select: {
                ctgryNm: true,
              },
            },
          },
          orderBy: {
            ctgrySbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.ctgrySbcrMpng.count({
          where,
        }),
      ]);

      return prismaResponse(
        true,
        {
          list: list.map((item, index) => ({
            ...item,
            totalCnt,
            rowNo: skip + index + 1,
          })),
          totalCnt,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 구독 번호와 카테고리 번호로 카테고리 구독 조회
   * @param sbcrNo 구독 번호
   * @param ctgryNo 카테고리 번호
   */
  async getCategorySubscribeBySbcrNoAndCtgryNo(sbcrNo: number, ctgryNo: number): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    try {
      const subscribe = await this.prisma.ctgrySbcrMpng.findUnique({
        where: {
          sbcrNo_ctgryNo: {
            sbcrNo,
            ctgryNo,
          },
        },
        include: {
          category: {
            select: {
              ctgryNm: true,
            },
          },
        },
      });

      return prismaResponse(
        true,
        subscribe
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(
    userNo: number,
    createData: CreateCategorySubscribeDto
  ): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    try {
      const { ctgryNo, sbcrNo, } = createData;

      const createSubscribe = await this.prisma.ctgrySbcrMpng.create({
        data: {
          sbcrNo,
          ctgryNo,
          useYn: 'Y',
          delYn: 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          category: {
            select: {
              ctgryNm: true,
            },
          },
        },
      });

      return prismaResponse(
        true,
        createSubscribe
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(
    userNo: number,
    createData: CreateCategorySubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { ctgryNoList, sbcrNo, } = createData;

      const subscribeList = await this.prisma.$transaction(ctgryNoList.map((ctgryNo) =>
        this.prisma.ctgrySbcrMpng.upsert({
          where: {
            sbcrNo_ctgryNo: {
              sbcrNo,
              ctgryNo,
            },
          },
          create: {
            sbcrNo,
            ctgryNo,
            useYn: 'Y',
            delYn: 'N',
            crtNo: userNo,
            crtDt: timeToString(),
            updtNo: userNo,
            updtDt: timeToString(),
          },
          update: {
            useYn: 'Y',
            delYn: 'N',
            updtNo: userNo,
            updtDt: timeToString(),
          },
          select: {
            ctgrySbcrNo: true,
          },
        })));

      return prismaResponse(
        true,
        {
          successCnt: subscribeList.length,
          failCnt: ctgryNoList.length - subscribeList.length,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async updateCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    try {
      const { ctgrySbcrNo, useYn, delYn, } = updateData;

      const updateSubscribe = await this.prisma.ctgrySbcrMpng.update({
        where: {
          ctgrySbcrNo,
        },
        data: {
          useYn,
          delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          category: {
            select: {
              ctgryNm: true,
            },
          },
        },
      });

      return prismaResponse(
        true,
        updateSubscribe
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async multipleUpdateCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { useYn, delYn, ctgrySbcrNoList, } = updateData;

      const result = await this.prisma.ctgrySbcrMpng.updateMany({
        where: {
          ctgrySbcrNo: {
            in: ctgrySbcrNoList,
          },
        },
        data: {
          useYn,
          delYn: delYn || 'N',
          updtNo: userNo,
          updtDt: timeToString(),
          ...(delYn && {
            delYn,
            delNo: userNo,
            delDt: timeToString(),
          }),
        },
      });

      return prismaResponse(
        true,
        {
          successCnt: result.count,
          failCnt: ctgrySbcrNoList.length - result.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  async deleteCategorySubscribe(
    userNo: number,
    ctgrySbcrNo: number
  ): Promise<RepoResponseType<boolean> | null> {
    try {
      const result = await this.prisma.ctgrySbcrMpng.updateMany({
        where: {
          ctgrySbcrNo,
          useYn: 'Y',
          delYn: 'N',
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

      return prismaResponse(
        true,
        !!result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 목록 삭제 데이터
   */
  async multipleDeleteCategorySubscribe(
    userNo: number,
    updateData: DeleteCategorySubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { ctgrySbcrNoList, } = updateData;

      const result = await this.prisma.ctgrySbcrMpng.updateManyAndReturn({
        where: {
          ctgrySbcrNo: {
            in: ctgrySbcrNoList,
          },
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
          ctgrySbcrNo: true,
        },
      });

      const failNoList = ctgrySbcrNoList.filter((item) => !result.some((resultItem) => resultItem.ctgrySbcrNo === item));

      return prismaResponse(
        true,
        {
          successCnt: result.length,
          failCnt: ctgrySbcrNoList.length - result.length,
          failNoList,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
