import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE } from '@nihilog/code';
import { Prisma, type PrismaClient } from '@nihilog/db';
import type {
  SelectCategoryListItemType,
  SelectCategoryType,
  AnalyzeCategoryStatItemType,
  TopPopularCategoryItemType,
  TopCategoriesBySubscriberItemType,
  AverageBookmarkPerCategoryItemType,
  AverageViewPerCategoryItemType,
  CategoryHierarchyDistributionItemType,
  CategoryHierarchyPostDistributionItemType,
  CategoryHierarchySubscriberDistributionItemType,
  CategoryStatusDistributionItemType,
  CategoryCreatorStatItemType,
  UnusedCategoryItemType,
  CategorySubscriberGrowthRateItemType,
  CategoriesWithoutSubscribersItemType
} from '@nihilog/schemas';
import type { ListType, MultipleResultType, RepoResponseType } from '@nihilog/schemas';

import type { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import { createDateSeries } from '@/utils/createDateSeries';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { toNumber } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class CategoryRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ========================================================
  // 카테고리 통계 관련 메서드
  // ========================================================

  /**
   * @description 카테고리 분석 통계 (시간대별 합산) - 11개 지표 통합 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터
   * @param ctgryNo 카테고리 번호 (선택적, 없으면 전체/있으면 해당 카테고리만)
   */
  async getAnalyzeCategoryData(analyzeStatData: AnalyzeStatDto, ctgryNo?: number): Promise<RepoResponseType<AnalyzeCategoryStatItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeCategoryStatItemType[]>`
        WITH date_series AS ${createDateSeries(
          startDt,
          endDt,
          mode
        )},

        -- 모든 통계를 하나의 CTE로 통합
        all_stats AS (
          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'new_category' AS stat_type,
            COUNT(*) AS stat_count
          FROM ctgry_info c
          WHERE ${ctgryNo
            ? Prisma.sql`c.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.del_dt::timestamptz) AS stat_date,
            'delete_category' AS stat_type,
            COUNT(*) AS stat_count
          FROM ctgry_info c
          WHERE ${ctgryNo
            ? Prisma.sql`c.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND c.del_dt::timestamptz >= ${startDt}::timestamptz
            AND c.del_dt::timestamptz < ${endDt}::timestamptz
            AND c.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, c.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, csm.crt_dt::timestamptz) AS stat_date,
            'subscriber_increase' AS stat_type,
            COUNT(*) AS stat_count
          FROM ctgry_sbcr_mpng csm
          WHERE ${ctgryNo
            ? Prisma.sql`csm.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND csm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND csm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND csm.use_yn = 'Y'
            AND csm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, csm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, csm.del_dt::timestamptz) AS stat_date,
            'subscriber_decrease' AS stat_type,
            COUNT(*) AS stat_count
          FROM ctgry_sbcr_mpng csm
          WHERE ${ctgryNo
            ? Prisma.sql`csm.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND csm.del_dt::timestamptz >= ${startDt}::timestamptz
            AND csm.del_dt::timestamptz < ${endDt}::timestamptz
            AND csm.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, csm.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, p.publ_dt::timestamptz) AS stat_date,
            'post_count' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_info p
          WHERE ${ctgryNo
            ? Prisma.sql`p.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND p.publ_dt::timestamptz >= ${startDt}::timestamptz
            AND p.publ_dt::timestamptz < ${endDt}::timestamptz
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, p.publ_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, v.view_dt::timestamptz) AS stat_date,
            'view_count' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_view_log v
          INNER JOIN pst_info p ON p.pst_no = v.pst_no
          WHERE ${ctgryNo
            ? Prisma.sql`p.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND v.view_dt::timestamptz >= ${startDt}::timestamptz
            AND v.view_dt::timestamptz < ${endDt}::timestamptz
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, v.view_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, bm.crt_dt::timestamptz) AS stat_date,
            'bookmark_count' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_bkmrk_mpng bm
          INNER JOIN pst_info p ON p.pst_no = bm.pst_no
          WHERE ${ctgryNo
            ? Prisma.sql`p.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND bm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND bm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND bm.del_yn = 'N'
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, bm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, sl.shrn_dt::timestamptz) AS stat_date,
            'share_count' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_shrn_log sl
          INNER JOIN pst_info p ON p.pst_no = sl.pst_no
          WHERE ${ctgryNo
            ? Prisma.sql`p.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND sl.shrn_dt::timestamptz >= ${startDt}::timestamptz
            AND sl.shrn_dt::timestamptz < ${endDt}::timestamptz
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, sl.shrn_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, cm.crt_dt::timestamptz) AS stat_date,
            'comment_count' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info cm
          INNER JOIN pst_info p ON p.pst_no = cm.pst_no
          WHERE ${ctgryNo
            ? Prisma.sql`p.ctgry_no = ${ctgryNo}`
            : Prisma.sql`TRUE`}
            AND cm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND cm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND cm.del_yn = 'N'
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, cm.crt_dt::timestamptz)
        )

        SELECT
          ds.date_start AS "dateStart",
          ds.date_end AS "dateEnd",
          COALESCE(SUM(CASE WHEN as.stat_type = 'new_category' THEN as.stat_count ELSE 0 END), 0) AS "newCategoryCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'delete_category' THEN as.stat_count ELSE 0 END), 0) AS "deleteCategoryCount",
          0 AS "activeCategoryCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'subscriber_increase' THEN as.stat_count ELSE 0 END), 0) AS "subscriberIncreaseCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'subscriber_decrease' THEN as.stat_count ELSE 0 END), 0) AS "subscriberDecreaseCount",
          0 AS "activeSubscriberCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'post_count' THEN as.stat_count ELSE 0 END), 0) AS "postCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'view_count' THEN as.stat_count ELSE 0 END), 0) AS "viewCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'bookmark_count' THEN as.stat_count ELSE 0 END), 0) AS "bookmarkCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'share_count' THEN as.stat_count ELSE 0 END), 0) AS "shareCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'comment_count' THEN as.stat_count ELSE 0 END), 0) AS "commentCount"
        FROM date_series ds
        LEFT JOIN all_stats as ON as.stat_date = ds.date_start
        GROUP BY ds.date_start, ds.date_end
        ORDER BY ds.date_start
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

  // ========================================================
  // 파생 지표 메서드 (10개)
  // ========================================================

  // 1. 카테고리 인기도 분석 (4개)

  /**
   * @description 카테고리별 인기 지수 TOP N (조회 + 북마크 + 공유 가중치 합산)
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택적)
   */
  async getTopPopularCategoriesByIndex(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopPopularCategoryItemType[]> | null> {
    try {
      let whereClause = Prisma.sql`WHERE c.use_yn = 'Y' AND c.del_yn = 'N'`;

      if (analyzeStatData) {
        const { startDt, endDt, } = analyzeStatData;
        whereClause = Prisma.sql`
          WHERE c.use_yn = 'Y'
            AND c.del_yn = 'N'
            AND (
              v.view_dt >= ${startDt}::timestamptz AND v.view_dt <= ${endDt}::timestamptz
              OR bm.crt_dt >= ${startDt}::timestamptz AND bm.crt_dt <= ${endDt}::timestamptz
              OR sl.shrn_dt >= ${startDt}::timestamptz AND sl.shrn_dt <= ${endDt}::timestamptz
            )
        `;
      }

      const topCategories = await this.prisma.$queryRaw<TopPopularCategoryItemType[]>`
        SELECT
          c.ctgry_no AS "ctgryNo",
          c.ctgry_nm AS "ctgryNm",
          (
            COALESCE(COUNT(DISTINCT v.view_no), 0) * 1 +
            COALESCE(COUNT(DISTINCT bm.bkmrk_no), 0) * 3 +
            COALESCE(COUNT(DISTINCT sl.shrn_no), 0) * 5
          ) AS "popularityIndex",
          COALESCE(COUNT(DISTINCT v.view_no), 0) AS "viewCount",
          COALESCE(COUNT(DISTINCT bm.bkmrk_no), 0) AS "bookmarkCount",
          COALESCE(COUNT(DISTINCT sl.shrn_no), 0) AS "shareCount",
          COALESCE(COUNT(DISTINCT csm.ctgry_sbcr_no), 0) AS "subscriberCount",
          COALESCE(MAX(p.publ_dt), '') AS "lastUsedDate"
        FROM ctgry_info c
        LEFT JOIN pst_info p ON p.ctgry_no = c.ctgry_no AND p.use_yn = 'Y' AND p.del_yn = 'N'
        LEFT JOIN pst_view_log v ON v.pst_no = p.pst_no
        LEFT JOIN pst_bkmrk_mpng bm ON bm.pst_no = p.pst_no AND bm.del_yn = 'N'
        LEFT JOIN pst_shrn_log sl ON sl.pst_no = p.pst_no
        LEFT JOIN ctgry_sbcr_mpng csm ON csm.ctgry_no = c.ctgry_no AND csm.use_yn = 'Y' AND csm.del_yn = 'N'
        ${whereClause}
        GROUP BY c.ctgry_no, c.ctgry_nm
        ORDER BY "popularityIndex" DESC
        LIMIT ${limit}
      `;

      return prismaResponse(
        true,
        topCategories
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 구독자 많은 카테고리 TOP N (최적화된 버전)
   * @param limit 상위 N개
   */
  async getTopCategoriesBySubscriberCount(limit: number): Promise<RepoResponseType<TopCategoriesBySubscriberItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopCategoriesBySubscriberItemType[]>`
        WITH top_subscriber_categories AS (
          SELECT
            csm.ctgry_no,
            COUNT(*) as subscriber_count,
            MAX(csm.crt_dt) as last_subscriber_date
          FROM ctgry_sbcr_mpng csm
          WHERE csm.use_yn = 'Y'
            AND csm.del_yn = 'N'
          GROUP BY csm.ctgry_no
          ORDER BY subscriber_count DESC
          LIMIT ${limit}
        )
        SELECT
          tsc.ctgry_no AS "ctgryNo",
          COALESCE(c.ctgry_nm, '') AS "ctgryNm",
          tsc.subscriber_count AS "subscriberCount",
          COALESCE(p.post_count, 0) AS "postCount",
          tsc.last_subscriber_date AS "lastSubscriberDate"
        FROM top_subscriber_categories tsc
        LEFT JOIN ctgry_info c ON c.ctgry_no = tsc.ctgry_no
        LEFT JOIN (
          SELECT
            ctgry_no,
            COUNT(*) as post_count
          FROM pst_info
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY ctgry_no
        ) p ON p.ctgry_no = tsc.ctgry_no
        ORDER BY tsc.subscriber_count DESC
      `;

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
   * @description 평균 북마크 수 / 카테고리
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageBookmarkCountPerCategory(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageBookmarkPerCategoryItemType[]> | null> {
    try {
      const { startDt, endDt, mode, } = analyzeStatData;

      const dataList = await this.prisma.$queryRaw<AverageBookmarkPerCategoryItemType[]>`
        WITH ${createDateSeries(
          startDt,
          endDt,
          mode
        )}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          AVG(category_bookmark_counts.bookmark_count) AS "avgBookmarkCount"
        FROM bucket b
        LEFT JOIN (
          SELECT
            date_trunc(${mode}, bm.crt_dt::timestamptz) AS bookmark_date,
            p.ctgry_no,
            COUNT(*) AS bookmark_count
          FROM pst_bkmrk_mpng bm
          INNER JOIN pst_info p ON p.pst_no = bm.pst_no
          WHERE bm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND bm.crt_dt::timestamptz <= ${endDt}::timestamptz
            AND bm.del_yn = 'N'
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, bm.crt_dt::timestamptz), p.ctgry_no
        ) category_bookmark_counts
          ON category_bookmark_counts.bookmark_date = b.date_start
        GROUP BY
          b.date_start, b.date_end
        ORDER BY
          b.date_start
      `;

      return prismaResponse(
        true,
        dataList
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리별 평균 조회수
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageViewCountPerCategory(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageViewPerCategoryItemType[]> | null> {
    try {
      const { startDt, endDt, mode, } = analyzeStatData;

      const dataList = await this.prisma.$queryRaw<AverageViewPerCategoryItemType[]>`
        WITH ${createDateSeries(
          startDt,
          endDt,
          mode
        )}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          AVG(category_view_counts.view_count) AS "avgViewCount"
        FROM bucket b
        LEFT JOIN (
          SELECT
            date_trunc(${mode}, v.view_dt::timestamptz) AS view_date,
            p.ctgry_no,
            COUNT(*) AS view_count
          FROM pst_view_log v
          INNER JOIN pst_info p ON p.pst_no = v.pst_no
          WHERE v.view_dt::timestamptz >= ${startDt}::timestamptz
            AND v.view_dt::timestamptz <= ${endDt}::timestamptz
            AND p.use_yn = 'Y'
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, v.view_dt::timestamptz), p.ctgry_no
        ) category_view_counts
          ON category_view_counts.view_date = b.date_start
        GROUP BY
          b.date_start, b.date_end
        ORDER BY
          b.date_start
      `;

      return prismaResponse(
        true,
        dataList
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  // 2. 카테고리 계층 분석 (3개)

  /**
   * @description 계층별 카테고리 분포 (상위/하위 카테고리 비율)
   */
  async getCategoryHierarchyDistribution(): Promise<RepoResponseType<CategoryHierarchyDistributionItemType[]> | null> {
    try {
      const hierarchyDistribution = await this.prisma.$queryRaw<CategoryHierarchyDistributionItemType[]>`
        WITH hierarchy_counts AS (
          SELECT
            CASE
              WHEN up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END AS hierarchy_level,
            COUNT(*) AS count
          FROM ctgry_info
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY
            CASE
              WHEN up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END
        ),
        total_count AS (
          SELECT SUM(count) AS total FROM hierarchy_counts
        )
        SELECT
          hc.hierarchy_level AS "hierarchyLevel",
          hc.count,
          ROUND(hc.count::FLOAT / tc.total * 100, 2) / 100 AS ratio
        FROM hierarchy_counts hc
        CROSS JOIN total_count tc
        ORDER BY hc.count DESC
      `;

      return prismaResponse(
        true,
        hierarchyDistribution
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 계층별 포스트 분포
   */
  async getCategoryHierarchyPostDistribution(): Promise<RepoResponseType<CategoryHierarchyPostDistributionItemType[]> | null> {
    try {
      const postDistribution = await this.prisma.$queryRaw<CategoryHierarchyPostDistributionItemType[]>`
        WITH hierarchy_post_counts AS (
          SELECT
            CASE
              WHEN c.up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END AS hierarchy_level,
            COUNT(p.pst_no) AS post_count
          FROM ctgry_info c
          LEFT JOIN pst_info p ON p.ctgry_no = c.ctgry_no AND p.use_yn = 'Y' AND p.del_yn = 'N'
          WHERE c.use_yn = 'Y' AND c.del_yn = 'N'
          GROUP BY
            CASE
              WHEN c.up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END
        ),
        total_post_count AS (
          SELECT SUM(post_count) AS total FROM hierarchy_post_counts
        )
        SELECT
          hpc.hierarchy_level AS "hierarchyLevel",
          hpc.post_count AS "postCount",
          ROUND(hpc.post_count::FLOAT / tpc.total * 100, 2) / 100 AS ratio
        FROM hierarchy_post_counts hpc
        CROSS JOIN total_post_count tpc
        WHERE tpc.total > 0
        ORDER BY hpc.post_count DESC
      `;

      return prismaResponse(
        true,
        postDistribution
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 계층별 구독자 분포
   */
  async getCategoryHierarchySubscriberDistribution(): Promise<RepoResponseType<CategoryHierarchySubscriberDistributionItemType[]> | null> {
    try {
      const subscriberDistribution = await this.prisma.$queryRaw<CategoryHierarchySubscriberDistributionItemType[]>`
        WITH hierarchy_subscriber_counts AS (
          SELECT
            CASE
              WHEN c.up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END AS hierarchy_level,
            COUNT(csm.ctgry_sbcr_no) AS subscriber_count
          FROM ctgry_info c
          LEFT JOIN ctgry_sbcr_mpng csm ON csm.ctgry_no = c.ctgry_no AND csm.use_yn = 'Y' AND csm.del_yn = 'N'
          WHERE c.use_yn = 'Y' AND c.del_yn = 'N'
          GROUP BY
            CASE
              WHEN c.up_ctgry_no IS NULL THEN 'ROOT'
              ELSE 'CHILD'
            END
        ),
        total_subscriber_count AS (
          SELECT SUM(subscriber_count) AS total FROM hierarchy_subscriber_counts
        )
        SELECT
          hsc.hierarchy_level AS "hierarchyLevel",
          hsc.subscriber_count AS "subscriberCount",
          ROUND(hsc.subscriber_count::FLOAT / tsc.total * 100, 2) / 100 AS ratio
        FROM hierarchy_subscriber_counts hsc
        CROSS JOIN total_subscriber_count tsc
        WHERE tsc.total > 0
        ORDER BY hsc.subscriber_count DESC
      `;

      return prismaResponse(
        true,
        subscriberDistribution
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  // 3. 카테고리 관리 통계 (3개)

  /**
   * @description 카테고리 상태별 분포 (활성/비활성/삭제된 카테고리 비율)
   */
  async getCategoryStatusDistribution(): Promise<RepoResponseType<CategoryStatusDistributionItemType[]> | null> {
    try {
      const statusDistribution = await this.prisma.$queryRaw<CategoryStatusDistributionItemType[]>`
        WITH status_counts AS (
          SELECT
            CASE
              WHEN use_yn = 'Y' AND del_yn = 'N' THEN 'ACTIVE'
              WHEN use_yn = 'N' AND del_yn = 'N' THEN 'INACTIVE'
              WHEN del_yn = 'Y' THEN 'DELETED'
            END AS status,
            COUNT(*) AS count
          FROM ctgry_info
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
          ROUND(sc.count::FLOAT / tc.total * 100, 2) / 100 AS ratio
        FROM status_counts sc
        CROSS JOIN total_count tc
        ORDER BY sc.count DESC
      `;

      return prismaResponse(
        true,
        statusDistribution
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 생성자별 통계
   */
  async getCategoryCreatorStatistics(): Promise<RepoResponseType<CategoryCreatorStatItemType[]> | null> {
    try {
      const creatorStats = await this.prisma.$queryRaw<CategoryCreatorStatItemType[]>`
        SELECT
          c.crt_no AS "creatorNo",
          COALESCE(u.user_nm, 'Unknown') AS "creatorName",
          COUNT(c.ctgry_no) AS "categoryCount",
          COUNT(CASE WHEN c.use_yn = 'Y' AND c.del_yn = 'N' THEN 1 END) AS "activeCategoryCount",
          MAX(c.crt_dt) AS "lastCreateDate"
        FROM ctgry_info c
        LEFT JOIN user_info u ON u.user_no = c.crt_no
        GROUP BY c.crt_no, u.user_nm
        ORDER BY "categoryCount" DESC
      `;

      return prismaResponse(
        true,
        creatorStats
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 미사용 카테고리 목록 (포스트가 없는 카테고리)
   */
  async getUnusedCategoriesList(): Promise<RepoResponseType<UnusedCategoryItemType[]> | null> {
    try {
      const unusedCategories = await this.prisma.ctgryInfo.findMany({
        where: {
          useYn: 'Y',
          delYn: 'N',
          posts: {
            none: {
              useYn: 'Y',
              delYn: 'N',
            },
          },
        },
        select: {
          ctgryNo: true,
          ctgryNm: true,
          crtDt: true,
        },
        orderBy: {
          crtDt: 'desc',
        },
      });

      const result = unusedCategories.map((category) => {
        const createDate = new Date(category.crtDt);
        const now = new Date();
        const daysSinceCreation = Math.floor((now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24));

        return {
          ctgryNo: category.ctgryNo,
          ctgryNm: category.ctgryNm,
          createDate: category.crtDt,
          daysSinceCreation,
        };
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

  // 4. 카테고리 구독 분석 (2개 추가)

  /**
   * @description 카테고리별 구독자 성장률 (시계열)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getCategorySubscriberGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CategorySubscriberGrowthRateItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const growthRate = await this.prisma.$queryRaw<CategorySubscriberGrowthRateItemType[]>`
        WITH ${createDateSeries(
          startDt,
          endDt,
          mode
        )}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          c.ctgry_no AS "ctgryNo",
          c.ctgry_nm AS "ctgryNm",
          COALESCE(COUNT(csm.ctgry_sbcr_no), 0) AS "subscriberCount",
          COALESCE(
            CASE
              WHEN LAG(COUNT(csm.ctgry_sbcr_no)) OVER (PARTITION BY c.ctgry_no ORDER BY b.date_start) > 0
              THEN (COUNT(csm.ctgry_sbcr_no) - LAG(COUNT(csm.ctgry_sbcr_no)) OVER (PARTITION BY c.ctgry_no ORDER BY b.date_start))::FLOAT /
                   LAG(COUNT(csm.ctgry_sbcr_no)) OVER (PARTITION BY c.ctgry_no ORDER BY b.date_start)
              ELSE 0
            END, 0
          ) AS "growthRate",
          COALESCE(LAG(COUNT(csm.ctgry_sbcr_no)) OVER (PARTITION BY c.ctgry_no ORDER BY b.date_start), 0) AS "previousSubscriberCount"
        FROM bucket b
        CROSS JOIN ctgry_info c
        LEFT JOIN ctgry_sbcr_mpng csm ON csm.ctgry_no = c.ctgry_no
          AND csm.crt_dt < b.date_end
          AND csm.use_yn = 'Y'
          AND csm.del_yn = 'N'
        WHERE c.use_yn = 'Y' AND c.del_yn = 'N'
        GROUP BY b.date_start, b.date_end, c.ctgry_no, c.ctgry_nm
        ORDER BY b.date_start, c.ctgry_no
      `;

      return prismaResponse(
        true,
        growthRate
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 구독자 없는 카테고리 목록 (최적화된 버전)
   */
  async getCategoriesWithoutSubscribers(): Promise<RepoResponseType<CategoriesWithoutSubscribersItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<CategoriesWithoutSubscribersItemType[]>`
        SELECT
          c.ctgry_no AS "ctgryNo",
          c.ctgry_nm AS "ctgryNm",
          c.crt_dt AS "createDate",
          COALESCE(p.post_count, 0) AS "postCount",
          EXTRACT(DAYS FROM (NOW() - c.crt_dt::timestamp)) AS "daysSinceCreation"
        FROM ctgry_info c
        LEFT JOIN (
          SELECT
            ctgry_no,
            COUNT(*) as post_count
          FROM pst_info
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY ctgry_no
        ) p ON p.ctgry_no = c.ctgry_no
        WHERE c.use_yn = 'Y'
          AND c.del_yn = 'N'
          AND NOT EXISTS (
            SELECT 1
            FROM ctgry_sbcr_mpng csm
            WHERE csm.ctgry_no = c.ctgry_no
              AND csm.use_yn = 'Y'
              AND csm.del_yn = 'N'
          )
        ORDER BY c.crt_dt DESC
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  // ========================================================
  // 카테고리 기본 CRUD 메서드
  // ========================================================

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, orderBy, crtDtFrom, crtDtTo, useYn, ctgryColr, ctgryLvl, upCtgryNo, } = searchData;

      // upCtgryNo를 숫자로 변환 (쿼리 파라미터는 문자열로 전달될 수 있음)
      const upCtgryNoNumber = toNumber(upCtgryNo);
      const ctgryLvlNumber = toNumber(ctgryLvl);

      const where: Prisma.CtgryInfoWhereInput = {
        ...(delYn && { delYn, }),
        ...(srchKywd && srchType === 'ctgryNm' && {
          [srchType]: {
            contains: srchKywd,
          },
        }),
        ...(srchKywd && srchType === 'ctgryExpln' && {
          ctgryExpln: {
            contains: srchKywd,
          },
        }),
        ...(useYn && { useYn, }),
        ...(ctgryColr && {
          ctgryColr: {
            contains: ctgryColr,
          },
        }),
        ...(ctgryLvlNumber !== undefined && { ctgryLvl: ctgryLvlNumber, }),
        // upCtgryNo가 명시적으로 전달된 경우에만 필터링
        ...(upCtgryNo !== undefined && {
          upCtgryNo: upCtgryNoNumber ?? null,
        }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
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

      // 정렬 기준 설정
      // 기본 정렬: 레벨(오름차순) -> 정렬순(오름차순) -> 생성일(오름차순)
      // orderBy가 명시된 경우 해당 정렬을 우선 적용하고, 기본 정렬을 보조 정렬로 사용
      let orderByArray: Prisma.CtgryInfoOrderByWithRelationInput[] = [];

      if (orderBy === 'LATEST') {
        orderByArray = [
          { crtDt: 'desc', },
          { ctgryLvl: 'asc', },
          { ctgryStp: 'asc', },
        ];
      }
      else if (orderBy === 'OLDEST') {
        orderByArray = [
          { crtDt: 'asc', },
          { ctgryLvl: 'asc', },
          { ctgryStp: 'asc', },
        ];
      }
      else if (orderBy === 'NAME_ASC') {
        orderByArray = [
          { ctgryNm: 'asc', },
          { ctgryLvl: 'asc', },
          { ctgryStp: 'asc', },
          { crtDt: 'asc', },
        ];
      }
      else if (orderBy === 'NAME_DESC') {
        orderByArray = [
          { ctgryNm: 'desc', },
          { ctgryLvl: 'asc', },
          { ctgryStp: 'asc', },
          { crtDt: 'asc', },
        ];
      }
      else if (orderBy === 'STP_ASC') {
        orderByArray = [
          { ctgryStp: 'asc', },
          { ctgryLvl: 'asc', },
          { crtDt: 'asc', },
        ];
      }
      else if (orderBy === 'STP_DESC') {
        orderByArray = [
          { ctgryStp: 'desc', },
          { ctgryLvl: 'asc', },
          { crtDt: 'asc', },
        ];
      }
      else {
        // 기본 정렬: 레벨 -> 정렬순 -> 생성일
        orderByArray = [
          { ctgryLvl: 'asc', },
          { ctgryStp: 'asc', },
          { crtDt: 'asc', },
        ];
      }

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.ctgryInfo.findMany({
          where,
          include: {
            parentCategory: true,
            childCategories: {
              where: {
                useYn: 'Y',
                delYn: 'N',
              },
              orderBy: [
                { ctgryLvl: 'asc', },
                { ctgryStp: 'asc', },
                { crtDt: 'asc', },
              ],
              include: {
                childCategories: {
                  where: {
                    useYn: 'Y',
                    delYn: 'N',
                  },
                  orderBy: [
                    { ctgryLvl: 'asc', },
                    { ctgryStp: 'asc', },
                    { crtDt: 'asc', },
                  ],
                  include: {
                    childCategories: {
                      where: {
                        useYn: 'Y',
                        delYn: 'N',
                      },
                      orderBy: [
                        { ctgryLvl: 'asc', },
                        { ctgryStp: 'asc', },
                        { crtDt: 'asc', },
                      ],
                    },
                  },
                },
              },
            },
          },
          orderBy: orderByArray,
          skip,
          take,
        }),
        this.prisma.ctgryInfo.count({ where, }),
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
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      const category = await this.prisma.ctgryInfo.findUnique({
        where: { ctgryNo, },
        include: {
          parentCategory: true,
          childCategories: {
            where: {
              useYn: 'Y',
              delYn: 'N',
            },
            orderBy: [
              { ctgryLvl: 'asc', },
              { ctgryStp: 'asc', },
              { crtDt: 'asc', },
            ],
            include: {
              childCategories: {
                where: {
                  useYn: 'Y',
                  delYn: 'N',
                },
                orderBy: [
                  { ctgryLvl: 'asc', },
                  { ctgryStp: 'asc', },
                  { crtDt: 'asc', },
                ],
                include: {
                  childCategories: {
                    where: {
                      useYn: 'Y',
                      delYn: 'N',
                    },
                    orderBy: [
                      { ctgryLvl: 'asc', },
                      { ctgryStp: 'asc', },
                      { crtDt: 'asc', },
                    ],
                  },
                },
              },
            },
          },
        },
      });

      if (!category) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.CATEGORY.ADMIN.NOT_FOUND
        );
      }

      return prismaResponse(
        true,
        category
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param ctgryNm 카테고리명
   */
  async getCategoryByCtgryNm(ctgryNm: string): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      const category = await this.prisma.ctgryInfo.findUnique({
        where: { ctgryNm, },
        include: {
          parentCategory: true,
          childCategories: {
            where: {
              useYn: 'Y',
              delYn: 'N',
            },
            orderBy: [
              { ctgryLvl: 'asc', },
              { ctgryStp: 'asc', },
              { crtDt: 'asc', },
            ],
            include: {
              childCategories: {
                where: {
                  useYn: 'Y',
                  delYn: 'N',
                },
                orderBy: [
                  { ctgryLvl: 'asc', },
                  { ctgryStp: 'asc', },
                  { crtDt: 'asc', },
                ],
                include: {
                  childCategories: {
                    where: {
                      useYn: 'Y',
                      delYn: 'N',
                    },
                    orderBy: [
                      { ctgryLvl: 'asc', },
                      { ctgryStp: 'asc', },
                      { crtDt: 'asc', },
                    ],
                  },
                },
              },
            },
          },
        },
      });

      if (!category) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.CATEGORY.ADMIN.NAME_NOT_FOUND
        );
      }

      return prismaResponse(
        true,
        category
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async createCategory(userNo: number, createData: CreateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      // level 계산: upCtgryNo가 있으면 부모의 level + 1, 없으면 0
      let ctgryLvl = 0;
      if (createData.upCtgryNo) {
        const parentCategory = await this.prisma.ctgryInfo.findUnique({
          where: { ctgryNo: createData.upCtgryNo, },
          select: { ctgryLvl: true, },
        });
        if (parentCategory) {
          ctgryLvl = parentCategory.ctgryLvl + 1;
        }
      }
      // 명시적으로 ctgryLvl이 제공되면 그것을 사용
      if (createData.ctgryLvl !== undefined) {
        ctgryLvl = createData.ctgryLvl;
      }

      // 레벨 제한 검증 (최대 3)
      if (ctgryLvl > 3) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED
        );
      }

      const newCategory = await this.prisma.ctgryInfo.create({
        data: {
          ctgryNm: createData.ctgryNm,
          ctgryExpln: createData.ctgryExpln,
          ctgryColr: createData.ctgryColr,
          ctgryStp: createData.ctgryStp,
          ctgryLvl,
          upCtgryNo: createData.upCtgryNo,
          useYn: 'Y',
          delYn: 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          parentCategory: true,
          childCategories: {
            where: {
              useYn: 'Y',
              delYn: 'N',
            },
            include: {
              childCategories: {
                where: {
                  useYn: 'Y',
                  delYn: 'N',
                },
                include: {
                  childCategories: {
                    where: {
                      useYn: 'Y',
                      delYn: 'N',
                    },
                  },
                },
              },
            },
          },
        },
      });

      return prismaResponse(
        true,
        newCategory
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async multipleCreateCategory(userNo: number, createData: CreateCategoryDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      // 각 카테고리의 level 계산
      const dataWithLevel = await Promise.all(createData.map(async (item) => {
        let ctgryLvl = 0;
        if (item.upCtgryNo) {
          const parentCategory = await this.prisma.ctgryInfo.findUnique({
            where: { ctgryNo: item.upCtgryNo, },
            select: { ctgryLvl: true, },
          });
          if (parentCategory) {
            ctgryLvl = parentCategory.ctgryLvl + 1;
          }
        }
        // 명시적으로 ctgryLvl이 제공되면 그것을 사용
        if (item.ctgryLvl !== undefined) {
          ctgryLvl = item.ctgryLvl;
        }

        // 레벨 제한 검증 (최대 3)
        if (ctgryLvl > 3) {
          throw new Error(MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED);
        }

        return {
          ctgryNm: item.ctgryNm,
          ctgryExpln: item.ctgryExpln,
          ctgryColr: item.ctgryColr,
          ctgryStp: item.ctgryStp,
          ctgryLvl,
          upCtgryNo: item.upCtgryNo,
          useYn: item.useYn || 'Y',
          delYn: item.delYn || 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        };
      }));

      const newCategories = await this.prisma.ctgryInfo.createMany({
        data: dataWithLevel,
      });

      return prismaResponse(
        true,
        {
          successCnt: newCategories.count,
          failCnt: createData.length - newCategories.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 수정 데이터
   */
  async updateCategory(userNo: number, updateData: UpdateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      // level 계산: upCtgryNo가 변경되거나 명시적으로 제공되지 않은 경우 자동 계산
      let ctgryLvl: number | undefined = updateData.ctgryLvl;
      if (ctgryLvl === undefined && updateData.upCtgryNo !== undefined) {
        if (updateData.upCtgryNo === null) {
          ctgryLvl = 0;
        }
        else {
          const parentCategory = await this.prisma.ctgryInfo.findUnique({
            where: { ctgryNo: updateData.upCtgryNo, },
            select: { ctgryLvl: true, },
          });
          if (parentCategory) {
            ctgryLvl = parentCategory.ctgryLvl + 1;
          }
        }
      }

      // 레벨 제한 검증 (최대 3)
      if (ctgryLvl !== undefined && ctgryLvl > 3) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED
        );
      }

      const updatedCategory = await this.prisma.ctgryInfo.update({
        where: { ctgryNo: updateData.ctgryNo, },
        data: {
          ctgryNm: updateData.ctgryNm,
          ctgryExpln: updateData.ctgryExpln,
          ctgryColr: updateData.ctgryColr,
          ctgryStp: updateData.ctgryStp,
          ...(ctgryLvl !== undefined && { ctgryLvl, }),
          upCtgryNo: updateData.upCtgryNo,
          useYn: updateData.useYn,
          delYn: updateData.delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          parentCategory: true,
          childCategories: {
            where: {
              useYn: 'Y',
              delYn: 'N',
            },
            include: {
              childCategories: {
                where: {
                  useYn: 'Y',
                  delYn: 'N',
                },
                include: {
                  childCategories: {
                    where: {
                      useYn: 'Y',
                      delYn: 'N',
                    },
                  },
                },
              },
            },
          },
        },
      });

      return prismaResponse(
        true,
        updatedCategory
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 카테고리 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 수정 데이터
   */
  async multipleUpdateCategory(userNo: number, updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      // level 계산: upCtgryNo가 변경되거나 명시적으로 제공되지 않은 경우 자동 계산
      let ctgryLvl: number | undefined = updateData.ctgryLvl;
      if (ctgryLvl === undefined && updateData.upCtgryNo !== undefined) {
        if (updateData.upCtgryNo === null) {
          ctgryLvl = 0;
        }
        else {
          const parentCategory = await this.prisma.ctgryInfo.findUnique({
            where: { ctgryNo: updateData.upCtgryNo, },
            select: { ctgryLvl: true, },
          });
          if (parentCategory) {
            ctgryLvl = parentCategory.ctgryLvl + 1;
          }
        }
      }

      // 레벨 제한 검증 (최대 3)
      if (ctgryLvl !== undefined && ctgryLvl > 3) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED
        );
      }

      const updatedCategories = await this.prisma.ctgryInfo.updateMany({
        where: {
          ctgryNo: {
            in: updateData.ctgryNoList,
          },
        },
        data: {
          ctgryNm: updateData.ctgryNm,
          ctgryExpln: updateData.ctgryExpln,
          ctgryColr: updateData.ctgryColr,
          ctgryStp: updateData.ctgryStp,
          ...(ctgryLvl !== undefined && { ctgryLvl, }),
          upCtgryNo: updateData.upCtgryNo,
          useYn: updateData.useYn,
          delYn: updateData.delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        {
          successCnt: updatedCategories.count,
          failCnt: updateData.ctgryNoList.length - updatedCategories.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 삭제
   * @param userNo 사용자 번호
   * @param deleteData 카테고리 삭제 데이터
   */
  async deleteCategory(userNo: number, deleteData: DeleteCategoryDto): Promise<RepoResponseType<boolean> | null> {
    try {
      const deletedCategory = await this.prisma.ctgryInfo.update({
        where: { ctgryNo: deleteData.ctgryNo, },
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
        !!deletedCategory
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 카테고리 삭제
   * @param userNo 사용자 번호
   * @param deleteData 카테고리 삭제 데이터
   */
  async multipleDeleteCategory(userNo: number, deleteData: DeleteCategoryDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletedCategories = await this.prisma.ctgryInfo.updateMany({
        where: { ctgryNo: { in: deleteData.ctgryNoList, }, },
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
        {
          successCnt: deletedCategories.count,
          failCnt: deleteData.ctgryNoList.length - deletedCategories.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
