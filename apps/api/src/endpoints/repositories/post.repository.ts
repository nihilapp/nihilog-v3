import { Inject, Injectable } from '@nestjs/common';

import type { CreatePostDto, DeletePostDto, SearchPostDto, UpdatePostDto } from '@/dto';
import type { MutationResponseDto } from '@/dto/response.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectPostInfoListItemType,
  SelectPostInfoType
} from '@/endpoints/prisma/types/post.types';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { PrismaClient, type Prisma } from '~prisma/client';

@Injectable()
export class PostRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  // ===== 일반 사용자 기능 =====

  /**
   * @description 공개 게시글 목록 조회 (통합 검색)
   * @param searchData 검색 데이터
   */
  async getPostList(searchData: SearchPostDto): Promise<ListType<SelectPostInfoListItemType>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
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
        this.prisma.pstInfo.count({ where, orderBy: { pstNo: 'desc', }, }),
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
      return { list: [], totalCnt: 0, };
    }
  }

  /**
   * @description 특정 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  async getPostByPstNo(pstNo: number): Promise<SelectPostInfoType | null> {
    try {
      const post = await this.prisma.pstInfo.findUnique({
        where: { pstNo, },
      });

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
  async getPostByPstCd(pstCd: string): Promise<SelectPostInfoType | null> {
    try {
      const post = await this.prisma.pstInfo.findFirst({
        where: { pstCd, },
      });

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
  async getPostListByTagNo(
    tagNo: number,
    searchData: SearchPostDto
  ): Promise<ListType<SelectPostInfoListItemType>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
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
      return { list: [], totalCnt: 0, };
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
  ): Promise<ListType<SelectPostInfoListItemType>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        ctgryNo,
        delYn: delYn || 'N',
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
      return { list: [], totalCnt: 0, };
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
  ): Promise<ListType<SelectPostInfoListItemType>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const where: Prisma.PstInfoWhereInput = {
        delYn: delYn || 'N',
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
      return { list: [], totalCnt: 0, };
    }
  }

  // ===== 사용자 상호작용 기능 =====

  async getPostViewStats(
    pstNo: number,
    startDt: string,
    endDt: string
  ): Promise<number> {
    try {
      //
      const viewStats = await this.prisma.pstViewLog.findMany();
      return 0;
    }
    catch {
      //
      return 0;
    }
  }

  async trackPostShare(pstNo: number, platform: string, url: string): Promise<void> {

  }

  /**
   * @description 게시글 북마크
   * @param userNo 사용자 번호
   * @param pstNo 게시글 번호
   */
  bookmarkPost(_userNo: number, _pstNo: number): Promise<MutationResponseDto | null> {
    // TODO: 게시글 북마크 구현
    return Promise.resolve(null);
  }

  /**
   * @description 북마크한 게시글 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  getBookmarkedPostList(_userNo: number, _searchData: SearchPostDto): Promise<ListType<SelectPostInfoListItemType>> {
    // TODO: 북마크한 게시글 목록 조회 구현
    return Promise.resolve({ list: [], totalCnt: 0, });
  }

  /**
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 데이터
   */
  async getAdvancedPostList(searchData: SearchPostDto): Promise<ListType<SelectPostInfoListItemType>> {
    try {
      const {
        page, strtRow, endRow, srchKywd, srchType, srchFields,
        tagNoList, tagNmList, ctgryNoList,
        dateRange, viewRange, orderBy,
        pstStts, rlsYn, archYn, delYn,
      } = searchData;

      const whereAND: Prisma.PstInfoWhereInput[] = [ { delYn: (delYn || 'N'), }, { rlsYn: (rlsYn || 'Y'), }, ];

      if (pstStts) {
        whereAND.push({ pstStts, });
      }
      if (archYn) {
        whereAND.push({ archYn, });
      }

      if (!isEmptyString(srchKywd)) {
        if (srchFields && srchFields.length > 0) {
          whereAND.push({
            OR: srchFields.map((field) => ({ [ field ]: { contains: srchKywd, }, })),
          });
        }
        else if (srchType) {
          whereAND.push({ [ srchType ]: { contains: srchKywd, }, });
        }
      }

      if (ctgryNoList && ctgryNoList.length > 0) {
        whereAND.push({ ctgryNo: { in: ctgryNoList, }, });
      }

      if (dateRange) {
        const dateAND: Prisma.PstInfoWhereInput[] = [ ];
        if (dateRange.startDt) {
          dateAND.push({ crtDt: { gte: dateRange.startDt, }, });
        }
        if (dateRange.endDt) {
          dateAND.push({ crtDt: { lte: dateRange.endDt, }, });
        }
        if (dateAND.length > 0) whereAND.push(...dateAND);
      }

      if (viewRange) {
        if (viewRange.minViews !== undefined) {
          whereAND.push({ pstView: { gte: viewRange.minViews, }, });
        }
        if (viewRange.maxViews !== undefined) {
          whereAND.push({ pstView: { lte: viewRange.maxViews, }, });
        }
      }

      if ((tagNoList && tagNoList.length > 0) || (tagNmList && tagNmList.length > 0)) {
        whereAND.push({
          tags: {
            some: {
              ...(tagNoList && tagNoList.length > 0 && { tagNo: { in: tagNoList, }, }),
              ...(tagNmList && tagNmList.length > 0 && { tag: { tagNm: { in: tagNmList, }, }, }),
            },
          },
        });
      }

      const where: Prisma.PstInfoWhereInput = { AND: whereAND, };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const orderByClause: Prisma.PstInfoOrderByWithRelationInput | Prisma.PstInfoOrderByWithRelationInput[] = (() => {
        switch (orderBy) {
        case 'POPULAR':
          return [ { pstView: 'desc' as const, }, { crtDt: 'desc' as const, }, ];
        case 'RELEVANCE':
          return [ { crtDt: 'desc' as const, }, ];
        case 'LATEST':
        default:
          return [ { crtDt: 'desc' as const, }, ];
        }
      })();

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.pstInfo.findMany({ where, orderBy: orderByClause, skip, take, }),
        this.prisma.pstInfo.count({ where, orderBy: { pstNo: 'desc', }, }),
      ]);

      return {
        list: list.map((item, index) => ({ ...item, totalCnt, rowNo: skip + index + 1, })),
        totalCnt,
      };
    }
    catch {
      return { list: [], totalCnt: 0, };
    }
  }

  // ===== 관리자 기능 (작성자) =====

  /**
   * @description 새 게시글 작성
   * @param userNo 사용자 번호
   * @param createData 게시글 생성 데이터
   */
  createPost(_userNo: number, _createData: CreatePostDto): Promise<SelectPostInfoType | null> {
    // TODO: 새 게시글 작성 구현
    return Promise.resolve(null);
  }

  /**
   * @description 게시글 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  updatePost(_userNo: number, _updateData: UpdatePostDto): Promise<SelectPostInfoType | null> {
    // TODO: 게시글 수정 구현
    return Promise.resolve(null);
  }

  /**
   * @description 다수 게시글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 일괄 수정 데이터
   */
  multipleUpdatePost(_userNo: number, _updateData: UpdatePostDto): Promise<SelectPostInfoType[] | null> {
    // TODO: 다수 게시글 일괄 수정 구현
    return Promise.resolve(null);
  }

  /**
   * @description 게시글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 삭제 데이터
   */
  deletePost(_userNo: number, _deleteData: DeletePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 삭제 구현
    return Promise.resolve(null);
  }

  /**
   * @description 다수 게시글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  multipleDeletePost(_userNo: number, _deleteData: DeletePostDto): Promise<MutationResponseDto | null> {
    // TODO: 다수 게시글 일괄 삭제 구현
    return Promise.resolve(null);
  }

  /**
   * @description 관리자용 게시글 목록 조회
   * @param searchData 검색 데이터
   */
  adminGetPostList(_searchData: SearchPostDto): Promise<ListType<SelectPostInfoListItemType>> {
    // TODO: 관리자용 게시글 목록 조회 구현
    return Promise.resolve({ list: [], totalCnt: 0, });
  }

  /**
   * @description 게시글 통계 조회
   * @param searchData 검색 데이터
   */
  getPostStatistics(_searchData: { period?: string; category?: number }): Promise<any> {
    // TODO: 게시글 통계 조회 구현
    return Promise.resolve(null);
  }

  /**
   * @description 게시글 추천 설정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  featurePost(_userNo: number, _updateData: UpdatePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 추천 설정 구현
    return Promise.resolve(null);
  }

  /**
   * @description 게시글 고정 설정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  pinPost(_userNo: number, _updateData: UpdatePostDto): Promise<MutationResponseDto | null> {
    // TODO: 게시글 고정 설정 구현
    return Promise.resolve(null);
  }
}
