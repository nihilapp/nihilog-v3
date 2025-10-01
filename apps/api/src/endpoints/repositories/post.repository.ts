import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { asc } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { PostDto, CreatePostDto, UpdatePostDto, DeletePostDto, SearchPostDto } from '@/dto';
import type { ListDto, MutationResponseDto } from '@/dto/response.dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import { likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';

const { pstInfo, userInfo, tagInfo, ctgryInfo, pstTagMpng, } = schemas;

const select = {
  pstNo: pstInfo.pstNo,
  userNo: userInfo.userNo,
  ctgryNo: ctgryInfo.ctgryNo,
  pstTtl: pstInfo.pstTtl,
  pstSmry: pstInfo.pstSmry,
  pstMtxt: pstInfo.pstMtxt,
  pstCd: pstInfo.pstCd,
  pstThmbLink: pstInfo.pstThmbLink,
  pstView: pstInfo.pstView,
  pstStts: pstInfo.pstStts,
  publDt: pstInfo.publDt,
  rlsYn: pstInfo.rlsYn,
  archYn: pstInfo.archYn,
  secrYn: pstInfo.secrYn,
  pstPswd: pstInfo.pstPswd,
  useYn: pstInfo.useYn,
  delYn: pstInfo.delYn,
  crtNo: pstInfo.crtNo,
  crtDt: pstInfo.crtDt,
  updtNo: pstInfo.updtNo,
  updtDt: pstInfo.updtDt,
  delNo: pstInfo.delNo,
  delDt: pstInfo.delDt,
};

const selectWithRowNo = {
  ...select,
  rowNo: sql<number>`row_number() over (order by ${pstInfo.pstNo} desc)`.as('row_no'),
  totalCnt: sql<number>`count(*) over ()`.as('total_cnt'),
};

@Injectable()
export class PostRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  // ===== 일반 사용자 기능 =====

  /**
   * @description 공개 게시글 목록 조회 (통합 검색)
   * @param searchData 검색 데이터
   */
  async getPostList(searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(pstInfo, searchConditions),
        eq(pstInfo.delYn, delYn || 'N'),
      ];

      const postList = await this.db
        .select(selectWithRowNo)
        .from(pstInfo)
        .where(and(...whereConditions))
        .orderBy(asc(pstInfo.pstNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      let count: number;

      if (postList.length > 0) {
        count = postList[0].totalCnt;
      }
      else {
        count = 0;
      }

      return {
        list: postList,
        totalCnt: count,
      };
    }
    catch {
      return { list: [], totalCnt: 0, };
    }
  }

  /**
   * @description 특정 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  async getPostByPstNo(pstNo: number): Promise<PostDto | null> {
    try {
      const [ post, ] = await this.db
        .select(select)
        .from(pstInfo)
        .where(eq(pstInfo.pstNo, pstNo));

      return post;
    }
    catch {
      return null;
    }
  }

  /**
   * @description SEO 친화적 URL로 게시글 조회
   * @param pstCd 게시글 슬러그
   */
  async getPostByPstCd(pstCd: string): Promise<PostDto | null> {
    try {
      const [ post, ] = await this.db
        .select(select)
        .from(pstInfo)
        .where(eq(pstInfo.pstCd, pstCd));

      return post;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그별 게시글 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getPostListByTagNo(tagNo: number, searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(pstInfo, searchConditions),
        eq(pstInfo.delYn, delYn || 'N'),
        eq(pstTagMpng.tagNo, tagNo),
      ];

      const postList = await this.db
        .select(selectWithRowNo)
        .from(pstInfo)
        .innerJoin(pstTagMpng, eq(pstInfo.pstNo, pstTagMpng.pstNo))
        .where(and(...whereConditions))
        .orderBy(asc(pstInfo.pstNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      let count: number;

      if (postList.length > 0) {
        count = postList[0].totalCnt;
      }
      else {
        count = 0;
      }

      return { list: postList, totalCnt: count, };
    }
    catch {
      return { list: [], totalCnt: 0, };
    }
  }

  /**
   * @description 카테고리별 게시글 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getPostListByCtgryNo(ctgryNo: number, searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    // TODO: 카테고리별 게시글 목록 조회 구현
    return { list: [], totalCnt: 0, };
  }

  /**
   * @description 년월별 게시글 목록 조회
   * @param year 년도
   * @param month 월
   * @param searchData 검색 데이터
   */
  async getPostListByDate(year: number, month: number, searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    // TODO: 년월별 게시글 목록 조회 구현
    return { list: [], totalCnt: 0, };
  }

  /**
   * @description 게시글 아카이브 조회
   * @param searchData 검색 데이터
   */
  async getPostArchive(searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    // TODO: 게시글 아카이브 조회 구현
    return { list: [], totalCnt: 0, };
  }

  /**
   * @description 게시글 피드 조회
   * @param searchData 검색 데이터
   */
  async getPostFeed(searchData: SearchPostDto): Promise<ListDto<PostDto>> {
    // TODO: 게시글 피드 조회 구현
    return { list: [], totalCnt: 0, };
  }

  // ===== 사용자 상호작용 기능 =====

  /**
   * @description 게시글 좋아요
   * @param userNo 사용자 번호
   * @param pstNo 게시글 번호
   */
  async likePost(userNo: number, pstNo: number): Promise<MutationResponseDto | null> {
    // TODO: 게시글 좋아요 구현
    return null;
  }

  /**
   * @description 게시글 북마크
   * @param userNo 사용자 번호
   * @param pstNo 게시글 번호
   */
  async bookmarkPost(userNo: number, pstNo: number): Promise<MutationResponseDto | null> {
    // TODO: 게시글 북마크 구현
    return null;
  }

  /**
   * @description 북마크한 게시글 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getBookmarkedPostList(userNo: number, searchData: SearchPostDto & Partial<PostDto>): Promise<ListDto<PostDto>> {
    // TODO: 북마크한 게시글 목록 조회 구현
    return { list: [], totalCnt: 0, };
  }

  // ===== 관리자 기능 (작성자) =====

  /**
   * @description 새 게시글 작성
   * @param userNo 사용자 번호
   * @param createData 게시글 생성 데이터
   */
  async createPost(userNo: number, createData: CreatePostDto): Promise<PostDto | null> {
    // TODO: 새 게시글 작성 구현
    return null;
  }

  /**
   * @description 게시글 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async updatePost(userNo: number, updateData: UpdatePostDto): Promise<PostDto | null> {
    // TODO: 게시글 수정 구현
    return null;
  }

  /**
   * @description 다수 게시글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 일괄 수정 데이터
   */
  async multipleUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<PostDto[] | null> {
    // TODO: 다수 게시글 일괄 수정 구현
    return null;
  }

  /**
   * @description 게시글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 삭제 데이터
   */
  async deletePost(userNo: number, deleteData: DeletePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 삭제 구현
    return null;
  }

  /**
   * @description 다수 게시글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  async multipleDeletePost(userNo: number, deleteData: DeletePostDto): Promise<MutationResponseDto | null> {
    // TODO: 다수 게시글 일괄 삭제 구현
    return null;
  }

  /**
   * @description 관리자용 게시글 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetPostList(searchData: SearchPostDto & Partial<PostDto>): Promise<ListDto<PostDto>> {
    // TODO: 관리자용 게시글 목록 조회 구현
    return { list: [], totalCnt: 0, };
  }

  /**
   * @description 게시글 통계 조회
   * @param searchData 검색 데이터
   */
  async getPostStatistics(searchData: { period?: string; category?: number }): Promise<any> {
    // TODO: 게시글 통계 조회 구현
    return null;
  }

  /**
   * @description 게시글 추천 설정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async featurePost(userNo: number, updateData: UpdatePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 추천 설정 구현
    return null;
  }

  /**
   * @description 게시글 고정 설정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async pinPost(userNo: number, updateData: UpdatePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 고정 설정 구현
    return null;
  }
}
