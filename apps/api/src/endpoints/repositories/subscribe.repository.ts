import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { AnalyzeStatDto } from '@/dto/common.dto';
import { UpdateSubscribeDto, CreateSubscribeDto, SearchSubscribeDto } from '@/dto/subscribe.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserSbcrInfoType,
  SelectUserSbcrInfoListItemType,
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from '@/endpoints/prisma/types/subscribe.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class SubscribeRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ========================================================
  // 구독 설정 통계 관련 메서드
  // ========================================================

  /**
   * @description 구독 설정 분석 통계 (6개 지표 통합)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAnalyzeSubscribeData(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AnalyzeSubscribeStatItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeSubscribeStatItemType[]>`
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          -- 구독 생성/삭제 통계
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."crtDt" >= ${startDt}
              AND usi."crtDt" <= ${endDt}
          ) as "newSubscriptionCount",
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."delDt" >= ${startDt}
              AND usi."delDt" <= ${endDt}
              AND usi."delYn" = 'Y'
          ) as "deleteSubscriptionCount",
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."useYn" = 'Y'
              AND usi."delYn" = 'N'
          ) as "activeSubscriptionCount",
          -- 알림 설정별 통계
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."emlNtfyYn" = 'Y'
              AND usi."useYn" = 'Y'
              AND usi."delYn" = 'N'
          ) as "emailNotificationCount",
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."newPstNtfyYn" = 'Y'
              AND usi."useYn" = 'Y'
              AND usi."delYn" = 'N'
          ) as "newPostNotificationCount",
          (
            SELECT COUNT(*)
            FROM "UserSbcrInfo" usi
            WHERE usi."cmntRplNtfyYn" = 'Y'
              AND usi."useYn" = 'Y'
              AND usi."delYn" = 'N'
          ) as "commentReplyNotificationCount"
      `;

      return prismaResponse(true, analyzeData);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 알림 설정별 분포 통계
   */
  async getSubscribeNotificationDistribution(): Promise<RepoResponseType<SubscribeNotificationDistributionItemType[]> | null> {
    try {
      const distributionData = await this.prisma.$queryRaw<SubscribeNotificationDistributionItemType[]>`
        WITH notification_stats AS (
          SELECT
            'EMAIL' as "notificationType",
            COUNT(CASE WHEN "emlNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN "emlNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as total_count
          FROM "UserSbcrInfo"

          UNION ALL

          SELECT
            'NEW_POST' as "notificationType",
            COUNT(CASE WHEN "newPstNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN "newPstNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as total_count
          FROM "UserSbcrInfo"

          UNION ALL

          SELECT
            'COMMENT_REPLY' as "notificationType",
            COUNT(CASE WHEN "cmntRplNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN "cmntRplNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as total_count
          FROM "UserSbcrInfo"
        )
        SELECT
          "notificationType",
          active_count as "activeCount",
          inactive_count as "inactiveCount",
          total_count as "totalCount",
          CASE
            WHEN total_count > 0 THEN ROUND(active_count::numeric / total_count::numeric, 4)
            ELSE 0
          END as "activeRatio"
        FROM notification_stats
      `;

      return prismaResponse(true, distributionData);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 전체 알림 활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTotalActiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalActiveNotificationUsersItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const activeUsersData = await this.prisma.$queryRaw<TotalActiveNotificationUsersItemType[]>`
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          COUNT(CASE WHEN "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "totalActiveUsers",
          COUNT(CASE WHEN "emlNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "emailActiveUsers",
          COUNT(CASE WHEN "newPstNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "newPostActiveUsers",
          COUNT(CASE WHEN "cmntRplNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "commentReplyActiveUsers",
          COUNT(CASE WHEN "emlNtfyYn" = 'Y' AND "newPstNtfyYn" = 'Y' AND "cmntRplNtfyYn" = 'Y' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "allNotificationsActiveUsers"
        FROM "UserSbcrInfo"
      `;

      return prismaResponse(true, activeUsersData);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 전체 알림 비활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTotalInactiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalInactiveNotificationUsersItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const inactiveUsersData = await this.prisma.$queryRaw<TotalInactiveNotificationUsersItemType[]>`
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          COUNT(CASE WHEN "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "totalInactiveUsers",
          COUNT(CASE WHEN "emlNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "emailInactiveUsers",
          COUNT(CASE WHEN "newPstNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "newPostInactiveUsers",
          COUNT(CASE WHEN "cmntRplNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "commentReplyInactiveUsers",
          COUNT(CASE WHEN "emlNtfyYn" = 'N' AND "newPstNtfyYn" = 'N' AND "cmntRplNtfyYn" = 'N' AND "useYn" = 'Y' AND "delYn" = 'N' THEN 1 END) as "allNotificationsInactiveUsers"
        FROM "UserSbcrInfo"
      `;

      return prismaResponse(true, inactiveUsersData);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  // ========================================================
  // 기존 구독 설정 관리 메서드
  // ========================================================

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
      const { page, strtRow, endRow, srchType, srchKywd, delYn, orderBy, crtDtFrom, crtDtTo, useYn, emlNtfyYn, newPstNtfyYn, cmntRplNtfyYn, } = searchData;

      const where = {
        ...(delYn && { delYn, }),
        ...(useYn && { useYn, }),
        ...(emlNtfyYn && { emlNtfyYn, }),
        ...(newPstNtfyYn && { newPstNtfyYn, }),
        ...(cmntRplNtfyYn && { cmntRplNtfyYn, }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
          },
        }),
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
            ...(orderBy === 'SBSCR_LATEST') && {
              sbcrNo: 'desc',
            },
            ...(orderBy === 'SBSCR_OLDEST') && {
              sbcrNo: 'asc',
            },
            ...(orderBy === 'USER_NAME_ASC') && {
              userNm: 'asc',
            },
            ...(orderBy === 'USER_NAME_DESC') && {
              userNm: 'desc',
            },
            ...(orderBy === 'EMAIL_ASC') && {
              emlAddr: 'asc',
            },
            ...(orderBy === 'EMAIL_DESC') && {
              emlAddr: 'desc',
            },
          },
          skip,
          take,
        }),
        this.prisma.userSbcrInfo.count({
          where,
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
