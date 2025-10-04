import { Inject, Injectable } from '@nestjs/common';

import { UpdateSubscribeDto, CreateSubscribeDto, SearchSubscribeDto } from '@/dto/subscribe.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/schemas/response.schema';
import type { SelectUserSbcrInfoType, SelectUserSbcrInfoListItemType } from '@/endpoints/prisma/types/subscribe.types';
import { pageHelper } from '@/utils/pageHelper';
import { timeToString } from '@/utils/timeHelper';
import { PrismaClient } from '~prisma/client';

@Injectable()
export class SubscribeRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 사용자 구독 정보 조회 (include 사용)
   * @param userNo 사용자 번호
   */
  async getUserSubscribeByUserNo(userNo: number): Promise<SelectUserSbcrInfoType | null> {
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

      return subscribe;
    }
    catch {
      return null;
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
  ): Promise<SelectUserSbcrInfoType | null> {
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

      return updateSubscribe;
    }
    catch {
      return null;
    }
  }

  // ===== 관리자 구독 설정 관련 메서드 =====

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   * @param searchData 검색 조건
   */
  async getSubscribeList(searchData: SearchSubscribeDto): Promise<ListType<SelectUserSbcrInfoListItemType>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where = {
        delYn: delYn || 'N',
        ...(srchKywd && (srchType === 'userNm') && {
          user: {
            userNm: {
              contains: srchKywd,
            },
          },
        }),
        ...(srchKywd && (srchType === 'emlAddr') && {
          user: {
            emlAddr: {
              contains: srchKywd,
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

      return {
        list: list.map((item, index) => ({
          ...item,
          totalCnt,
          rowNo: skip + index + 1,
        })),
        totalCnt,
      };
    }
    catch {
      return {
        list: [],
        totalCnt: 0,
      };
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
  ): Promise<SelectUserSbcrInfoType | null> {
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

      return result;
    }
    catch {
      return null;
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
  ): Promise<MultipleResultType | null> {
    try {
      const { userNoList, ...updateDataWithoutUserNoList } = updateData;

      if (!userNoList || userNoList.length === 0) {
        return null;
      }

      const result = await this.prisma.userSbcrInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
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

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.sbcrNo === item));

      return {
        successCnt: result.length,
        failCnt: failNoList.length,
        failNoList,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 사용자 구독 설정 삭제
   * @param adminNo 관리자 번호
   * @param sbcrNo 구독 번호
   */
  async deleteUserSubscribeBySbcrNo(
    adminNo: number,
    sbcrNo: number
  ): Promise<boolean> {
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

      if (result) {
        return true;
      }

      return false;
    }
    catch {
      return false;
    }
  }

  /**
   * @description 관리자가 다수 사용자 구독 설정 일괄 삭제
   * @param adminNo 관리자 번호
   * @param userNoList 사용자 번호 목록
   */
  async multipleDeleteUserSubscribe(
    adminNo: number,
    userNoList: number[]
  ): Promise<MultipleResultType | null> {
    try {
      if (!userNoList || userNoList.length === 0) {
        return null;
      }

      const result = await this.prisma.userSbcrInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
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

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.sbcrNo === item));

      return {
        successCnt: result.length,
        failCnt: failNoList.length,
        failNoList,
      };
    }
    catch {
      return null;
    }
  }
}
