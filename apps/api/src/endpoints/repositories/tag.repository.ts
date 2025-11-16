import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@nihilog/db';
import type { ListType, MultipleResultType, RepoResponseType } from '@nihilog/schemas';
import type {
  SelectPstTagMpngListItemType,
  SelectPstTagMpngType,
  SelectTagInfoListItemType,
  SelectTagInfoType,
  AnalyzeTagStatItemType,
  TopUsedTagItemType,
  TagUsageTrendItemType,
  UnusedTagItemType,
  TopTagsBySubscriberItemType,
  TagSubscriberGrowthRateItemType,
  TagWithoutSubscribersItemType,
  TagUsageEfficiencyItemType,
  TagAverageUsageFrequencyItemType,
  TagLifecycleItemType,
  TagStatusDistributionItemType,
  TagCreatorStatItemType,
  TagCleanupRecommendationItemType
} from '@nihilog/schemas';

import { MESSAGE } from '@nihilog/code';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import type { CreatePstTagMpngDto, CreateTagDto, DeletePstTagMpngDto, DeleteTagDto, SearchPstTagMpngDto, SearchTagDto, UpdateTagDto } from '@/dto/tag.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import { createDateSeries } from '@/utils/createDateSeries';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class TagRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ========================================================
  // 태그 통계 관련 메서드
  // ========================================================

  /**
   * @description 태그 분석 통계 (시간대별 합산) - 9개 지표 통합 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터
   * @param tagNo 태그 번호 (선택적, 없으면 전체/있으면 해당 태그만)
   */
  async getAnalyzeTagData(analyzeStatData: AnalyzeStatDto, tagNo?: number): Promise<RepoResponseType<AnalyzeTagStatItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeTagStatItemType[]>`
        WITH date_series AS ${createDateSeries(
          startDt,
          endDt,
          mode
        )},

        -- 모든 통계를 하나의 CTE로 통합
        all_stats AS (
          SELECT
            date_trunc(${mode}, t.crt_dt::timestamptz) AS stat_date,
            'new_tag' AS stat_type,
            COUNT(*) AS stat_count
          FROM tag_info t
          WHERE ${tagNo
            ? Prisma.sql`t.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND t.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND t.crt_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, t.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, t.del_dt::timestamptz) AS stat_date,
            'delete_tag' AS stat_type,
            COUNT(*) AS stat_count
          FROM tag_info t
          WHERE ${tagNo
            ? Prisma.sql`t.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND t.del_dt::timestamptz >= ${startDt}::timestamptz
            AND t.del_dt::timestamptz < ${endDt}::timestamptz
            AND t.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, t.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, ptm.crt_dt::timestamptz) AS stat_date,
            'tag_mapping' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_tag_mpng ptm
          WHERE ${tagNo
            ? Prisma.sql`ptm.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND ptm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND ptm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND ptm.use_yn = 'Y'
            AND ptm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, ptm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, ptm.del_dt::timestamptz) AS stat_date,
            'tag_mapping_delete' AS stat_type,
            COUNT(*) AS stat_count
          FROM pst_tag_mpng ptm
          WHERE ${tagNo
            ? Prisma.sql`ptm.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND ptm.del_dt::timestamptz >= ${startDt}::timestamptz
            AND ptm.del_dt::timestamptz < ${endDt}::timestamptz
            AND ptm.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, ptm.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, tsm.crt_dt::timestamptz) AS stat_date,
            'subscriber_increase' AS stat_type,
            COUNT(*) AS stat_count
          FROM tag_sbcr_mpng tsm
          WHERE ${tagNo
            ? Prisma.sql`tsm.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND tsm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND tsm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND tsm.use_yn = 'Y'
            AND tsm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, tsm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, tsm.del_dt::timestamptz) AS stat_date,
            'subscriber_decrease' AS stat_type,
            COUNT(*) AS stat_count
          FROM tag_sbcr_mpng tsm
          WHERE ${tagNo
            ? Prisma.sql`tsm.tag_no = ${tagNo}`
            : Prisma.sql`TRUE`}
            AND tsm.del_dt::timestamptz >= ${startDt}::timestamptz
            AND tsm.del_dt::timestamptz < ${endDt}::timestamptz
            AND tsm.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, tsm.del_dt::timestamptz)
        )

        SELECT
          ds.date_start AS "dateStart",
          ds.date_end AS "dateEnd",
          COALESCE(SUM(CASE WHEN as.stat_type = 'new_tag' THEN as.stat_count ELSE 0 END), 0) AS "newTagCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'delete_tag' THEN as.stat_count ELSE 0 END), 0) AS "deleteTagCount",
          0 AS "activeTagCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'tag_mapping' THEN as.stat_count ELSE 0 END), 0) AS "tagMappingCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'tag_mapping_delete' THEN as.stat_count ELSE 0 END), 0) AS "tagMappingDeleteCount",
          0 AS "activeTagMappingCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'subscriber_increase' THEN as.stat_count ELSE 0 END), 0) AS "subscriberIncreaseCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'subscriber_decrease' THEN as.stat_count ELSE 0 END), 0) AS "subscriberDecreaseCount",
          0 AS "activeSubscriberCount"
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

  /**
   * @description 태그별 사용 횟수 TOP N (최적화된 버전)
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택적)
   */
  async getTopUsedTagsByCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopUsedTagItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopUsedTagItemType[]>`
        WITH top_used_tags AS (
          SELECT
            ptm.tag_no,
            COUNT(*) as usage_count,
            MAX(ptm.crt_dt) as last_used_date
          FROM pst_tag_mpng ptm
          WHERE ptm.use_yn = 'Y'
            AND ptm.del_yn = 'N'
            ${analyzeStatData
              ? Prisma.sql`
                AND ptm.crt_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz
                AND ptm.crt_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz
              `
              : Prisma.empty}
          GROUP BY ptm.tag_no
          ORDER BY usage_count DESC
          LIMIT ${limit}
        )
        SELECT
          tut.tag_no AS "tagNo",
          COALESCE(t.tag_nm, '') AS "tagNm",
          tut.usage_count AS "usageCount",
          COALESCE(tsm.subscriber_count, 0) AS "subscriberCount",
          tut.last_used_date AS "lastUsedDate"
        FROM top_used_tags tut
        LEFT JOIN tag_info t ON t.tag_no = tut.tag_no
        LEFT JOIN (
          SELECT
            tag_no,
            COUNT(*) as subscriber_count
          FROM tag_sbcr_mpng
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY tag_no
        ) tsm ON tsm.tag_no = tut.tag_no
        ORDER BY tut.usage_count DESC
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
   * @description 태그별 사용 추이
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTagUsageTrend(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagUsageTrendItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const usageTrend = await this.prisma.$queryRaw<TagUsageTrendItemType[]>`
        WITH ${createDateSeries(
          startDt,
          endDt,
          mode
        )}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          COALESCE(COUNT(ptm.tag_map_no), 0) AS "usageCount"
        FROM bucket b
        CROSS JOIN tag_info t
        LEFT JOIN pst_tag_mpng ptm ON ptm.tag_no = t.tag_no
          AND ptm.crt_dt >= b.date_start
          AND ptm.crt_dt < b.date_end
          AND ptm.use_yn = 'Y'
          AND ptm.del_yn = 'N'
        WHERE t.use_yn = 'Y' AND t.del_yn = 'N'
        GROUP BY b.date_start, b.date_end, t.tag_no, t.tag_nm
        HAVING COUNT(ptm.tag_map_no) > 0
        ORDER BY b.date_start, t.tag_no
      `;

      return prismaResponse(
        true,
        usageTrend
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 미사용 태그 목록
   */
  async getUnusedTagsList(): Promise<RepoResponseType<UnusedTagItemType[]> | null> {
    try {
      const unusedTags = await this.prisma.tagInfo.findMany({
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
          tagNo: true,
          tagNm: true,
          crtDt: true,
        },
        orderBy: {
          crtDt: 'desc',
        },
      });

      const result = unusedTags.map((tag) => {
        const createDate = new Date(tag.crtDt);
        const now = new Date();
        const daysSinceCreation = Math.floor((now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24));

        return {
          tagNo: tag.tagNo,
          tagNm: tag.tagNm,
          createDate: tag.crtDt,
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

  /**
   * @description 태그별 구독자 수 TOP N (최적화된 버전)
   * @param limit 상위 N개
   */
  async getTopTagsBySubscriberCount(limit: number): Promise<RepoResponseType<TopTagsBySubscriberItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopTagsBySubscriberItemType[]>`
        WITH top_subscriber_tags AS (
          SELECT
            tsm.tag_no,
            COUNT(*) as subscriber_count,
            MAX(tsm.crt_dt) as last_subscriber_date
          FROM tag_sbcr_mpng tsm
          WHERE tsm.use_yn = 'Y'
            AND tsm.del_yn = 'N'
          GROUP BY tsm.tag_no
          ORDER BY subscriber_count DESC
          LIMIT ${limit}
        )
        SELECT
          tst.tag_no AS "tagNo",
          COALESCE(t.tag_nm, '') AS "tagNm",
          tst.subscriber_count AS "subscriberCount",
          COALESCE(ptm.usage_count, 0) AS "usageCount",
          tst.last_subscriber_date AS "lastSubscriberDate"
        FROM top_subscriber_tags tst
        LEFT JOIN tag_info t ON t.tag_no = tst.tag_no
        LEFT JOIN (
          SELECT
            tag_no,
            COUNT(*) as usage_count
          FROM pst_tag_mpng
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY tag_no
        ) ptm ON ptm.tag_no = tst.tag_no
        ORDER BY tst.subscriber_count DESC
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
   * @description 태그별 구독자 성장률
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTagSubscriberGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagSubscriberGrowthRateItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const growthRate = await this.prisma.$queryRaw<TagSubscriberGrowthRateItemType[]>`
        WITH ${createDateSeries(
          startDt,
          endDt,
          mode
        )}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          COALESCE(COUNT(tsm.sbcr_map_no), 0) AS "subscriberCount",
          COALESCE(
            CASE
              WHEN LAG(COUNT(tsm.sbcr_map_no)) OVER (PARTITION BY t.tag_no ORDER BY b.date_start) > 0
              THEN (COUNT(tsm.sbcr_map_no) - LAG(COUNT(tsm.sbcr_map_no)) OVER (PARTITION BY t.tag_no ORDER BY b.date_start))::FLOAT /
                   LAG(COUNT(tsm.sbcr_map_no)) OVER (PARTITION BY t.tag_no ORDER BY b.date_start)
              ELSE 0
            END, 0
          ) AS "growthRate",
          COALESCE(LAG(COUNT(tsm.sbcr_map_no)) OVER (PARTITION BY t.tag_no ORDER BY b.date_start), 0) AS "previousSubscriberCount"
        FROM bucket b
        CROSS JOIN tag_info t
        LEFT JOIN tag_sbcr_mpng tsm ON tsm.tag_no = t.tag_no
          AND tsm.crt_dt < b.date_end
          AND tsm.use_yn = 'Y'
          AND tsm.del_yn = 'N'
        WHERE t.use_yn = 'Y' AND t.del_yn = 'N'
        GROUP BY b.date_start, b.date_end, t.tag_no, t.tag_nm
        ORDER BY b.date_start, t.tag_no
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
   * @description 구독자 없는 태그 목록 (최적화된 버전)
   */
  async getTagsWithoutSubscribers(): Promise<RepoResponseType<TagWithoutSubscribersItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TagWithoutSubscribersItemType[]>`
        SELECT
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          t.crt_dt AS "createDate",
          COALESCE(ptm.usage_count, 0) AS "usageCount"
        FROM tag_info t
        LEFT JOIN (
          SELECT
            tag_no,
            COUNT(*) as usage_count
          FROM pst_tag_mpng
          WHERE use_yn = 'Y' AND del_yn = 'N'
          GROUP BY tag_no
        ) ptm ON ptm.tag_no = t.tag_no
        WHERE t.use_yn = 'Y'
          AND t.del_yn = 'N'
          AND NOT EXISTS (
            SELECT 1
            FROM tag_sbcr_mpng tsm
            WHERE tsm.tag_no = t.tag_no
              AND tsm.use_yn = 'Y'
              AND tsm.del_yn = 'N'
          )
        ORDER BY t.crt_dt DESC
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
   * @description 태그별 사용 효율성
   */
  async getTagUsageEfficiency(): Promise<RepoResponseType<TagUsageEfficiencyItemType[]> | null> {
    try {
      const tags = await this.prisma.tagInfo.findMany({
        where: {
          useYn: 'Y',
          delYn: 'N',
        },
        select: {
          tagNo: true,
          tagNm: true,
        },
      });

      const result = await Promise.all(tags.map(async (tag) => {
        const [
          usageCount,
          subscriberCount,
        ] = await Promise.all([
          this.prisma.pstTagMpng.count({
            where: {
              tagNo: tag.tagNo,
              useYn: 'Y',
              delYn: 'N',
            },
          }),
          this.prisma.tagSbcrMpng.count({
            where: {
              tagNo: tag.tagNo,
              useYn: 'Y',
              delYn: 'N',
            },
          }),
        ]);

        const efficiencyRatio = subscriberCount > 0
          ? usageCount / subscriberCount
          : 0;

        return {
          tagNo: tag.tagNo,
          tagNm: tag.tagNm,
          usageCount,
          subscriberCount,
          efficiencyRatio,
        };
      }));

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
   * @description 태그별 평균 사용 빈도
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTagAverageUsageFrequency(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagAverageUsageFrequencyItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const frequencyData = await this.prisma.$queryRaw<TagAverageUsageFrequencyItemType[]>`
        SELECT
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          COUNT(ptm.tag_map_no) AS "totalUsageCount",
          EXTRACT(DAYS FROM (${endDt}::timestamp - ${startDt}::timestamp)) + 1 AS "activeDays",
          CASE
            WHEN EXTRACT(DAYS FROM (${endDt}::timestamp - ${startDt}::timestamp)) + 1 > 0
            THEN COUNT(ptm.tag_map_no)::FLOAT / (EXTRACT(DAYS FROM (${endDt}::timestamp - ${startDt}::timestamp)) + 1)
            ELSE 0
          END AS "averageFrequency"
        FROM tag_info t
        LEFT JOIN pst_tag_mpng ptm ON ptm.tag_no = t.tag_no
          AND ptm.crt_dt >= ${startDt}::timestamp
          AND ptm.crt_dt <= ${endDt}::timestamp
          AND ptm.use_yn = 'Y'
          AND ptm.del_yn = 'N'
        WHERE t.use_yn = 'Y' AND t.del_yn = 'N'
        GROUP BY t.tag_no, t.tag_nm
        ORDER BY "averageFrequency" DESC
      `;

      return prismaResponse(
        true,
        frequencyData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 생명주기 분석
   */
  async getTagLifecycleAnalysis(): Promise<RepoResponseType<TagLifecycleItemType[]> | null> {
    try {
      const lifecycleData = await this.prisma.$queryRaw<TagLifecycleItemType[]>`
        SELECT
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          t.crt_dt AS "createDate",
          MAX(ptm.crt_dt) AS "lastUsedDate",
          CASE
            WHEN MAX(ptm.crt_dt) IS NOT NULL
            THEN EXTRACT(DAYS FROM (MAX(ptm.crt_dt)::timestamp - t.crt_dt::timestamp))
            ELSE NULL
          END AS "lifecycleDays",
          CASE
            WHEN t.use_yn = 'Y' AND t.del_yn = 'N' THEN true
            ELSE false
          END AS "isActive"
        FROM tag_info t
        LEFT JOIN pst_tag_mpng ptm ON ptm.tag_no = t.tag_no
          AND ptm.use_yn = 'Y'
          AND ptm.del_yn = 'N'
        GROUP BY t.tag_no, t.tag_nm, t.crt_dt, t.use_yn, t.del_yn
        ORDER BY t.crt_dt DESC
      `;

      return prismaResponse(
        true,
        lifecycleData
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 상태별 분포
   */
  async getTagStatusDistribution(): Promise<RepoResponseType<TagStatusDistributionItemType[]> | null> {
    try {
      const statusDistribution = await this.prisma.$queryRaw<TagStatusDistributionItemType[]>`
        WITH status_counts AS (
          SELECT
            CASE
              WHEN use_yn = 'Y' AND del_yn = 'N' THEN 'ACTIVE'
              WHEN use_yn = 'N' AND del_yn = 'N' THEN 'INACTIVE'
              WHEN del_yn = 'Y' THEN 'DELETED'
            END AS status,
            COUNT(*) AS count
          FROM tag_info
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
   * @description 태그 생성자별 통계
   */
  async getTagCreatorStatistics(): Promise<RepoResponseType<TagCreatorStatItemType[]> | null> {
    try {
      const creatorStats = await this.prisma.$queryRaw<TagCreatorStatItemType[]>`
        SELECT
          t.crt_no AS "creatorNo",
          COALESCE(u.user_nm, 'Unknown') AS "creatorName",
          COUNT(t.tag_no) AS "tagCount",
          COUNT(CASE WHEN t.use_yn = 'Y' AND t.del_yn = 'N' THEN 1 END) AS "activeTagCount",
          MAX(t.crt_dt) AS "lastCreateDate"
        FROM tag_info t
        LEFT JOIN user_info u ON u.user_no = t.crt_no
        GROUP BY t.crt_no, u.user_nm
        ORDER BY "tagCount" DESC
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
   * @description 태그 정리 필요도
   */
  async getTagCleanupRecommendations(): Promise<RepoResponseType<TagCleanupRecommendationItemType[]> | null> {
    try {
      const cleanupRecommendations = await this.prisma.$queryRaw<TagCleanupRecommendationItemType[]>`
        SELECT
          t.tag_no AS "tagNo",
          t.tag_nm AS "tagNm",
          t.crt_dt AS "createDate",
          MAX(ptm.crt_dt) AS "lastUsedDate",
          CASE
            WHEN MAX(ptm.crt_dt) IS NOT NULL
            THEN EXTRACT(DAYS FROM (NOW() - MAX(ptm.crt_dt)::timestamp))
            ELSE EXTRACT(DAYS FROM (NOW() - t.crt_dt::timestamp))
          END AS "daysUnused",
          CASE
            WHEN MAX(ptm.crt_dt) IS NULL THEN 'DELETE'
            WHEN EXTRACT(DAYS FROM (NOW() - MAX(ptm.crt_dt)::timestamp)) > 365 THEN 'DELETE'
            WHEN EXTRACT(DAYS FROM (NOW() - MAX(ptm.crt_dt)::timestamp)) > 180 THEN 'ARCHIVE'
            ELSE 'KEEP'
          END AS recommendation
        FROM tag_info t
        LEFT JOIN pst_tag_mpng ptm ON ptm.tag_no = t.tag_no
          AND ptm.use_yn = 'Y'
          AND ptm.del_yn = 'N'
        WHERE t.use_yn = 'Y' AND t.del_yn = 'N'
        GROUP BY t.tag_no, t.tag_nm, t.crt_dt
        HAVING
          MAX(ptm.crt_dt) IS NULL
          OR EXTRACT(DAYS FROM (NOW() - MAX(ptm.crt_dt)::timestamp)) > 180
        ORDER BY "daysUnused" DESC
      `;

      return prismaResponse(
        true,
        cleanupRecommendations
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagList(searchData: SearchTagDto): Promise<RepoResponseType<ListType<SelectTagInfoListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, orderBy, srchMode, postCountMin, postCountMax, subscriberCountMin, subscriberCountMax, } = searchData;

      // 어드민 모드이고 포스트 개수 범위가 설정된 경우, groupBy로 조건에 맞는 태그 필터링
      let postValidTagNos: number[] | undefined;
      let subscriberValidTagNos: number[] | undefined;

      if (srchMode === 'ADMIN' && (postCountMin !== undefined || postCountMax !== undefined)) {
        const tagGrouping = await this.prisma.pstTagMpng.groupBy({
          by: [ 'tagNo', ],
          where: {
            useYn: 'Y',
            delYn: 'N',
            post: {
              useYn: 'Y',
              delYn: 'N',
            },
          },
          _count: {
            pstNo: true,
          },
          having: {
            pstNo: {
              _count: {
                ...(postCountMin !== undefined && { gte: postCountMin, }),
                ...(postCountMax !== undefined && { lte: postCountMax, }),
              },
            },
          },
        });

        postValidTagNos = tagGrouping.map((item) => item.tagNo);
      }

      // 어드민 모드이고 구독자 수 범위가 설정된 경우, groupBy로 조건에 맞는 태그 필터링
      if (srchMode === 'ADMIN' && (subscriberCountMin !== undefined || subscriberCountMax !== undefined)) {
        const tagGrouping = await this.prisma.tagSbcrMpng.groupBy({
          by: [ 'tagNo', ],
          where: {
            useYn: 'Y',
            delYn: 'N',
          },
          _count: {
            sbcrNo: true,
          },
          having: {
            sbcrNo: {
              _count: {
                ...(subscriberCountMin !== undefined && { gte: subscriberCountMin, }),
                ...(subscriberCountMax !== undefined && { lte: subscriberCountMax, }),
              },
            },
          },
        });

        subscriberValidTagNos = tagGrouping.map((item) => item.tagNo);
      }

      // 두 조건을 결합 (둘 다 있으면 교집합, 하나만 있으면 해당 값)
      let validTagNos: number[] | undefined;

      if (postValidTagNos && subscriberValidTagNos) {
        // 두 조건 모두 있으면 교집합
        validTagNos = postValidTagNos.filter((tagNo) => subscriberValidTagNos.includes(tagNo));
      }
      else if (postValidTagNos) {
        validTagNos = postValidTagNos;
      }
      else if (subscriberValidTagNos) {
        validTagNos = subscriberValidTagNos;
      }

      const where: Prisma.TagInfoWhereInput = {
        delYn,
        ...(validTagNos && {
          tagNo: {
            in: validTagNos,
          },
        }),
        ...(srchKywd && srchType && {
          [srchType]: {
            contains: srchKywd,
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
        this.prisma.tagInfo.findMany({
          where,
          orderBy: {
            ...(orderBy === 'LATEST') && {
              crtNo: 'desc',
            },
            ...(orderBy === 'OLDEST') && {
              crtNo: 'asc',
            },
            ...(orderBy === 'POPULAR') && {
              posts: {
                _count: 'desc',
              },
            },
            ...(orderBy === 'UNPOPULAR') && {
              posts: {
                _count: 'asc',
              },
            },
          },
          skip,
          take,
        }),
        this.prisma.tagInfo.count({ where, }),
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
   * @description 태그 번호로 태그 조회
   * @param tagNo 태그 번호
   */
  async getTagByTagNo(tagNo: number): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const tag = await this.prisma.tagInfo.findUnique({
        where: { tagNo, },
      });

      if (!tag) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.TAG.ADMIN.NOT_FOUND
        );
      }

      return prismaResponse(
        true,
        tag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그명으로 태그 조회
   * @param tagNm 태그명
   */
  async getTagByTagNm(tagNm: string): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const tag = await this.prisma.tagInfo.findUnique({
        where: { tagNm, },
      });

      if (!tag) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.TAG.ADMIN.NOT_FOUND
        );
      }

      return prismaResponse(
        true,
        tag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  async createTag(userNo: number, createData: CreateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const newTag = await this.prisma.tagInfo.create({
        data: {
          ...createData,
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        newTag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  async multipleCreateTag(userNo: number, createData: CreateTagDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const newTags = await this.prisma.tagInfo.createMany({
        data: createData.map((item) => ({
          ...item,
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        })),
      });

      return prismaResponse(
        true,
        {
          successCnt: newTags.count,
          failCnt: createData.length - newTags.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 수정
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   * @param updateData 태그 수정 데이터
   */
  async updateTag(userNo: number, tagNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const updatedTag = await this.prisma.tagInfo.update({
        where: { tagNo, },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        updatedTag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 수정 데이터
   */
  async multipleUpdateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const updatedTags = await this.prisma.tagInfo.updateMany({
        where: {
          tagNo: {
            in: updateData.tagNoList,
          },
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        {
          successCnt: updatedTags.count,
          failCnt: updateData.tagNoList.length - updatedTags.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 삭제
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async deleteTag(userNo: number, tagNo: number): Promise<RepoResponseType<boolean> | null> {
    try {
      const deletedTag = await this.prisma.tagInfo.update({
        where: { tagNo, },
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
        !!deletedTag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 태그 삭제 데이터
   */
  async multipleDeleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletedTags = await this.prisma.tagInfo.updateMany({
        where: { tagNo: { in: deleteData.tagNoList, }, },
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
          successCnt: deletedTags.count,
          failCnt: deleteData.tagNoList.length - deletedTags.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  // ========================================================
  // 포스트 태그 매핑
  // ========================================================

  /**
   * @description 포스트 태그 매핑 조회
   * @param searchData 검색 데이터
   */
  async getPostTagMapping(searchData: SearchPstTagMpngDto): Promise<RepoResponseType<ListType<SelectPstTagMpngListItemType>> | null> {
    try {
      const { pstNo, delYn, } = searchData;

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.pstTagMpng.findMany({
          where: {
            delYn: delYn || 'N',
            post: {
              is: {
                pstNo,
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
        }),
        this.prisma.pstTagMpng.count({
          where: {
            delYn: delYn || 'N',
            post: {
              is: {
                pstNo,
              },
            },
          },
        }),
      ]);

      return prismaResponse(
        true,
        {
          list: list.map((item, index) => ({
            ...item,
            totalCnt,
            rowNo: index + 1,
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
   * @description 태그 번호와 포스트 번호로 포스트 태그 매핑 조회
   * @param tagNo 태그 번호
   * @param pstNo 포스트 번호
   */
  async getPostTagMappingByTagNo(tagNo: number, pstNo: number): Promise<RepoResponseType<SelectPstTagMpngType> | null> {
    try {
      const tag = await this.prisma.pstTagMpng.findUnique({
        where: {
          pstNo_tagNo: {
            tagNo,
            pstNo,
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

      return prismaResponse(
        true,
        tag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 포스트 태그 매핑 추가
   * @param userNo 사용자 번호
   * @param createData 포스트 태그 매핑 추가 데이터
   */
  async addTagToPost(userNo: number, createData: CreatePstTagMpngDto): Promise<RepoResponseType<SelectPstTagMpngType> | null> {
    try {
      const newTag = await this.prisma.pstTagMpng.create({
        data: {
          ...createData,
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

      return prismaResponse(
        true,
        newTag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 포스트 태그 매핑 추가
   * @param userNo 사용자 번호
   * @param createData 포스트 태그 매핑 추가 데이터
   */
  async multipleAddTagToPost(userNo: number, createData: CreatePstTagMpngDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const newTags = await this.prisma.pstTagMpng.createMany({
        data: createData.map((item) => ({
          ...item,
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        })),
      });

      return prismaResponse(
        true,
        {
          successCnt: newTags.count,
          failCnt: createData.length - newTags.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 포스트 태그 매핑 삭제
   * @param userNo 사용자 번호
   * @param deleteData 포스트 태그 매핑 삭제 데이터
   */
  async removeTagFromPost(userNo: number, deleteData: DeletePstTagMpngDto): Promise<RepoResponseType<boolean> | null> {
    try {
      const deletedTag = await this.prisma.pstTagMpng.update({
        where: { tagMapNo: deleteData.tagMapNo, },
        data: {
          delYn: 'Y',
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        !!deletedTag
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 포스트 태그 매핑 삭제
   * @param userNo 사용자 번호
   * @param deleteData 포스트 태그 매핑 삭제 데이터
   */
  async multipleRemoveTagFromPost(userNo: number, deleteData: DeletePstTagMpngDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletedTags = await this.prisma.pstTagMpng.updateMany({
        where: { tagMapNo: { in: deleteData.tagMapNoList, }, },
        data: {
          delYn: 'Y',
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(
        true,
        {
          successCnt: deletedTags.count,
          failCnt: deleteData.tagMapNoList.length - deletedTags.count,
          failNoList: [],
        }
      );
    }
    catch (error) {
      return prismaError(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
