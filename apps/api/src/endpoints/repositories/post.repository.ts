import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import type { CreatePostDto, DeletePostDto, SearchPostDto, UpdatePostDto } from '@/dto';
import type { MutationResponseDto } from '@/dto/response.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectPostInfoListItemType,
  SelectPostInfoType
} from '@/endpoints/prisma/types/post.types';
import { pageHelper } from '@/utils/pageHelper';

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

  /**
   * @description 게시글 조회수 통계 조회
   * @param pstNo 게시글 번호
   * @param startDt 시작 날짜
   * @param endDt 종료 날짜
   */
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

  /**
   * @description 게시글 공유 추적
   * @param pstNo 게시글 번호
   * @param platform 플랫폼
   * @param url 공유 URL
   */
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
  multipleUpdatePost(_userNo: number, _updateData: UpdatePostDto): Promise<MultipleResultType | null> {
    // TODO: 다수 게시글 일괄 수정 구현
    return Promise.resolve(null);
  }

  /**
   * @description 게시글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 삭제 데이터
   */
  deletePost(_userNo: number, _deleteData: DeletePostDto): Promise<boolean> {
    // TODO: 게시글 삭제 구현
    return Promise.resolve(false);
  }

  /**
   * @description 다수 게시글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  multipleDeletePost(_userNo: number, _deleteData: DeletePostDto): Promise<MultipleResultType | null> {
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
