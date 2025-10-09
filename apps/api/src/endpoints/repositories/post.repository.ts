import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreatePostDto, DeletePostDto, SearchPostDto, UpdatePostDto } from '@/dto';
import type { CreatePostShareLogDto } from '@/dto/post-sharelog.dto';
import type { CreatePostBookmarkDto, DeletePostBookmarkDto, SearchPostBookmarkDto } from '@/dto/post.dto';
import type { AnalyzeStatDto } from '@/dto/post.dto';
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
  AverageViewStatItemType
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
   * @description 게시글 분석 데이터 조회
   * @param pstNo 게시글 번호
   */
  async getAnalyzePostData(analyzeStatData: AnalyzeStatDto, pstNo?: number): Promise<RepoResponseType<AnalyzePostItemType[]> | null> {
    try {
      const { mode, startDt, endDt, } = analyzeStatData;

      const analyzeData = await this.prisma.$queryRaw<AnalyzePostItemType[]>`
        with ${createDateSeries(startDt, endDt, mode)}
        select
          b.date_start as "dateStart",
          b.date_end as "dateEnd",

          -- 1. 게시글 발행 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_info p
            where
              case when ${pstNo} is not null
                then p.pst_no = ${pstNo}
                else true
              end
              and p.publ_dt::timestamptz >= b.date_start
              and p.publ_dt::timestamptz < b.date_end
              and p.del_yn = 'N'
          ) as "publishCount",

          -- 2. 게시글 수정 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_info p
            where
              case when ${pstNo} is not null
                then p.pst_no = ${pstNo}
                else true
              end
              and p.updt_dt::timestamptz >= b.date_start
              and p.updt_dt::timestamptz < b.date_end
              and p.del_yn = 'N'
              and p.updt_dt != p.crt_dt
          ) as "updateCount",

          -- 3. 게시글 삭제 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_info p
            where
              case when ${pstNo} is not null
                then p.pst_no = ${pstNo}
                else true
              end
              and p.del_dt::timestamptz >= b.date_start
              and p.del_dt::timestamptz < b.date_end
              and p.del_yn = 'Y'
          ) as "deleteCount",

          -- 4. 조회 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_view_log v
            where
              case when ${pstNo} is not null
                then v.pst_no = ${pstNo}
                else true
              end
              and v.view_dt::timestamptz >= b.date_start
              and v.view_dt::timestamptz < b.date_end
          ) as "viewCount",

          -- 5. 북마크 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_bkmrk_mpng bm
            where
              case when ${pstNo} is not null
                then bm.pst_no = ${pstNo}
                else true
              end
              and bm.crt_dt::timestamptz >= b.date_start
              and bm.crt_dt::timestamptz < b.date_end
              and bm.del_yn = 'N'
          ) as "bookmarkCount",

          -- 6. 공유 수 (서브쿼리)
          (
            select count(1)
            from nihilog.pst_shrn_log sl
            where
              case when ${pstNo} is not null
                then sl.pst_no = ${pstNo}
                else true
              end
              and sl.shrn_dt::timestamptz >= b.date_start
              and sl.shrn_dt::timestamptz < b.date_end
          ) as "shareCount",

          -- 7. 댓글 수 (서브쿼리)
          (
            select count(1)
            from nihilog.cmnt_info c
            where
              case when ${pstNo} is not null
                then c.pst_no = ${pstNo}
                else true
              end
              and c.crt_dt::timestamptz >= b.date_start
              and c.crt_dt::timestamptz < b.date_end
              and c.del_yn = 'N'
          ) as "commentCount"

        from bucket b
        order by b.date_start
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
        with ${createDateSeries(startDt, endDt, mode)}
        select
          b.date_start as "dateStart",
          b.date_end as "dateEnd",
          avg(post_view_counts.view_count) as "avgViewCount"
        from bucket b
        left join (
          select
            date_trunc(${mode}, v.view_dt::timestamptz) as view_date,
            v.pst_no,
            count(*) as view_count
          from nihilog.pst_view_log v
          where v.view_dt::timestamptz >= ${startDt}::timestamptz
            and v.view_dt::timestamptz <= ${endDt}::timestamptz
          group by date_trunc(${mode}, v.view_dt::timestamptz), v.pst_no
        ) post_view_counts
          on post_view_counts.view_date = b.date_start
        group by
          b.date_start, b.date_end
        order by
          b.date_start
      `;

      return prismaResponse(true, dataList);
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

      const stats = await this.prisma.$queryRaw<SharePlatformStatItemType[]>`
        SELECT
          shrn_site AS platform,
          COUNT(1)::int AS count
        FROM
          nihilog.pst_shrn_log
        WHERE
          case when ${pstNo} is not null
            then pst_no = ${pstNo}
            else true
          end
          AND shrn_dt >= ${startDt}
          AND shrn_dt <= ${endDt}
        GROUP BY
          shrn_site
        ORDER BY
          count DESC, platform
      `;

      return prismaResponse(true, stats);
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
