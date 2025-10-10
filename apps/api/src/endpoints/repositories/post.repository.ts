import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreatePostDto, DeletePostDto, SearchPostDto, UpdatePostDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import type { CreatePostShareLogDto } from '@/dto/post-sharelog.dto';
import type { CreatePostBookmarkDto, DeletePostBookmarkDto, SearchPostBookmarkDto } from '@/dto/post.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectPostBookmarkListItemType,
  SelectPostBookmarkType,
  SelectPostListItemType,
  SelectPostType,
  SelectPostShareLogType,
  SelectPostViewLogType,
  SharePlatformStatItemType,
  AnalyzePostItemType,
  AverageViewStatItemType,
  AverageBookmarkStatItemType,
  TopPopularPostItemType,
  TopCommentPostItemType,
  PostStatusRatioItemType
} from '@/endpoints/prisma/types/post.types';
import { createDateSeries } from '@/utils/createDateSeries';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class PostRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ===== 일반 사용자 기능 =====

  /**
   * @description 공개 게시글 목록 조회 (통합 검색)
   * @param searchData 검색 데이터
   */
  async getPostList(searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, rlsYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
        rlsYn: rlsYn || 'Y',
        ...(srchKywd && srchType && {
          [ srchType ]: {
            contains: srchKywd,
          },
        }),
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstInfo.findMany({
          where,
          orderBy: { pstNo: 'desc', },
          skip,
          take,
        }),
        this.prisma.pstInfo.count({ where, }),
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
   * @description 특정 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  async getPostByPstNo(pstNo: number): Promise<RepoResponseType<SelectPostType> | null> {
    try {
      const post = await this.prisma.pstInfo.findUnique({
        where: { pstNo, },
      });

      return prismaResponse(true, post);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description SEO 친화적 URL로 게시글 조회
   * @param pstCd 게시글 슬러그
   */
  async getPostByPstCd(pstCd: string): Promise<RepoResponseType<SelectPostType> | null> {
    try {
      const post = await this.prisma.pstInfo.findFirst({
        where: { pstCd, },
      });

      return prismaResponse(true, post);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그별 게시글 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getPostListByTagNo(
    tagNo: number,
    searchData: SearchPostDto
  ): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, rlsYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
        rlsYn: rlsYn || 'Y',
        ...(srchKywd && srchType && {
          [ srchType ]: {
            contains: srchKywd,
          },
        }),
        tags: {
          some: {
            tagNo,
            delYn: 'N',
          },
        },
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstInfo.findMany({
          where,
          orderBy: { pstNo: 'desc', },
          skip,
          take,
        }),
        this.prisma.pstInfo.count({ where, orderBy: { pstNo: 'desc', }, }),
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
   * @description 카테고리별 게시글 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getPostListByCtgryNo(
    ctgryNo: number,
    searchData: SearchPostDto
  ): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, rlsYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        ctgryNo,
        delYn: delYn || 'N',
        rlsYn: rlsYn || 'Y',
        ...(srchKywd && srchType && {
          [ srchType ]: {
            contains: srchKywd,
          },
        }),
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstInfo.findMany({
          where,
          orderBy: { pstNo: 'desc', },
          skip,
          take,
        }),
        this.prisma.pstInfo.count({
          where,
          orderBy: { pstNo: 'desc', },
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
   * @description 년월별 게시글 목록 조회
   * @param date 날짜(yyyy-MM)
   * @param searchData 검색 데이터
   */
  async getPostListFromArchive(
    date: string,
    searchData: SearchPostDto
  ): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, rlsYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
        rlsYn: rlsYn || 'Y',
        publDt: {
          startsWith: date,
        },
        ...(srchKywd && srchType && {
          [ srchType ]: {
            contains: srchKywd,
          },
        }),
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstInfo.findMany({
          where,
          orderBy: {
            pstNo: 'desc',
          },
          skip,
          take,
        }),
        this.prisma.pstInfo.count({
          where,
          orderBy: {
            pstNo: 'desc',
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

  // ===== 사용자 상호작용 기능 =====
  /**
   * @description 게시글 분석 데이터 조회 (최적화된 버전)
   * @param pstNo 게시글 번호
   */
  async getAnalyzePostData(analyzeStatData: AnalyzeStatDto, pstNo?: number): Promise<RepoResponseType<AnalyzePostItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzePostItemType[]>`
        WITH date_series AS ${createDateSeries(startDt, endDt, mode)},

        -- 모든 통계를 하나의 CTE로 통합
        all_stats AS (
          SELECT
            date_trunc(${mode}, p.publ_dt::timestamptz) AS stat_date,
            'publish' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_info p
          WHERE ${pstNo
            ? Prisma.sql`p.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND p.publ_dt::timestamptz >= ${startDt}::timestamptz
            AND p.publ_dt::timestamptz < ${endDt}::timestamptz
            AND p.del_yn = 'N'
          GROUP BY date_trunc(${mode}, p.publ_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, p.updt_dt::timestamptz) AS stat_date,
            'update' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_info p
          WHERE ${pstNo
            ? Prisma.sql`p.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND p.updt_dt::timestamptz >= ${startDt}::timestamptz
            AND p.updt_dt::timestamptz < ${endDt}::timestamptz
            AND p.del_yn = 'N'
            AND p.updt_dt != p.crt_dt
          GROUP BY date_trunc(${mode}, p.updt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, p.del_dt::timestamptz) AS stat_date,
            'delete' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_info p
          WHERE ${pstNo
            ? Prisma.sql`p.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND p.del_dt::timestamptz >= ${startDt}::timestamptz
            AND p.del_dt::timestamptz < ${endDt}::timestamptz
            AND p.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, p.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, v.view_dt::timestamptz) AS stat_date,
            'view' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_view_log v
          WHERE ${pstNo
            ? Prisma.sql`v.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND v.view_dt::timestamptz >= ${startDt}::timestamptz
            AND v.view_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, v.view_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, bm.crt_dt::timestamptz) AS stat_date,
            'bookmark' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_bkmrk_mpng bm
          WHERE ${pstNo
            ? Prisma.sql`bm.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND bm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND bm.crt_dt::timestamptz < ${endDt}::timestamptz
            AND bm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, bm.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, sl.shrn_dt::timestamptz) AS stat_date,
            'share' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.pst_shrn_log sl
          WHERE ${pstNo
            ? Prisma.sql`sl.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND sl.shrn_dt::timestamptz >= ${startDt}::timestamptz
            AND sl.shrn_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, sl.shrn_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM nihilog.cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)
        )

        SELECT
          ds.date_start AS "dateStart",
          ds.date_end AS "dateEnd",
          COALESCE(SUM(CASE WHEN as.stat_type = 'publish' THEN as.stat_count ELSE 0 END), 0) AS "publishCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'update' THEN as.stat_count ELSE 0 END), 0) AS "updateCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'delete' THEN as.stat_count ELSE 0 END), 0) AS "deleteCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'view' THEN as.stat_count ELSE 0 END), 0) AS "viewCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'bookmark' THEN as.stat_count ELSE 0 END), 0) AS "bookmarkCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'share' THEN as.stat_count ELSE 0 END), 0) AS "shareCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'comment' THEN as.stat_count ELSE 0 END), 0) AS "commentCount"
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
   * @description 게시글별 평균 조회수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageForPostView(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageViewStatItemType[]> | null> {
    try {
      const { startDt, endDt, mode, } = analyzeStatData;

      const dataList = await this.prisma.$queryRaw<AverageViewStatItemType[]>`
        WITH ${createDateSeries(startDt, endDt, mode)}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          AVG(post_view_counts.view_count) AS "avgViewCount"
        FROM bucket b
        LEFT JOIN (
          SELECT
            date_trunc(${mode}, v.view_dt::timestamptz) AS view_date,
            v.pst_no,
            COUNT(*) AS view_count
          FROM nihilog.pst_view_log v
          WHERE v.view_dt::timestamptz >= ${startDt}::timestamptz
            AND v.view_dt::timestamptz <= ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, v.view_dt::timestamptz), v.pst_no
        ) post_view_counts
          ON post_view_counts.view_date = b.date_start
        GROUP BY
          b.date_start, b.date_end
        ORDER BY
          b.date_start
      `;

      return prismaResponse(true, dataList);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글당 평균 북마크 수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageBookmarkCountPerPost(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageBookmarkStatItemType[]> | null> {
    try {
      const { startDt, endDt, mode, } = analyzeStatData;

      const dataList = await this.prisma.$queryRaw<AverageBookmarkStatItemType[]>`
        WITH ${createDateSeries(startDt, endDt, mode)}
        SELECT
          b.date_start AS "dateStart",
          b.date_end AS "dateEnd",
          AVG(post_bookmark_counts.bookmark_count) AS "avgBookmarkCount"
        FROM bucket b
        LEFT JOIN (
          SELECT
            date_trunc(${mode}, bm.crt_dt::timestamptz) AS bookmark_date,
            bm.pst_no,
            COUNT(*) AS bookmark_count
          FROM nihilog.pst_bkmrk_mpng bm
          WHERE bm.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND bm.crt_dt::timestamptz <= ${endDt}::timestamptz
            AND bm.del_yn = 'N'
          GROUP BY date_trunc(${mode}, bm.crt_dt::timestamptz), bm.pst_no
        ) post_bookmark_counts
          ON post_bookmark_counts.bookmark_date = b.date_start
        GROUP BY
          b.date_start, b.date_end
        ORDER BY
          b.date_start
      `;

      return prismaResponse(true, dataList);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 인기 게시글 TOP N (조회수 기준)
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopPopularPostsByViewCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopPopularPostItemType[]> | null> {
    try {
      const where: Prisma.PstInfoWhereInput = {
        delYn: 'N',
        rlsYn: 'Y',
        ...(analyzeStatData && {
          publDt: {
            gte: analyzeStatData.startDt,
            lte: analyzeStatData.endDt,
          },
        }),
      };

      const topPosts = await this.prisma.pstInfo.findMany({
        where,
        select: {
          pstNo: true,
          pstTtl: true,
          pstView: true,
          publDt: true,
        },
        orderBy: [
          { pstView: 'desc', },
          { publDt: 'desc', },
        ],
        take: limit,
      });

      const formattedPosts: TopPopularPostItemType[] = topPosts.map((post) => ({
        pstNo: post.pstNo,
        title: post.pstTtl,
        viewCount: post.pstView,
        publishDate: post.publDt,
      }));

      return prismaResponse(true, formattedPosts);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 많은 게시글 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopPostsByCommentCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopCommentPostItemType[]> | null> {
    try {
      let whereClause = Prisma.sql`WHERE p.del_yn = 'N' AND p.rls_yn = 'Y'`;

      if (analyzeStatData) {
        const { startDt, endDt, } = analyzeStatData;
        whereClause = Prisma.sql`
          WHERE p.del_yn = 'N'
            AND p.rls_yn = 'Y'
            AND p.publ_dt::timestamptz >= ${startDt}::timestamptz
            AND p.publ_dt::timestamptz <= ${endDt}::timestamptz
        `;
      }

      const topPosts = await this.prisma.$queryRaw<TopCommentPostItemType[]>`
        SELECT
          p.pst_no AS "pstNo",
          p.pst_ttl AS "title",
          COUNT(c.cmnt_no) AS "commentCount",
          p.publ_dt AS "publishDate"
        FROM nihilog.pst_info p
        LEFT JOIN nihilog.cmnt_info c ON p.pst_no = c.pst_no AND c.del_yn = 'N'
        ${whereClause}
        GROUP BY p.pst_no, p.pst_ttl, p.publ_dt
        ORDER BY COUNT(c.cmnt_no) DESC, p.publ_dt DESC
        LIMIT ${limit}
      `;

      return prismaResponse(true, topPosts);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 상태 비율 조회 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getPostStatusRatio(analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<PostStatusRatioItemType[]> | null> {
    try {
      // Raw SQL로 한 번에 처리하여 성능 향상
      const statusRatio = await this.prisma.$queryRaw<PostStatusRatioItemType[]>`
        WITH status_counts AS (
          SELECT
            pst_stts,
            COUNT(*) as count
          FROM nihilog.pst_info
          WHERE del_yn = 'N'
            ${analyzeStatData
              ? Prisma.sql`
                AND publ_dt::timestamptz >= ${analyzeStatData.startDt}::timestamptz
                AND publ_dt::timestamptz <= ${analyzeStatData.endDt}::timestamptz
              `
              : Prisma.empty}
          GROUP BY pst_stts
        ),
        total_count AS (
          SELECT SUM(count) as total FROM status_counts
        )
        SELECT
          sc.pst_stts as status,
          sc.count,
          CASE
            WHEN tc.total > 0
            THEN ROUND((sc.count::decimal / tc.total) * 100, 2)
            ELSE 0
          END as ratio
        FROM status_counts sc
        CROSS JOIN total_count tc
        ORDER BY sc.count DESC
      `;

      return prismaResponse(true, statusRatio);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 플랫폼별 공유 통계 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (선택사항 - 없으면 전체 게시글)
   */
  async getPostShareStatsByPlatform(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<SharePlatformStatItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const stats = await this.prisma.pstShrnLog.groupBy({
        by: [ 'shrnSite', ],
        where: {
          ...(pstNo && { pstNo, }),
          shrnDt: {
            gte: startDt,
            lte: endDt,
          },
        },
        _count: {
          shrnSite: true,
        },
        orderBy: {
          _count: {
            shrnSite: 'desc',
          },
        },
      });

      const formattedStats: SharePlatformStatItemType[] = stats.map((item) => ({
        platform: item.shrnSite,
        count: item._count.shrnSite,
      }));

      return prismaResponse(true, formattedStats);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 조회 로그 기록
   * @param pstNo 게시글 번호
   * @param ip 사용자 IP
   */
  async createPostViewLog(pstNo: number, ip: string): Promise<RepoResponseType<SelectPostViewLogType> | null> {
    try {
      const viewLog = await this.prisma.pstViewLog.create({
        data: {
          pstNo,
          viewerIp: ip,
          viewDt: timeToString(),
        },
      });

      return prismaResponse(true, viewLog);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 공유 로그 기록
   * @param createData 공유 로그 생성 데이터
   */
  async createPostShareLog(createData: CreatePostShareLogDto): Promise<RepoResponseType<SelectPostShareLogType> | null> {
    try {
      const shareLog = await this.prisma.pstShrnLog.create({
        data: {
          pstNo: createData.pstNo,
          shrnSite: createData.shrnSite,
          shrnDt: timeToString(createData.shrnDt),
        },
      });

      return prismaResponse(true, shareLog);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 북마크 생성
   * @param createData 북마크 생성 데이터
   */
  async createPostBookmark(createData: CreatePostBookmarkDto): Promise<RepoResponseType<SelectPostBookmarkType> | null> {
    try {
      const bookmark = await this.prisma.pstBkmrkMpng.create({
        data: {
          userNo: createData.userNo,
          pstNo: createData.pstNo,
        },
      });

      return prismaResponse(true, bookmark);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 북마크 삭제
   * @param deleteData 북마크 삭제 데이터
   */
  async deletePostBookmark(deleteData: DeletePostBookmarkDto): Promise<RepoResponseType<boolean> | null> {
    try {
      await this.prisma.pstBkmrkMpng.delete({
        where: {
          bkmrkNo: deleteData.bkmrkNo,
        },
      });

      return prismaResponse(true, true);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 북마크한 게시글 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getBookmarkedPostListByUserNo(
    userNo: number,
    searchData: SearchPostBookmarkDto
  ): Promise<RepoResponseType<ListType<SelectPostBookmarkListItemType>> | null> {
    try {
      const { page, strtRow, endRow, delYn, pstNo, } = searchData;

      const where: Prisma.PstBkmrkMpngWhereInput = {
        userNo,
        delYn: delYn || 'N',
        // 특정 게시글의 번호로 조회를 한다.
        post: {
          is: {
            pstNo: {
              equals: pstNo,
            },
          },
        },
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstBkmrkMpng.findMany({ where, skip, take, }),
        this.prisma.pstBkmrkMpng.count({ where, }),
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
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 데이터
   */
  async getAdvancedPostList(searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, rlsYn, orderBy, tagNoList, ctgryNoList, pstStts, archYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        // delYn 의 경우 관리자는 'y' 'n' 둘 다 볼 수 있어야 함.
        delYn,
        // rlsYn 의 경우 관리자는 'y' 'n' 둘 다 볼 수 있어야 함.
        rlsYn,
        // 검색은 둘 중 하나이므로 이렇게 둠.
        ...(srchKywd && (srchType === 'pstTtl') && {
          pstTtl: {
            contains: srchKywd,
            mode: 'insensitive',
          },
        }),
        ...(srchKywd && (srchType === 'pstSmry') && {
          pstSmry: {
            contains: srchKywd,
            mode: 'insensitive',
          },
        }),
        // 게시글 상태
        ...(pstStts === 'EMPTY' && {
          pstStts: 'EMPTY',
        }),
        ...(pstStts === 'WRITING' && {
          pstStts: 'WRITING',
        }),
        ...(pstStts === 'FINISHED' && {
          pstStts: 'FINISHED',
        }),
        // 보관 여부
        ...(archYn && { archYn, }),
        // 태그는 or
        ...(tagNoList && { tags: { some: { tagNo: { in: tagNoList, }, }, }, }),
        // 카테고리는 or
        ...(ctgryNoList && { ctgryNo: { in: ctgryNoList, }, }),
      };

      const { offset: skip, limit: take, } = pageHelper(page, strtRow, endRow);

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        // 관리자 관점에서는 모든 게시글을 조회해야 하고 사용자 관점에서는 공개된 글만 조회 해야 함. 둘 다 기능해야 하므로 플래그로 조작하는 것으로 진행.
        this.prisma.pstInfo.findMany({
          where,
          orderBy: {
            ...(orderBy === 'LATEST') && {
              publDt: 'desc',
            },
            ...(orderBy === 'OLDEST') && {
              publDt: 'asc',
            },
            ...(orderBy === 'POPULAR') && {
              pstView: 'desc',
            },
          },
          skip,
          take,
        }),
        this.prisma.pstInfo.count({ where, }),
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

  // ===== 관리자 기능 (작성자) =====

  /**
   * @description 새 게시글 작성
   * @param userNo 사용자 번호
   * @param createData 게시글 생성 데이터
   */
  async createPost(userNo: number, createData: CreatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    try {
      const { pstTtl, pstMtxt, } = createData;

      const newPost = await this.prisma.pstInfo.create({
        data: {
          userNo,
          pstTtl: pstTtl || '새로운 포스트',
          pstMtxt: pstMtxt || [],
          pstStts: 'EMPTY',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(true, newPost);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async updatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    try {
      const updatePost = await this.prisma.pstInfo.update({
        where: {
          pstNo: updateData.pstNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(true, updatePost);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 게시글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 일괄 수정 데이터
   */
  async multipleUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const updatePost = await this.prisma.pstInfo.updateManyAndReturn({
        where: {
          pstNo: {
            in: updateData.pstNoList,
          },
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        select: {
          pstNo: true,
        },
      });

      const failNoList = updateData.pstNoList.filter((item) => !updatePost.some((updatePostItem) => updatePostItem.pstNo === item));

      return prismaResponse(true, {
        successCnt: updatePost.length,
        failCnt: updateData.pstNoList.length - updatePost.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 게시글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 삭제 데이터
   */
  async deletePost(userNo: number, deleteData: DeletePostDto): Promise<RepoResponseType<boolean> | null> {
    try {
      const deletePost = await this.prisma.pstInfo.update({
        where: {
          pstNo: deleteData.pstNo,
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

      return prismaResponse(true, !!deletePost);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 게시글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  async multipleDeletePost(userNo: number, deleteData: DeletePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletePost = await this.prisma.pstInfo.updateManyAndReturn({
        where: {
          pstNo: {
            in: deleteData.pstNoList,
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
          pstNo: true,
        },
      });

      const failNoList = deleteData.pstNoList.filter((item) => !deletePost.some((deletePostItem) => deletePostItem.pstNo === item));

      return prismaResponse(true, {
        successCnt: deletePost.length,
        failCnt: deleteData.pstNoList.length - deletePost.length,
        failNoList,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
