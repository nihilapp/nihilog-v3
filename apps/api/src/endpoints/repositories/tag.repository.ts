import { Inject, Injectable } from '@nestjs/common';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreatePstTagMpngDto, CreateTagDto, DeletePstTagMpngDto, DeleteTagDto, SearchPstTagMpngDto, SearchTagDto, UpdateTagDto } from '@/dto/tag.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectPstTagMpngListItemType, SelectPstTagMpngType, SelectTagInfoListItemType, SelectTagInfoType } from '@/endpoints/prisma/types/tag.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class TagRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

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

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
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
   * @description 태그 번호로 태그 조회
   * @param tagNo 태그 번호
   */
  async getTagByTagNo(tagNo: number): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const tag = await this.prisma.tagInfo.findUnique({
        where: { tagNo, },
      });

      return prismaResponse(true, tag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, tag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, newTag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: newTags.count,
        failCnt: createData.length - newTags.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 수정 데이터
   */
  async updateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    try {
      const updatedTag = await this.prisma.tagInfo.update({
        where: { tagNo: updateData.tagNo, },
        data: {
          ...updateData,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(true, updatedTag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: updatedTags.count,
        failCnt: updateData.tagNoList.length - updatedTags.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 태그 삭제 데이터
   */
  async deleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<boolean> | null> {
    try {
      const deletedTag = await this.prisma.tagInfo.update({
        where: { tagNo: deleteData.tagNo, },
        data: {
          useYn: 'N',
          delYn: 'Y',
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        },
      });

      return prismaResponse(true, !!deletedTag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: deletedTags.count,
        failCnt: deleteData.tagNoList.length - deletedTags.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      const [ list, totalCnt, ] = await this.prisma.$transaction([
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

      return prismaResponse(true, {
        list: list.map((item, index) => ({
          ...item,
          totalCnt,
          rowNo: index + 1,
        })),
        totalCnt,
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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
        where: { pstNo_tagNo: { tagNo, pstNo, }, },
        include: {
          tag: {
            select: {
              tagNm: true,
            },
          },
        },
      });

      return prismaResponse(true, tag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, newTag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: newTags.count,
        failCnt: createData.length - newTags.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, !!deletedTag);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: deletedTags.count,
        failCnt: deleteData.tagMapNoList.length - deletedTags.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
