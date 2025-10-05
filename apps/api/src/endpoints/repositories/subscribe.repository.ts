import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UpdateSubscribeDto, CreateSubscribeDto, SearchSubscribeDto } from '@/dto/subscribe.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserSbcrInfoType, SelectUserSbcrInfoListItemType } from '@/endpoints/prisma/types/subscribe.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class SubscribeRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 사용자 구독 정보 조회 (include 사용)
   * @param userNo 사용자 번호
   */
  async getUserSubscribeByUserNo(userNo: number): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    try {
      const subscribe = await this.prisma.userSbcrInfo.findUnique({
        where: {
          userNo,
        },
        include: {
          user: {
            select: {
              userNm: true,
              emlAddr: true,
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
   * @description 사용자 구독 정보 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async updateUserSubscribe(
    userNo: number,
    updateData: UpdateSubscribeDto
  ): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    try {
      const updateSubscribe = await this.prisma.userSbcrInfo.update({
        where: {
          userNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          user: {
            select: {
              userNm: true,
              emlAddr: true,
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

  // ===== 관리자 구독 설정 관련 메서드 =====

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   * @param searchData 검색 조건
   */
  async getSubscribeList(searchData: SearchSubscribeDto): Promise<RepoResponseType<ListType<SelectUserSbcrInfoListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        delYn: delYn || 'N',
        ...(srchKywd && (srchType === 'userNm') && {
          user: {
            is: {
              userNm: {
                contains: srchKywd,
              },
            },
          },
        }),
        ...(srchKywd && (srchType === 'emlAddr') && {
          user: {
            is: {
              emlAddr: {
                contains: srchKywd,
              },
            },
          },
        }),
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.userSbcrInfo.findMany({
          where,
          include: {
            user: {
              select: {
                userNm: true,
                emlAddr: true,
              },
            },
          },
          orderBy: {
            sbcrNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.userSbcrInfo.count({
          where,
          orderBy: {
            sbcrNo: 'desc',
          },
        }),
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
   * @description 관리자가 사용자 구독 설정 생성
   * @param adminNo 관리자 번호
   * @param createData 구독 설정 생성 데이터
   */
  async createUserSubscribe(
    adminNo: number,
    createData: CreateSubscribeDto
  ): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    try {
      const result = await this.prisma.userSbcrInfo.create({
        data: {
          userNo: createData.userNo,
          emlNtfyYn: createData.emlNtfyYn,
          newPstNtfyYn: createData.newPstNtfyYn,
          cmntRplNtfyYn: createData.cmntRplNtfyYn,
          useYn: 'Y',
          delYn: 'N',
          crtNo: adminNo,
          crtDt: timeToString(),
        },
        include: {
          user: {
            select: {
              userNm: true,
              emlAddr: true,
            },
          },
        },
      });

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 관리자가 다수 사용자 구독 설정 일괄 수정
   * @param adminNo 관리자 번호
   * @param updateData 구독 설정 일괄 수정 데이터
   */
  async multipleUpdateUserSubscribe(
    adminNo: number,
    updateData: UpdateSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const { sbcrNoList, ...updateDataWithoutUserNoList } = updateData;

      if (!sbcrNoList || sbcrNoList.length === 0) {
        return null;
      }

      const result = await this.prisma.userSbcrInfo.updateManyAndReturn({
        where: {
          sbcrNo: {
            in: sbcrNoList,
          },
        },
        data: {
          ...updateDataWithoutUserNoList,
          updtNo: adminNo,
          updtDt: timeToString(),
        },
        select: {
          sbcrNo: true,
        },
      });

      const failNoList = sbcrNoList
        .filter((item) => !result.some((resultItem) => resultItem.sbcrNo === item));

      return prismaResponse(true, {
        successCnt: result.length,
        failCnt: failNoList.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 관리자가 사용자 구독 설정 삭제
   * @param adminNo 관리자 번호
   * @param sbcrNo 구독 번호
   */
  async deleteUserSubscribe(
    adminNo: number,
    sbcrNo: number
  ): Promise<RepoResponseType<boolean> | null> {
    try {
      const result = await this.prisma.userSbcrInfo.update({
        where: {
          sbcrNo,
        },
        data: {
          useYn: 'N',
          updtNo: adminNo,
          updtDt: timeToString(),
          delYn: 'Y',
          delNo: adminNo,
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
   * @description 관리자가 다수 사용자 구독 설정 일괄 삭제
   * @param adminNo 관리자 번호
   * @param sbcrNoList 구독 번호 목록
   */
  async multipleDeleteUserSubscribe(
    adminNo: number,
    sbcrNoList: number[]
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      if (!sbcrNoList || sbcrNoList.length === 0) {
        return null;
      }

      const result = await this.prisma.userSbcrInfo.updateManyAndReturn({
        where: {
          sbcrNo: {
            in: sbcrNoList,
          },
        },
        data: {
          useYn: 'N',
          updtNo: adminNo,
          updtDt: timeToString(),
          delYn: 'Y',
          delNo: adminNo,
          delDt: timeToString(),
        },
        select: {
          sbcrNo: true,
        },
      });

      const failNoList = sbcrNoList
        .filter((item) => !result.some((resultItem) => resultItem.sbcrNo === item));

      return prismaResponse(true, {
        successCnt: result.length,
        failCnt: failNoList.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
