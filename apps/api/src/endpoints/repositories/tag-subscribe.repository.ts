import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreateTagSubscribeDto, DeleteTagSubscribeDto, SearchTagSubscribeDto, UpdateTagSubscribeDto } from '@/dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectTagSbcrMpngListItemType,
  SelectTagSbcrMpngType
} from '@/endpoints/prisma/types/tag-subscribe.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class TagSubscribeRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 태그 구독 전체 이력 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        delYn: delYn || 'N',
        ...(srchKywd && srchType === 'tagNm') && {
          tag: {
            is: {
              tagNm: {
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
      };
      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.tagSbcrMpng.findMany({
          where,
          include: {
            tag: {
              select: {
                tagNm: true,
              },
            },
          },
          orderBy: {
            tagSbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.tagSbcrMpng.count({ where, }),
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
   * @description 태그 구독 번호로 태그 구독 조회
   * @param tagSbcrNo 태그 구독 번호
   */
  async getTagSubscribeByTagSbcrNo(tagSbcrNo: number): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    try {
      const subscribe = await this.prisma.tagSbcrMpng.findUnique({
        where: {
          tagSbcrNo,
        },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
      });

      return prismaResponse(true, subscribe);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 구독 태그 목록 조회
   * @param sbcrNo 구독 번호
   */
  async getTagSubscribeItemListBySbcrNo(sbcrNo: number): Promise<RepoResponseType<SelectTagSbcrMpngType[]> | null> {
    try {
      const itemList = await this.prisma.tagSbcrMpng.findMany({
        where: {
          sbcrNo,
          delYn: 'N',
          tag: {
            is: {
              delYn: 'N',
            },
          },
        },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
        orderBy: {
          tagNo: 'asc',
        },
      });

      return prismaResponse(true, itemList);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(
    userNo: number,
    searchData: SearchTagSubscribeDto
  ): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
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
        ...(srchKywd && srchType === 'tagNm') && {
          tag: {
            is: {
              tagNm: {
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
      };
      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.tagSbcrMpng.findMany({
          where,
          include: {
            tag: {
              select: {
                tagNm: true,
              },
            },
          },
          orderBy: {
            tagSbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.tagSbcrMpng.count({ where, }),
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
   * @description 태그 구독 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(
    tagNo: number,
    searchData: SearchTagSubscribeDto
  ): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        tagNo,
        delYn: delYn || 'N',
        ...(srchKywd && srchType === 'tagNm') && {
          tag: {
            is: {
              tagNm: {
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
      };
      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.tagSbcrMpng.findMany({
          where,
          include: {
            tag: {
              select: {
                tagNm: true,
              },
            },
          },
          orderBy: {
            tagSbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.tagSbcrMpng.count({ where, }),
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
   * @description 구독 번호와 태그 번호로 태그 구독 조회
   * @param sbcrNo 구독 번호
   * @param tagNo 태그 번호
   */
  async getTagSubscribeBySbcrNoAndTagNo(sbcrNo: number, tagNo: number): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    try {
      const subscribe = await this.prisma.tagSbcrMpng.findUnique({
        where: {
          sbcrNo_tagNo: {
            sbcrNo,
            tagNo,
          },
        },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
      });

      return prismaResponse(true, subscribe);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    try {
      const { tagNo, sbcrNo, } = createData;

      const createSubscribe = await this.prisma.tagSbcrMpng.create({
        data: {
          sbcrNo,
          tagNo,
          useYn: 'Y',
          delYn: 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
      });

      return prismaResponse(true, createSubscribe);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { tagNoList, sbcrNo, } = createData;

      const subscribeList = await this.prisma.$transaction(tagNoList.map((tagNo) =>
        this.prisma.tagSbcrMpng.upsert({
          where: {
            sbcrNo_tagNo: {
              sbcrNo,
              tagNo,
            },
          },
          create: {
            sbcrNo,
            tagNo,
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
            tagSbcrNo: true,
          },
        })));

      return prismaResponse(true, {
        successCnt: subscribeList.length,
        failCnt: tagNoList.length - subscribeList.length,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async updateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    try {
      const { tagSbcrNo, useYn, delYn, } = updateData;

      const updateSubscribe = await this.prisma.tagSbcrMpng.update({
        where: {
          tagSbcrNo,
        },
        data: {
          useYn,
          delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
      });

      return prismaResponse(true, updateSubscribe);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async multipleUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { useYn, delYn, tagSbcrNoList, sbcrNo, } = updateData;

      const result = await this.prisma.tagSbcrMpng.updateMany({
        where: {
          sbcrNo,
          tagSbcrNo: {
            in: tagSbcrNoList,
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

      return prismaResponse(true, {
        successCnt: result.count,
        failCnt: tagSbcrNoList.length - result.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   */
  async deleteTagSubscribe(
    userNo: number,
    tagSbcrNo: number
  ): Promise<RepoResponseType<boolean> | null> {
    try {
      const result = await this.prisma.tagSbcrMpng.updateMany({
        where: {
          tagSbcrNo,
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

      return prismaResponse(true, !!result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 목록 삭제 데이터
   */
  async multipleDeleteTagSubscribe(
    userNo: number,
    updateData: DeleteTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { tagSbcrNoList, } = updateData;

      const result = await this.prisma.tagSbcrMpng.updateManyAndReturn({
        where: {
          tagSbcrNo: {
            in: tagSbcrNoList,
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
          tagSbcrNo: true,
        },
      });

      const failNoList = tagSbcrNoList.filter((item) => !result.some((resultItem) => resultItem.tagSbcrNo === item));

      return prismaResponse(true, {
        successCnt: result.length,
        failCnt: tagSbcrNoList.length - result.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
