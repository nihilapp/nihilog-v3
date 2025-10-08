import { Inject, Injectable } from '@nestjs/common';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import type { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import { PRISMA } from '@/endpoints/prisma/prisma.module';
import type { SelectCategoryListItemType, SelectCategoryType } from '@/endpoints/prisma/types/category.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { pageHelper } from '@/utils/pageHelper';
import { prismaError } from '@/utils/prismaError';
import { prismaResponse } from '@/utils/prismaResponse';
import { timeToString } from '@/utils/timeHelper';

@Injectable()
export class CategoryRepository {
  constructor(@Inject(PRISMA)
  private readonly prisma: PrismaClient) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, orderBy, crtDtFrom, crtDtTo, useYn, ctgryColr, upCtgryNo, } = searchData;

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
        ...(upCtgryNo && { upCtgryNo, }),
        ...(crtDtFrom && crtDtTo && {
          crtDt: {
            gte: crtDtFrom,
            lte: crtDtTo,
          },
        }),
      };

      const skip = pageHelper(page, strtRow, endRow).offset;
      const take = pageHelper(page, strtRow, endRow).limit;

      const [ list, totalCnt, ] = await this.prisma.$transaction([
        this.prisma.ctgryInfo.findMany({
          where,
          include: {
            parentCategory: true,
            childCategories: true,
          },
          orderBy: {
            ...(orderBy === 'LATEST') && {
              crtDt: 'desc',
            },
            ...(orderBy === 'OLDEST') && {
              crtDt: 'asc',
            },
            ...(orderBy === 'NAME_ASC') && {
              ctgryNm: 'asc',
            },
            ...(orderBy === 'NAME_DESC') && {
              ctgryNm: 'desc',
            },
            ...(orderBy === 'STP_ASC') && {
              ctgryStp: 'asc',
            },
            ...(orderBy === 'STP_DESC') && {
              ctgryStp: 'desc',
            },
          },
          skip,
          take,
        }),
        this.prisma.ctgryInfo.count({ where, }),
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
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      const category = await this.prisma.ctgryInfo.findUnique({
        where: { ctgryNo, },
        include: {
          parentCategory: true,
          childCategories: true,
        },
      });

      return prismaResponse(true, category);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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
          childCategories: true,
        },
      });

      return prismaResponse(true, category);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async createCategory(userNo: number, createData: CreateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      const newCategory = await this.prisma.ctgryInfo.create({
        data: {
          ctgryNm: createData.ctgryNm,
          ctgryExpln: createData.ctgryExpln,
          ctgryColr: createData.ctgryColr,
          ctgryStp: createData.ctgryStp,
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
          childCategories: true,
        },
      });

      return prismaResponse(true, newCategory);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async multipleCreateCategory(userNo: number, createData: CreateCategoryDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
      const newCategories = await this.prisma.ctgryInfo.createMany({
        data: createData.map((item) => ({
          ctgryNm: item.ctgryNm,
          ctgryExpln: item.ctgryExpln,
          ctgryColr: item.ctgryColr,
          ctgryStp: item.ctgryStp,
          upCtgryNo: item.upCtgryNo,
          useYn: item.useYn || 'Y',
          delYn: item.delYn || 'N',
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        })),
      });

      return prismaResponse(true, {
        successCnt: newCategories.count,
        failCnt: createData.length - newCategories.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 카테고리 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 수정 데이터
   */
  async updateCategory(userNo: number, updateData: UpdateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    try {
      const updatedCategory = await this.prisma.ctgryInfo.update({
        where: { ctgryNo: updateData.ctgryNo, },
        data: {
          ctgryNm: updateData.ctgryNm,
          ctgryExpln: updateData.ctgryExpln,
          ctgryColr: updateData.ctgryColr,
          ctgryStp: updateData.ctgryStp,
          upCtgryNo: updateData.upCtgryNo,
          useYn: updateData.useYn,
          delYn: updateData.delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
        include: {
          parentCategory: true,
          childCategories: true,
        },
      });

      return prismaResponse(true, updatedCategory);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }

  /**
   * @description 다수 카테고리 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 수정 데이터
   */
  async multipleUpdateCategory(userNo: number, updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<RepoResponseType<MultipleResultType> | null> {
    try {
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
          upCtgryNo: updateData.upCtgryNo,
          useYn: updateData.useYn,
          delYn: updateData.delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        },
      });

      return prismaResponse(true, {
        successCnt: updatedCategories.count,
        failCnt: updateData.ctgryNoList.length - updatedCategories.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, !!deletedCategory);
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
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

      return prismaResponse(true, {
        successCnt: deletedCategories.count,
        failCnt: deleteData.ctgryNoList.length - deletedCategories.count,
        failNoList: [],
      });
    }
    catch (error) {
      return prismaError(error as PrismaClientKnownRequestError);
    }
  }
}
