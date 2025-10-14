import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateAdminDto } from '@/dto/admin.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { UpdateUserDto, type SearchUserDto } from '@/dto/user.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserInfoListItemType,
  SelectUserInfoType,
  AnalyzeUserStatItemType,
  ActiveUserAnalysisItemType,
  TopUsersByContributionItemType,
  TopUsersByPostCountItemType,
  TopUsersByCommentCountItemType,
  UserRoleDistributionItemType,
  UserStatusDistributionItemType,
  InactiveUsersListItemType,
  UserGrowthRateItemType,
  UserRetentionRateItemType
} from '@/endpoints/prisma/types/user.types';
import { createDateSeries } from '@/utils/createDateSeries';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ========================================================
  // 사용자 통계 관련 메서드
  // ========================================================

  /**
   * @description 사용자 분석 통계 (9개 지표 통합) - 최적화된 버전
   * @param analyzeStatData 분석 통계 데이터
   * @param userNo 사용자 번호 (선택사항)
   */
  async getAnalyzeUserData(
    analyzeStatData: AnalyzeStatDto,
    userNo?: number
  ): Promise<RepoResponseType<AnalyzeUserStatItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeUserStatItemType[]>`
        WITH date_series AS ${createDateSeries(startDt, endDt, mode)},

        -- 모든 통계를 하나의 CTE로 통합
        all_stats AS (
          SELECT
            date_trunc(${mode}, u.crt_dt::timestamptz) AS stat_date,
            'new_user' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.user_info u
          WHERE ${userNo
            ? Prisma.sql`u.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND u.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND u.crt_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, u.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, u.del_dt::timestamptz) AS stat_date,
            'delete_user' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.user_info u
          WHERE ${userNo
            ? Prisma.sql`u.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND u.del_dt::timestamptz >= ${startDt}::timestamptz
            AND u.del_dt::timestamptz < ${endDt}::timestamptz
            AND u.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, u.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, u.last_lgn_dt::timestamptz) AS stat_date,
            'login' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.user_info u
          WHERE ${userNo
            ? Prisma.sql`u.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND u.last_lgn_dt::timestamptz >= ${startDt}::timestamptz
            AND u.last_lgn_dt::timestamptz < ${endDt}::timestamptz
            AND u.use_yn = 'Y' AND u.del_yn = 'N'
          GROUP BY date_trunc(${mode}, u.last_lgn_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, p.crt_dt::timestamptz) AS stat_date,
            'post_write' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_info p
          WHERE ${userNo
            ? Prisma.sql`p.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND p.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND p.crt_dt::timestamptz < ${endDt}::timestamptz
            AND p.use_yn = 'Y' AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, p.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'comment_write' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.cmnt_info c
          WHERE ${userNo
            ? Prisma.sql`c.crt_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.use_yn = 'Y' AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, bm.crt_dt::timestamptz) AS stat_date,
            'bookmark_add' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_bkmrk_mpng bm
          WHERE ${userNo
            ? Prisma.sql`bm.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND bm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND bm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND bm.use_yn = 'Y' AND bm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, bm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, tsm.crt_dt::timestamptz) AS stat_date,
            'tag_subscribe' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.tag_sbcr_mpng tsm
          INNER JOIN nihilog.user_sbcr_info usi ON usi.sbcr_no = tsm.sbcr_no
          WHERE ${userNo
            ? Prisma.sql`usi.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND tsm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND tsm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND tsm.use_yn = 'Y' AND tsm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, tsm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, csm.crt_dt::timestamptz) AS stat_date,
            'category_subscribe' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.ctgry_sbcr_mpng csm
          INNER JOIN nihilog.user_sbcr_info usi ON usi.sbcr_no = csm.sbcr_no
          WHERE ${userNo
            ? Prisma.sql`usi.user_no = ${userNo}`
            : Prisma.sql`TRUE`}
            AND csm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND csm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND csm.use_yn = 'Y' AND csm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, csm.crt_dt::timestamptz)
        )

        SELECT
          ds.date_start AS "dateStart",
          ds.date_end AS "dateEnd",
          COALESCE(SUM(CASE WHEN as.stat_type = 'new_user' THEN as.stat_count ELSE 0 END), 0) AS "newUserCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'delete_user' THEN as.stat_count ELSE 0 END), 0) AS "deleteUserCount",
          0 AS "activeUserCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'login' THEN as.stat_count ELSE 0 END), 0) AS "loginCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'post_write' THEN as.stat_count ELSE 0 END), 0) AS "postWriteCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'comment_write' THEN as.stat_count ELSE 0 END), 0) AS "commentWriteCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'bookmark_add' THEN as.stat_count ELSE 0 END), 0) AS "bookmarkAddCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'tag_subscribe' THEN as.stat_count ELSE 0 END), 0) AS "tagSubscribeCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'category_subscribe' THEN as.stat_count ELSE 0 END), 0) AS "categorySubscribeCount"
        FROM date_series ds
        LEFT JOIN all_stats as ON as.stat_date = ds.date_start
        GROUP BY ds.date_start, ds.date_end
        ORDER BY ds.date_start
      `;

      return prismaResponse(true, analyzeData);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 활성 사용자 분석
   * @param analyzeStatData 분석 통계 데이터
   */
  async getActiveUserAnalysis(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<ActiveUserAnalysisItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<ActiveUserAnalysisItemType[]>`
        WITH active_users_7d AS (
          SELECT COUNT(*) as active_count
          FROM nihilog.user_info
          WHERE last_lgn_dt::timestamptz >= (${startDt}::timestamptz - INTERVAL '7 days')
            AND last_lgn_dt::timestamptz <= ${endDt}::timestamptz
            AND use_yn = 'Y' AND del_yn = 'N'
        ),
        active_users_30d AS (
          SELECT COUNT(*) as active_count
          FROM nihilog.user_info
          WHERE last_lgn_dt::timestamptz >= (${startDt}::timestamptz - INTERVAL '30 days')
            AND last_lgn_dt::timestamptz <= ${endDt}::timestamptz
            AND use_yn = 'Y' AND del_yn = 'N'
        ),
        total_users AS (
          SELECT COUNT(*) as total_count
          FROM nihilog.user_info
          WHERE use_yn = 'Y' AND del_yn = 'N'
        )
        SELECT
          '7일' as period,
          au7.active_count as "activeUserCount",
          tu.total_count as "totalUserCount",
          CASE
            WHEN tu.total_count > 0
            THEN ROUND(au7.active_count::decimal / tu.total_count, 4)
            ELSE 0
          END as "activeUserRatio"
        FROM active_users_7d au7, total_users tu

        UNION ALL

        SELECT
          '30일' as period,
          au30.active_count as "activeUserCount",
          tu.total_count as "totalUserCount",
          CASE
            WHEN tu.total_count > 0
            THEN ROUND(au30.active_count::decimal / tu.total_count, 4)
            ELSE 0
          END as "activeUserRatio"
        FROM active_users_30d au30, total_users tu
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자별 기여도 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByContribution(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByContributionItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopUsersByContributionItemType[]>`
        WITH user_contributions AS (
          SELECT
            u.user_no,
            u.user_nm,
            u.eml_addr,
            COALESCE(p.post_count, 0) as post_count,
            COALESCE(c.comment_count, 0) as comment_count,
            COALESCE(bm.bookmark_count, 0) as bookmark_count,
            GREATEST(
              COALESCE(p.last_post_date, '1900-01-01'::timestamp),
              COALESCE(c.last_comment_date, '1900-01-01'::timestamp),
              COALESCE(bm.last_bookmark_date, '1900-01-01'::timestamp)
            ) as last_activity_date
          FROM nihilog.user_info u
          LEFT JOIN (
            SELECT
              user_no,
              COUNT(*) as post_count,
              MAX(crt_dt) as last_post_date
            FROM nihilog.pst_info
            WHERE use_yn = 'Y' AND del_yn = 'N'
              ${analyzeStatData
                ? Prisma.sql`AND crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz AND crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz`
                : Prisma.empty}
            GROUP BY user_no
          ) p ON p.user_no = u.user_no
          LEFT JOIN (
            SELECT
              crt_no as user_no,
              COUNT(*) as comment_count,
              MAX(crt_dt) as last_comment_date
            FROM nihilog.cmnt_info
            WHERE use_yn = 'Y' AND del_yn = 'N'
              ${analyzeStatData
                ? Prisma.sql`AND crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz AND crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz`
                : Prisma.empty}
            GROUP BY crt_no
          ) c ON c.user_no = u.user_no
          LEFT JOIN (
            SELECT
              user_no,
              COUNT(*) as bookmark_count,
              MAX(crt_dt) as last_bookmark_date
            FROM nihilog.pst_bkmrk_mpng
            WHERE use_yn = 'Y' AND del_yn = 'N'
              ${analyzeStatData
                ? Prisma.sql`AND crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz AND crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz`
                : Prisma.empty}
            GROUP BY user_no
          ) bm ON bm.user_no = u.user_no
          WHERE u.use_yn = 'Y' AND u.del_yn = 'N'
        )
        SELECT
          user_no AS "userNo",
          user_nm AS "userName",
          eml_addr AS "emailAddress",
          (post_count * 3 + comment_count * 2 + bookmark_count) AS "contributionIndex",
          post_count AS "postCount",
          comment_count AS "commentCount",
          bookmark_count AS "bookmarkCount",
          last_activity_date AS "lastActivityDate"
        FROM user_contributions
        ORDER BY "contributionIndex" DESC
        LIMIT ${limit}
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자별 게시글 작성 수 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByPostCount(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByPostCountItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopUsersByPostCountItemType[]>`
        SELECT
          u.user_no AS "userNo",
          u.user_nm AS "userName",
          u.eml_addr AS "emailAddress",
          COUNT(p.pst_no) AS "postCount",
          MAX(p.crt_dt) AS "lastPostDate"
        FROM nihilog.user_info u
        INNER JOIN nihilog.pst_info p ON u.user_no = p.user_no
        WHERE u.use_yn = 'Y' AND u.del_yn = 'N'
          AND p.use_yn = 'Y' AND p.del_yn = 'N'
          ${analyzeStatData
            ? Prisma.sql`AND p.crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz AND p.crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz`
            : Prisma.empty}
        GROUP BY u.user_no, u.user_nm, u.eml_addr
        ORDER BY COUNT(p.pst_no) DESC
        LIMIT ${limit}
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자별 댓글 작성 수 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByCommentCount(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByCommentCountItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopUsersByCommentCountItemType[]>`
        SELECT
          u.user_no AS "userNo",
          u.user_nm AS "userName",
          u.eml_addr AS "emailAddress",
          COUNT(c.cmnt_no) AS "commentCount",
          MAX(c.crt_dt) AS "lastCommentDate"
        FROM nihilog.user_info u
        INNER JOIN nihilog.cmnt_info c ON u.user_no = c.crt_no
        WHERE u.use_yn = 'Y' AND u.del_yn = 'N'
          AND c.use_yn = 'Y' AND c.del_yn = 'N'
          ${analyzeStatData
            ? Prisma.sql`AND c.crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz AND c.crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz`
            : Prisma.empty}
        GROUP BY u.user_no, u.user_nm, u.eml_addr
        ORDER BY COUNT(c.cmnt_no) DESC
        LIMIT ${limit}
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 역할별 사용자 분포
   */
  async getUserRoleDistribution(): Promise<RepoResponseType<UserRoleDistributionItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<UserRoleDistributionItemType[]>`
        WITH role_counts AS (
          SELECT
            user_role AS role,
            COUNT(*) AS count
          FROM nihilog.user_info
          WHERE del_yn = 'N'
          GROUP BY user_role
        ),
        total_count AS (
          SELECT SUM(count) AS total FROM role_counts
        )
        SELECT
          rc.role,
          rc.count,
          CASE
            WHEN tc.total > 0
            THEN ROUND((rc.count::DECIMAL / tc.total), 4)
            ELSE 0
          END AS ratio
        FROM role_counts rc
        CROSS JOIN total_count tc
        ORDER BY rc.count DESC
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 상태별 사용자 분포
   */
  async getUserStatusDistribution(): Promise<RepoResponseType<UserStatusDistributionItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<UserStatusDistributionItemType[]>`
        WITH status_counts AS (
          SELECT
            CASE
              WHEN use_yn = 'Y' AND del_yn = 'N' THEN 'ACTIVE'
              WHEN use_yn = 'N' AND del_yn = 'N' THEN 'INACTIVE'
              WHEN del_yn = 'Y' THEN 'DELETED'
            END AS status,
            COUNT(*) AS count
          FROM nihilog.user_info
          GROUP BY
            CASE
              WHEN use_yn = 'Y' AND del_yn = 'N' THEN 'ACTIVE'
              WHEN use_yn = 'N' AND del_yn = 'N' THEN 'INACTIVE'
              WHEN del_yn = 'Y' THEN 'DELETED'
            END
        ),
        total_count AS (
          SELECT SUM(count) AS total FROM status_counts
        )
        SELECT
          sc.status,
          sc.count,
          CASE
            WHEN tc.total > 0
            THEN ROUND((sc.count::DECIMAL / tc.total), 4)
            ELSE 0
          END AS ratio
        FROM status_counts sc
        CROSS JOIN total_count tc
        ORDER BY sc.count DESC
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 비활성 사용자 목록
   * @param daysThreshold 비활성 기준 일수
   */
  async getInactiveUsersList(daysThreshold: number = 30): Promise<RepoResponseType<InactiveUsersListItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<InactiveUsersListItemType[]>`
        SELECT
          u.user_no AS "userNo",
          u.user_nm AS "userName",
          u.eml_addr AS "emailAddress",
          COALESCE(u.last_lgn_dt, u.crt_dt) AS "lastLoginDate",
          EXTRACT(DAYS FROM (NOW() - COALESCE(u.last_lgn_dt, u.crt_dt)::timestamp)) AS "daysSinceLastLogin"
        FROM nihilog.user_info u
        WHERE u.use_yn = 'Y' AND u.del_yn = 'N'
          AND (
            u.last_lgn_dt IS NULL
            OR EXTRACT(DAYS FROM (NOW() - u.last_lgn_dt::timestamp)) >= ${daysThreshold}
          )
        ORDER BY "daysSinceLastLogin" DESC
        LIMIT 50
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자 성장률
   * @param analyzeStatData 분석 통계 데이터
   */
  async getUserGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<UserGrowthRateItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<UserGrowthRateItemType[]>`
        WITH previous_period AS (
          SELECT COUNT(*) as user_count
          FROM nihilog.user_info
          WHERE crt_dt::timestamptz < ${startDt}::timestamptz
            AND del_yn = 'N'
        ),
        current_period AS (
          SELECT COUNT(*) as user_count
          FROM nihilog.user_info
          WHERE crt_dt::timestamptz <= ${endDt}::timestamptz
            AND del_yn = 'N'
        )
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN pp.user_count > 0
            THEN ROUND((cp.user_count - pp.user_count)::DECIMAL / pp.user_count, 4)
            ELSE 0
          END AS "growthRate",
          pp.user_count AS "previousUserCount",
          cp.user_count AS "currentUserCount"
        FROM previous_period pp, current_period cp
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자 유지율
   * @param analyzeStatData 분석 통계 데이터
   */
  async getUserRetentionRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<UserRetentionRateItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<UserRetentionRateItemType[]>`
        WITH retention_1m AS (
          SELECT
            COUNT(*) as total_signups,
            COUNT(CASE WHEN last_lgn_dt::timestamptz >= (${endDt}::timestamptz - INTERVAL '1 month') THEN 1 END) as active_users
          FROM nihilog.user_info
          WHERE crt_dt::timestamptz >= ${startDt}::timestamptz
            AND crt_dt::timestamptz <= ${endDt}::timestamptz
            AND del_yn = 'N'
        ),
        retention_3m AS (
          SELECT
            COUNT(*) as total_signups,
            COUNT(CASE WHEN last_lgn_dt::timestamptz >= (${endDt}::timestamptz - INTERVAL '3 months') THEN 1 END) as active_users
          FROM nihilog.user_info
          WHERE crt_dt::timestamptz >= (${startDt}::timestamptz - INTERVAL '2 months')
            AND crt_dt::timestamptz <= ${endDt}::timestamptz
            AND del_yn = 'N'
        ),
        retention_6m AS (
          SELECT
            COUNT(*) as total_signups,
            COUNT(CASE WHEN last_lgn_dt::timestamptz >= (${endDt}::timestamptz - INTERVAL '6 months') THEN 1 END) as active_users
          FROM nihilog.user_info
          WHERE crt_dt::timestamptz >= (${startDt}::timestamptz - INTERVAL '5 months')
            AND crt_dt::timestamptz <= ${endDt}::timestamptz
            AND del_yn = 'N'
        )
        SELECT
          '1개월' as period,
          CASE
            WHEN r1.total_signups > 0
            THEN ROUND(r1.active_users::DECIMAL / r1.total_signups, 4)
            ELSE 0
          END AS "retentionRate",
          r1.total_signups AS "totalSignups",
          r1.active_users AS "activeUsers"
        FROM retention_1m r1

        UNION ALL

        SELECT
          '3개월' as period,
          CASE
            WHEN r3.total_signups > 0
            THEN ROUND(r3.active_users::DECIMAL / r3.total_signups, 4)
            ELSE 0
          END AS "retentionRate",
          r3.total_signups AS "totalSignups",
          r3.active_users AS "activeUsers"
        FROM retention_3m r3

        UNION ALL

        SELECT
          '6개월' as period,
          CASE
            WHEN r6.total_signups > 0
            THEN ROUND(r6.active_users::DECIMAL / r6.total_signups, 4)
            ELSE 0
          END AS "retentionRate",
          r6.total_signups AS "totalSignups",
          r6.active_users AS "activeUsers"
        FROM retention_6m r6
      `;

      return prismaResponse(true, result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  // ========================================================
  // 기존 사용자 관련 메서드
  // ========================================================

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   * @param delYn 삭제 여부
   */
  async getUserByNo(
    userNo: number,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          userNo,
          delYn,
        },
      });

      return prismaResponse(true, user);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
      // return null;
    }
  }

  /**
   * @description 사용자 계정 생성
   * @param userNo 현재 사용자 번호
   * @param signUpData 회원가입 정보
   * @param hashedPassword 해시된 비밀번호
   */
  async createUser(
    userNo: number | null,
    signUpData: CreateUserDto | CreateAdminDto,
    hashedPassword: string
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const currentTime = timeToString();

    delete signUpData.password;

    try {
      const newUser = await this.prisma.userInfo.create({
        data: {
          ...signUpData,
          encptPswd: hashedPassword,
          crtNo: userNo ?? null,
          crtDt: currentTime,
          updtNo: userNo ?? null,
          updtDt: currentTime,
        },
      });

      return prismaResponse(true, newUser);
    }
    catch (error) {
      console.log('createUser', error);
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자 정보 업데이트
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateData 업데이트 데이터
   */
  async updateUser(
    userNo: number,
    targetUserNo: number,
    updateData: UpdateUserDto
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    try {
      const updateUser = await this.prisma.userInfo.update({
        where: {
          userNo: targetUserNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(true, updateUser);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자 소프트 삭제
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async deleteUser(
    userNo: number,
    targetUserNo: number
  ): Promise<RepoResponseType<boolean> | null> {
    const currentTime = timeToString();

    try {
      const result = await this.prisma.userInfo.update({
        where: {
          userNo: targetUserNo,
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          delDt: currentTime,
          delNo: userNo,
          updtDt: currentTime,
          updtNo: userNo,
        },
      });

      return prismaResponse(true, !!result);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자 목록 조회
   * @param searchData 검색 조건
   */
  async getUserList(searchData: SearchUserDto): Promise<RepoResponseType<ListType<SelectUserInfoListItemType>> | null> {
    const { page, strtRow, endRow, srchType, srchKywd, delYn, useYn, userRole, orderBy, lastLgnDtFrom, lastLgnDtTo, crtDtTo, crtDtFrom, } = searchData;

    const where = {
      ...(delYn && {
        delYn,
      }),
      ...(useYn && {
        useYn,
      }),
      ...(userRole && {
        userRole,
      }),
      ...(srchKywd && (srchType === 'userNm') && {
        userNm: {
          contains: srchKywd,
        },
      }),
      ...(srchKywd && (srchType === 'emlAddr') && {
        emlAddr: {
          contains: srchKywd,
        },
      }),
      ...(lastLgnDtFrom && lastLgnDtTo && {
        lastLgnDt: {
          gte: lastLgnDtFrom,
          lte: lastLgnDtTo,
        },
      }),
      ...(crtDtFrom && crtDtTo && {
        crtDt: {
          gte: crtDtFrom,
          lte: crtDtTo,
        },
      }),
    };

    const skip = pageHelper(page, strtRow, endRow).offset;
    const take = pageHelper(page, strtRow, endRow).limit;

    try {
      const [ totalCnt, list, ] = await this.prisma.$transaction([
        this.prisma.userInfo.count({ where, }),
        this.prisma.userInfo.findMany({
          where,
          skip,
          take,
          orderBy: {
            ...(orderBy === 'NAME_ASC') && {
              userNm: 'asc',
            },
            ...(orderBy === 'NAME_DESC') && {
              userNm: 'desc',
            },
            ...(orderBy === 'SUBSCRIBE_LATEST') && {
              crtDt: 'desc',
            },
            ...(orderBy === 'SUBSCRIBE_OLDEST') && {
              crtDt: 'asc',
            },
            ...(orderBy === 'LOGIN_LATEST') && {
              lastLgnDt: 'desc',
            },
            ...(orderBy === 'LOGIN_OLDEST') && {
              lastLgnDt: 'asc',
            },
          },
        }),
      ]);

      return prismaResponse(true, {
        list: list.map((user, index) => ({
          ...user,
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
   * @description 이메일로 사용자 조회
   * @param emlAddr 이메일 주소
   * @param delYn 삭제 여부
   */
  async getUserByEmail(
    emlAddr: string,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          emlAddr,
          delYn,
        },
      });

      return prismaResponse(true, user);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 사용자명으로 사용자 조회
   * @param userNm 사용자명
   * @param delYn 삭제 여부
   */
  async getUserByName(
    userNm: string,
    delYn: 'Y' | 'N' = 'N'
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    try {
      const user = await this.prisma.userInfo.findFirst({
        where: {
          userNm,
          delYn,
        },
      });

      return prismaResponse(true, user);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 관리자가 다수 사용자 일괄 수정
   * @param userNo 현재 사용자 번호
   * @param updateUserDto 사용자 수정 정보 목록
   */
  async adminMultipleUpdateUser(
    userNo: number,
    updateUserDto: UpdateUserDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    const { userNoList, ...restData } = updateUserDto;

    if (!userNoList || userNoList.length === 0) {
      return null;
    }

    try {
      const result = await this.prisma.userInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
          },
        },
        data: {
          ...restData,
          updtNo: userNo,
          updtDt: timeToString(),
          ...(restData.delYn && {
            delYn: restData.delYn,
            delNo: userNo,
            delDt: timeToString(),
          }),
        },
        select: {
          userNo: true,
        },
      });

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.userNo === item));

      return prismaResponse(true, {
        successCnt: result.length,
        failCnt: userNoList.length - result.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param userNo 현재 사용자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(
    userNo: number,
    userNoList: number[]
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    if (!userNoList || userNoList.length === 0) {
      return null;
    }

    try {
      const result = await this.prisma.userInfo.updateManyAndReturn({
        where: {
          userNo: {
            in: userNoList,
          },
        },
        data: {
          useYn: 'N',
          delYn: 'Y',
          delDt: timeToString(),
          delNo: userNo,
          updtDt: timeToString(),
          updtNo: userNo,
        },
        select: {
          userNo: true,
        },
      });

      const failNoList = userNoList
        .filter((item) => !result.some((resultItem) => resultItem.userNo === item));

      return prismaResponse(true, {
        successCnt: result.length,
        failCnt: userNoList.length - result.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
