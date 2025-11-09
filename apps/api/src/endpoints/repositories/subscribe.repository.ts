import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, type Prisma } from '@nihilog/db';
import type { ListType, MultipleResultType, RepoResponseType } from '@nihilog/schemas';
import type {
  SelectUserSbcrInfoType,
  SelectUserSbcrInfoListItemType,
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from '@nihilog/schemas';

import type { AnalyzeStatDto } from '@/dto/common.dto';
import { UpdateSubscribeDto, CreateSubscribeDto, SearchSubscribeDto } from '@/dto/subscribe.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
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
   * @description 구독 설정 분석 통계 (6개 지표 통합) - 최적화된 버전
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAnalyzeSubscribeData(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AnalyzeSubscribeStatItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeSubscribeStatItemType[]>`
        WITH subscription_stats AS (
          SELECT
            COUNT(CASE WHEN crt_dt::timestamptz >= ${startDt}::timestamptz
                          AND crt_dt::timestamptz <= ${endDt}::timestamptz
                     THEN 1 END) as new_subscription_count,
            COUNT(CASE WHEN del_dt::timestamptz >= ${startDt}::timestamptz
                          AND del_dt::timestamptz <= ${endDt}::timestamptz
                          AND del_yn = 'Y'
                     THEN 1 END) as delete_subscription_count,
            COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N'
                     THEN 1 END) as active_subscription_count,
            COUNT(CASE WHEN eml_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N'
                     THEN 1 END) as email_notification_count,
            COUNT(CASE WHEN new_pst_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N'
                     THEN 1 END) as new_post_notification_count,
            COUNT(CASE WHEN cmnt_rpl_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N'
                     THEN 1 END) as comment_reply_notification_count
          FROM user_sbcr_info
        )
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          new_subscription_count as "newSubscriptionCount",
          delete_subscription_count as "deleteSubscriptionCount",
          active_subscription_count as "activeSubscriptionCount",
          email_notification_count as "emailNotificationCount",
          new_post_notification_count as "newPostNotificationCount",
          comment_reply_notification_count as "commentReplyNotificationCount"
        FROM subscription_stats
      `;

      return prismaResponse(
        true,
        analyzeData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 알림 설정별 분포 통계 (최적화된 버전)
   */
  async getSubscribeNotificationDistribution(): Promise<RepoResponseType<SubscribeNotificationDistributionItemType[]> | null> {
    try {
      const distributionData = await this.prisma.$queryRaw<SubscribeNotificationDistributionItemType[]>`
        WITH notification_stats AS (
          SELECT
            'EMAIL' as "notificationType",
            COUNT(CASE WHEN eml_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN eml_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as total_count
          FROM user_sbcr_info

          UNION ALL

          SELECT
            'NEW_POST' as "notificationType",
            COUNT(CASE WHEN new_pst_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN new_pst_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as total_count
          FROM user_sbcr_info

          UNION ALL

          SELECT
            'COMMENT_REPLY' as "notificationType",
            COUNT(CASE WHEN cmnt_rpl_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as active_count,
            COUNT(CASE WHEN cmnt_rpl_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as inactive_count,
            COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as total_count
          FROM user_sbcr_info
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

      return prismaResponse(
        true,
        distributionData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 전체 알림 활성 사용자 수 통계 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTotalActiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalActiveNotificationUsersItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const activeUsersData = await this.prisma.$queryRaw<TotalActiveNotificationUsersItemType[]>`
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "totalActiveUsers",
          COUNT(CASE WHEN eml_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "emailActiveUsers",
          COUNT(CASE WHEN new_pst_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "newPostActiveUsers",
          COUNT(CASE WHEN cmnt_rpl_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "commentReplyActiveUsers",
          COUNT(CASE WHEN eml_ntfy_yn = 'Y' AND new_pst_ntfy_yn = 'Y' AND cmnt_rpl_ntfy_yn = 'Y' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "allNotificationsActiveUsers"
        FROM user_sbcr_info
      `;

      return prismaResponse(
        true,
        activeUsersData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 전체 알림 비활성 사용자 수 통계 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTotalInactiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalInactiveNotificationUsersItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const inactiveUsersData = await this.prisma.$queryRaw<TotalInactiveNotificationUsersItemType[]>`
        SELECT
          ${startDt} as "dateStart",
          ${endDt} as "dateEnd",
          COUNT(CASE WHEN use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "totalInactiveUsers",
          COUNT(CASE WHEN eml_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "emailInactiveUsers",
          COUNT(CASE WHEN new_pst_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "newPostInactiveUsers",
          COUNT(CASE WHEN cmnt_rpl_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "commentReplyInactiveUsers",
          COUNT(CASE WHEN eml_ntfy_yn = 'N' AND new_pst_ntfy_yn = 'N' AND cmnt_rpl_ntfy_yn = 'N' AND use_yn = 'Y' AND del_yn = 'N' THEN 1 END) as "allNotificationsInactiveUsers"
        FROM user_sbcr_info
      `;

      return prismaResponse(
        true,
        inactiveUsersData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        subscribe
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        updateSubscribe
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        {
          successCnt: result.length,
          failCnt: failNoList.length,
          failNoList,
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        !!result
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
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

      return prismaResponse(
        true,
        {
          successCnt: result.length,
          failCnt: failNoList.length,
          failNoList,
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
