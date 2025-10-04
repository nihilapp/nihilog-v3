import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@/dto/response.dto';
import type {
  CreateTagSubscribeDto,
  DeleteTagSubscribeDto,
  SearchTagSubscribeDto,
  TagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/schemas/response.schema';
import type { SelectTagSbcrMpngListItemType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { createError, createResponse } from '@/utils';
import type { TagSbcrMpng } from '~prisma/client';

@Injectable()
export class AdminTagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 태그 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeList(searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const result = await this.tagSubscribeRepository
      .getTagSubscribeList(searchData);

    return result;
  }

  /**
   * @description 태그별 구독자 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeByTagNo(
    tagNo: number,
    searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const result = await this.tagSubscribeRepository
      .getTagSubscribeByTagNo(tagNo, searchData);

    return result;
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async adminCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<ResponseDto<TagSbcrMpng>> {
    try {
      const result = await this.tagSubscribeRepository
        .createTagSubscribe(userNo, createData);

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_CREATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 다수 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async adminMultipleCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<ResponseDto<TagSbcrMpng[]>> {
    try {
      const result = await this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async adminUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<TagSbcrMpng>> {
    try {
      const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(updateData.tagSbcrNo);

      if (!subscribe) {
        return createError(
          'NOT_FOUND',
          'TAG_SUBSCRIBE_NOT_FOUND'
        );
      }

      const updateSubscribe = await this.tagSubscribeRepository
        .updateTagSubscribe(userNo, updateData);

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_UPDATE_SUCCESS',
        updateSubscribe
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 다수 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 수정 데이터
   */
  async adminMultipleUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    try {
      const result = await this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);

      if (!result || result.successCnt === 0) {
        return createError(
          'NOT_FOUND',
          'TAG_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  async adminDeleteTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<ResponseDto<null>> {
    try {
      const result = await this.tagSubscribeRepository.deleteTagSubscribe(userNo, updateData);

      if (!result) {
        return createError(
          'NOT_FOUND',
          'TAG_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_DELETE_SUCCESS',
        null
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_DELETE_ERROR'
      );
    }
  }

  /**
   * @description 다수 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async adminMultipleDeleteTagSubscribe(
    userNo: number,
    deleteData: DeleteTagSubscribeDto
  ): Promise<ResponseDto<MultipleResultType>> {
    try {
      const result = await this.tagSubscribeRepository
        .multipleDeleteTagSubscribe(userNo, deleteData);

      if (!result) {
        return createError(
          'NOT_FOUND',
          'TAG_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR'
      );
    }
  }
}
