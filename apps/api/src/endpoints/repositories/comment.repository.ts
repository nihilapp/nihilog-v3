import { Inject, Injectable } from '@nestjs/common';
import { CommentStatus, Prisma, type PrismaClient } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { MESSAGE } from '@/code/messages';
import type { CreateCommentDto, DeleteCommentDto, SearchCommentDto, UpdateCommentDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type {
  SelectCommentListItemType,
  SelectCommentType,
  AnalyzeCommentStatItemType,
  TopPostsByCommentItemType,
  TopUsersByCommentItemType,
  AverageCommentPerPostItemType,
  CommentStatusDistributionItemType,
  CommentApprovalRateItemType,
  CommentSpamRateItemType,
  CommentReplyRatioItemType,
  CommentAverageDepthItemType,
  PostsWithoutCommentsItemType
} from '@/endpoints/prisma/types/comment.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { createDateSeries } from '@/utils/createDateSeries';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class CommentRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ========================================================
  // 댓글 통계 관련 메서드
  // ========================================================

  /**
   * @description 댓글 분석 통계 (9개 지표 통합) - 최적화된 버전
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 포스트 번호 (선택사항)
   */
  async getAnalyzeCommentData(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<AnalyzeCommentStatItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzeCommentStatItemType[]>`
        WITH date_series AS ${createDateSeries(
          startDt,
          endDt,
          mode
        )},

        -- 모든 통계를 하나의 CTE로 통합
        all_stats AS (
          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'new_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.del_dt::timestamptz) AS stat_date,
            'delete_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.del_dt::timestamptz >= ${startDt}::timestamptz
            AND c.del_dt::timestamptz < ${endDt}::timestamptz
            AND c.del_yn = 'Y'
          GROUP BY date_trunc(${mode}, c.del_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'pending_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.cmnt_sts = 'PENDING'
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'approved_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.cmnt_sts = 'APPROVED'
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'rejected_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.cmnt_sts = 'REJECTED'
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'spam_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.cmnt_sts = 'SPAM'
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'top_level_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.prnt_cmnt_no IS NULL
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)

          UNION ALL

          SELECT
            date_trunc(${mode}, c.crt_dt::timestamptz) AS stat_date,
            'reply_comment' AS stat_type,
            COUNT(*) AS stat_count
          FROM cmnt_info c
          WHERE ${pstNo
            ? Prisma.sql`c.pst_no = ${pstNo}`
            : Prisma.sql`TRUE`}
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz < ${endDt}::timestamptz
            AND c.prnt_cmnt_no IS NOT NULL
            AND c.del_yn = 'N'
          GROUP BY date_trunc(${mode}, c.crt_dt::timestamptz)
        )

        SELECT
          ds.date_start AS "dateStart",
          ds.date_end AS "dateEnd",
          COALESCE(SUM(CASE WHEN as.stat_type = 'new_comment' THEN as.stat_count ELSE 0 END), 0) AS "newCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'delete_comment' THEN as.stat_count ELSE 0 END), 0) AS "deleteCommentCount",
          0 AS "activeCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'pending_comment' THEN as.stat_count ELSE 0 END), 0) AS "pendingCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'approved_comment' THEN as.stat_count ELSE 0 END), 0) AS "approvedCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'rejected_comment' THEN as.stat_count ELSE 0 END), 0) AS "rejectedCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'spam_comment' THEN as.stat_count ELSE 0 END), 0) AS "spamCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'top_level_comment' THEN as.stat_count ELSE 0 END), 0) AS "topLevelCommentCount",
          COALESCE(SUM(CASE WHEN as.stat_type = 'reply_comment' THEN as.stat_count ELSE 0 END), 0) AS "replyCommentCount"
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
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 포스트별 댓글 수 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopPostsByCommentCount(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopPostsByCommentItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopPostsByCommentItemType[]>`
        SELECT
          c.pst_no AS "pstNo",
          p.pst_ttl AS "pstTtl",
          COUNT(c.cmnt_no) AS "commentCount",
          COUNT(CASE WHEN c.cmnt_sts = 'APPROVED' THEN 1 END) AS "approvedCommentCount",
          MAX(c.crt_dt) AS "lastCommentDate"
        FROM cmnt_info c
        LEFT JOIN pst_info p ON c.pst_no = p.pst_no
        WHERE c.del_yn = 'N'
          ${analyzeStatData
            ? Prisma.sql`AND c.crt_dt >= ${analyzeStatData.startDt} AND c.crt_dt <= ${analyzeStatData.endDt}`
            : Prisma.empty}
        GROUP BY c.pst_no, p.pst_ttl
        ORDER BY COUNT(c.cmnt_no) DESC
        LIMIT ${limit}
      `;

      return prismaResponse(
        true,
        result
      );
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
  ): Promise<RepoResponseType<TopUsersByCommentItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<TopUsersByCommentItemType[]>`
        SELECT
          c.crt_no AS "userNo",
          u.user_nm AS "userName",
          COUNT(c.cmnt_no) AS "commentCount",
          COUNT(CASE WHEN c.cmnt_sts = 'APPROVED' THEN 1 END) AS "approvedCommentCount",
          MAX(c.crt_dt) AS "lastCommentDate"
        FROM cmnt_info c
        LEFT JOIN user_info u ON c.crt_no = u.user_no
        WHERE c.del_yn = 'N'
          ${analyzeStatData
            ? Prisma.sql`AND c.crt_dt >= ${analyzeStatData.startDt} AND c.crt_dt <= ${analyzeStatData.endDt}`
            : Prisma.empty}
        GROUP BY c.crt_no, u.user_nm
        ORDER BY COUNT(c.cmnt_no) DESC
        LIMIT ${limit}
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 평균 댓글 수 / 포스트 (최적화된 버전)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageCommentCountPerPost(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageCommentPerPostItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<AverageCommentPerPostItemType[]>`
        WITH post_comment_stats AS (
          SELECT
            p.pst_no,
            COUNT(c.cmnt_no) as comment_count
          FROM pst_info p
          LEFT JOIN cmnt_info c ON p.pst_no = c.pst_no
            AND c.del_yn = 'N'
            AND c.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND c.crt_dt::timestamptz <= ${endDt}::timestamptz
          WHERE p.del_yn = 'N'
            AND p.crt_dt::timestamptz >= ${startDt}::timestamptz
            AND p.crt_dt::timestamptz <= ${endDt}::timestamptz
          GROUP BY p.pst_no
        )
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN COUNT(*) > 0
            THEN ROUND(AVG(comment_count)::DECIMAL, 2)
            ELSE 0
          END AS "avgCommentCount"
        FROM post_comment_stats
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 상태별 분포
   */
  async getCommentStatusDistribution(): Promise<RepoResponseType<CommentStatusDistributionItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<CommentStatusDistributionItemType[]>`
        WITH status_counts AS (
          SELECT
            cmnt_sts AS status,
            COUNT(*) AS count
          FROM cmnt_info
          WHERE del_yn = 'N'
          GROUP BY cmnt_sts
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

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 승인율
   * @param analyzeStatData 분석 통계 데이터
   */
  async getCommentApprovalRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentApprovalRateItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<CommentApprovalRateItemType[]>`
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN COUNT(*) > 0
            THEN ROUND(COUNT(CASE WHEN cmnt_sts = 'APPROVED' THEN 1 END)::DECIMAL / COUNT(*), 4)
            ELSE 0
          END AS "approvalRate",
          COUNT(*) AS "totalComments",
          COUNT(CASE WHEN cmnt_sts = 'APPROVED' THEN 1 END) AS "approvedComments"
        FROM cmnt_info
        WHERE del_yn = 'N'
          AND crt_dt >= ${startDt}
          AND crt_dt <= ${endDt}
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 스팸 댓글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  async getCommentSpamRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentSpamRateItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<CommentSpamRateItemType[]>`
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN COUNT(*) > 0
            THEN ROUND(COUNT(CASE WHEN cmnt_sts = 'SPAM' THEN 1 END)::DECIMAL / COUNT(*), 4)
            ELSE 0
          END AS "spamRate",
          COUNT(*) AS "totalComments",
          COUNT(CASE WHEN cmnt_sts = 'SPAM' THEN 1 END) AS "spamComments"
        FROM cmnt_info
        WHERE del_yn = 'N'
          AND crt_dt >= ${startDt}
          AND crt_dt <= ${endDt}
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 답글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  async getCommentReplyRatio(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentReplyRatioItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<CommentReplyRatioItemType[]>`
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN COUNT(*) > 0
            THEN ROUND(COUNT(CASE WHEN prnt_cmnt_no IS NOT NULL THEN 1 END)::DECIMAL / COUNT(*), 4)
            ELSE 0
          END AS "replyRatio",
          COUNT(*) AS "totalComments",
          COUNT(CASE WHEN prnt_cmnt_no IS NOT NULL THEN 1 END) AS "replyComments"
        FROM cmnt_info
        WHERE del_yn = 'N'
          AND crt_dt >= ${startDt}
          AND crt_dt <= ${endDt}
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 평균 답글 깊이
   * @param analyzeStatData 분석 통계 데이터
   */
  async getCommentAverageDepth(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentAverageDepthItemType[]> | null> {
    try {
      const { startDt, endDt, } = analyzeStatData;

      const result = await this.prisma.$queryRaw<CommentAverageDepthItemType[]>`
        WITH RECURSIVE comment_depth AS (
          -- 최상위 댓글들 (깊이 0)
          SELECT
            cmnt_no,
            prnt_cmnt_no,
            0 AS depth
          FROM cmnt_info
          WHERE prnt_cmnt_no IS NULL
            AND del_yn = 'N'
            AND crt_dt >= ${startDt}
            AND crt_dt <= ${endDt}

          UNION ALL

          -- 답글들 (깊이 +1)
          SELECT
            c.cmnt_no,
            c.prnt_cmnt_no,
            cd.depth + 1
          FROM cmnt_info c
          INNER JOIN comment_depth cd ON c.prnt_cmnt_no = cd.cmnt_no
          WHERE c.del_yn = 'N'
            AND c.crt_dt >= ${startDt}
            AND c.crt_dt <= ${endDt}
        )
        SELECT
          ${startDt} AS "dateStart",
          ${endDt} AS "dateEnd",
          CASE
            WHEN COUNT(*) > 0
            THEN ROUND(AVG(depth)::DECIMAL, 2)
            ELSE 0
          END AS "avgDepth",
          CASE
            WHEN COUNT(*) > 0
            THEN MAX(depth)
            ELSE 0
          END AS "maxDepth"
        FROM comment_depth
        WHERE depth > 0
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 없는 포스트 목록 (최적화된 버전)
   */
  async getPostsWithoutComments(): Promise<RepoResponseType<PostsWithoutCommentsItemType[]> | null> {
    try {
      const result = await this.prisma.$queryRaw<PostsWithoutCommentsItemType[]>`
        SELECT
          p.pst_no AS "pstNo",
          p.pst_ttl AS "pstTtl",
          COALESCE(p.publ_dt, p.crt_dt) AS "publishDate",
          COALESCE(p.pst_view, 0) AS "viewCount",
          EXTRACT(DAYS FROM (NOW() - COALESCE(p.publ_dt, p.crt_dt)::timestamp)) AS "daysSincePublish"
        FROM pst_info p
        WHERE p.del_yn = 'N'
          AND NOT EXISTS (
            SELECT 1
            FROM cmnt_info c
            WHERE c.pst_no = p.pst_no
              AND c.del_yn = 'N'
          )
        ORDER BY COALESCE(p.publ_dt, p.crt_dt) DESC
        LIMIT 50
      `;

      return prismaResponse(
        true,
        result
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  // ================================================
  // 일반 사용자 기능
  // ================================================

  /**
   * @description 댓글 목록 조회
   * @param searchData 검색 데이터
   */
  async getCommentList(searchData: SearchCommentDto): Promise<RepoResponseType<ListType<SelectCommentListItemType>> | null> {
    try {
      const { page, strtRow, endRow, delYn, cmntSts, srchType, srchKywd, crtDtFrom, crtDtTo, orderBy, pstNo, useYn, } = searchData;

      const where: Prisma.CmntInfoWhereInput = {
        ...(delYn && { delYn, }),
        ...(useYn && { useYn, }),
        ...(srchKywd && (srchType === 'userEmlAddr') && {
          creator: {
            is: {
              emlAddr: srchKywd,
            },
          },
        }),
        ...(srchKywd && (srchType === 'cmntCntnt') && {
          cmntCntnt: {
            contains: srchKywd,
          },
        }),
        ...(srchKywd && (srchType === 'userNm') && {
          creator: {
            is: {
              userNm: srchKywd,
            },
          },
        }),
        ...(pstNo && { pstNo, }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
          },
        }),
        ...(cmntSts && (cmntSts === 'PENDING') && {
          cmntSts: CommentStatus.PENDING,
        }),
        ...(cmntSts && (cmntSts === 'APPROVED') && {
          cmntSts: CommentStatus.APPROVED,
        }),
        ...(cmntSts && (cmntSts === 'REJECTED') && {
          cmntSts: CommentStatus.REJECTED,
        }),
        ...(cmntSts && (cmntSts === 'SPAM') && {
          cmntSts: CommentStatus.SPAM,
        }),
      };

      const { offset: skip, limit: take, } = pageHelper(
        page,
        strtRow,
        endRow
      );

      const [
        list,
        totalCnt,
      ] = await this.prisma.$transaction([
        this.prisma.cmntInfo.findMany({
          where,
          skip,
          take,
          include: {
            post: true,
            parentComment: true,
            replies: true,
            creator: true,
          },
          orderBy: {
            ...(orderBy === 'LATEST') && {
              crtDt: 'desc',
            },
            ...(orderBy === 'OLDEST') && {
              crtDt: 'asc',
            },
          },
        }),
        this.prisma.cmntInfo.count({ where, }),
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
   * @description 댓글 상세 조회
   * @param cmntNo 댓글 번호
   */
  async getCommentByCmntNo(cmntNo: number): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const comment = await this.prisma.cmntInfo.findUnique({
        where: {
          cmntNo,
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      if (!comment) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.COMMENT.ADMIN.NOT_FOUND
        );
      }

      return prismaResponse(
        true,
        comment
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 생성
   * @param userNo 사용자 번호
   * @param createData 생성 데이터
   */
  async createComment(userNo: number, createData: CreateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const { pstNo, cmntCntnt, cmntSts, prntCmntNo, } = createData;

      const newComment = await this.prisma.cmntInfo.create({
        data: {
          pstNo,
          cmntCntnt,
          cmntSts: cmntSts || CommentStatus.PENDING,
          prntCmntNo: prntCmntNo || null,
          useYn: 'Y',
          delYn: 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      return prismaResponse(
        true,
        newComment
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 수정
   * @param userNo 사용자 번호
   * @param cmntNo 댓글 번호
   * @param updateData 수정 데이터
   */
  async updateComment(userNo: number, cmntNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<SelectCommentType> | null> {
    try {
      const updateComment = await this.prisma.cmntInfo.update({
        where: {
          cmntNo,
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          post: true,
          parentComment: true,
          replies: true,
          creator: true,
        },
      });

      return prismaResponse(
        true,
        updateComment
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 삭제
   * @param userNo 사용자 번호
   * @param cmntNo 댓글 번호
   */
  async deleteComment(userNo: number, cmntNo: number): Promise<RepoResponseType<boolean> | null> {
    try {
      const deleteComment = await this.prisma.cmntInfo.update({
        where: {
          cmntNo,
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
        !!deleteComment
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  // ================================================
  // 어드민 기능
  // ================================================

  /**
   * @description 댓글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async multipleUpdateComment(userNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const updatedComments = await this.prisma.cmntInfo.updateManyAndReturn({
        where: {
          cmntNo: { in: updateData.cmntNoList, },
        },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        select: {
          cmntNo: true,
        },
      });

      const failNoList = updateData.cmntNoList.filter((item) => !updatedComments.some((updatedComment) => updatedComment.cmntNo === item));

      return prismaResponse(
        true,
        {
          successCnt: updatedComments.length,
          failCnt: updateData.cmntNoList.length - updatedComments.length,
          failNoList,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 댓글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제 데이터
   */
  async multipleDeleteComment(userNo: number, deleteData: DeleteCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const deletedComments = await this.prisma.cmntInfo.updateManyAndReturn({
        where: {
          cmntNo: { in: deleteData.cmntNoList, },
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
          cmntNo: true,
        },
      });

      const failNoList = deleteData.cmntNoList.filter((item) => !deletedComments.some((deletedComment) => deletedComment.cmntNo === item));

      return prismaResponse(
        true,
        {
          successCnt: deletedComments.length,
          failCnt: deleteData.cmntNoList.length - deletedComments.length,
          failNoList,
        }
      );
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
