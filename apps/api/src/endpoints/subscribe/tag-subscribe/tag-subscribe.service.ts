import { Injectable } from '@nestjs/common';
import { searchTagSubscribeSchema } from '@nihilog/schemas';
import type { ListType, MultipleResultType, RepoResponseType } from '@nihilog/schemas';
import type { SelectTagSbcrMpngListItemType, SelectTagSbcrMpngType } from '@nihilog/schemas';

import { MESSAGE } from '@/code/messages';
import type { CreateTagSubscribeDto, DeleteTagSubscribeDto, SearchTagSubscribeDto, UpdateTagSubscribeDto } from '@/dto';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class TagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    const safeData = searchTagSubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.tagSubscribeRepository.getTagSubscribeList(safeData.data);
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(userNo: number, searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    const safeData = searchTagSubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.tagSubscribeRepository.getTagSubscribeByUserNo(
      userNo,
      safeData.data
    );
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(tagNo: number, searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    const safeData = searchTagSubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.tagSubscribeRepository.getTagSubscribeByTagNo(
      tagNo,
      safeData.data
    );
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    // 태그 구독 중복 체크
    const existingSubscribe = await this.tagSubscribeRepository.getTagSubscribeBySbcrNoAndTagNo(
      createData.sbcrNo,
      createData.tagNo
    );

    if (existingSubscribe?.success && existingSubscribe.data) {
      return prismaResponse(
        false,
        null,
        'CONFLICT',
        MESSAGE.SUBSCRIBE.TAG.ALREADY_EXISTS
      );
    }

    return this.tagSubscribeRepository.createTagSubscribe(
      userNo,
      createData
    );
  }

  /**
   * @description 태그 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 각 태그별로 중복 체크
    for (const tagNo of createData.tagNoList) {
      const existingSubscribe = await this.tagSubscribeRepository.getTagSubscribeBySbcrNoAndTagNo(
        createData.sbcrNo,
        tagNo
      );

      if (existingSubscribe?.success && existingSubscribe.data) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.SUBSCRIBE.TAG.ALREADY_EXISTS
        );
      }
    }

    return this.tagSubscribeRepository.multipleCreateTagSubscribe(
      userNo,
      createData
    );
  }

  /**
   * @description 태그 구독 수정 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async updateTagSubscribe(userNo: number, updateData: UpdateTagSubscribeDto): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    // 구독 정보 존재 확인
    const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(updateData.tagSbcrNo);

    if (!subscribe.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
      );
    }

    return this.tagSubscribeRepository.updateTagSubscribe(
      userNo,
      updateData
    );
  }

  /**
   * @description 태그 구독 목록 수정 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async multipleUpdateTagSubscribe(userNo: number, updateData: UpdateTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 각 구독 정보 존재 확인
    for (const tagSbcrNo of updateData.tagSbcrNoList) {
      const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(tagSbcrNo);

      if (!subscribe.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
        );
      }
    }

    return this.tagSubscribeRepository.multipleUpdateTagSubscribe(
      userNo,
      updateData
    );
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   */
  async deleteTagSubscribe(userNo: number, tagSbcrNo: number): Promise<RepoResponseType<boolean> | null> {
    // 구독 정보 존재 확인
    const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(tagSbcrNo);

    if (!subscribe.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
      );
    }

    return this.tagSubscribeRepository.deleteTagSubscribe(
      userNo,
      tagSbcrNo
    );
  }

  /**
   * @description 태그 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async multipleDeleteTagSubscribe(userNo: number, deleteData: DeleteTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 각 구독 정보 존재 확인
    for (const tagSbcrNo of deleteData.tagSbcrNoList) {
      const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(tagSbcrNo);

      if (!subscribe.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.SUBSCRIBE.TAG.NOT_FOUND
        );
      }
    }

    return this.tagSubscribeRepository.multipleDeleteTagSubscribe(
      userNo,
      deleteData
    );
  }
}
