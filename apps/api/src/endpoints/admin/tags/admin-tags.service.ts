import { Injectable } from '@nestjs/common';

import type { CreateTagDto, DeleteTagDto, UpdateTagDto } from '@/dto';
import type { MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagInfoType } from '@/endpoints/prisma/types/tag.types';
import { TagRepository } from '@/endpoints/repositories/tag.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminTagsService {
  constructor(private readonly tagRepository: TagRepository) { }

  /**
   * @description 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  async adminCreateTag(userNo: number, createData: CreateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    // 태그명 중복 확인
    const findTag = await this.tagRepository.getTagByTagNm(createData.tagNm);

    if (findTag?.success) {
      return prismaResponse(false, null, 'CONFLICT', 'ADMIN_TAG_NAME_IN_USE');
    }

    return this.tagRepository.createTag(userNo, createData);
  }

  /**
   * @description 다수 태그 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 생성 데이터
   */
  async adminMultipleCreateTag(userNo: number, createData: CreateTagDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    // 태그명 중복 확인
    for (const item of createData) {
      const findTag = await this.tagRepository.getTagByTagNm(item.tagNm);
      if (findTag?.success) {
        return prismaResponse(false, null, 'CONFLICT', 'ADMIN_TAG_NAME_IN_USE');
      }
    }

    return this.tagRepository.multipleCreateTag(userNo, createData);
  }

  /**
   * @description 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 수정 데이터
   */
  async adminUpdateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    // 태그는 이름을 바꿀 이유가 별로 없음.

    return this.tagRepository.updateTag(userNo, updateData);
  }

  /**
   * @description 다수 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 수정 데이터
   */
  async adminMultipleUpdateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 태그는 이름을 바꿀 이유가 별로 없음.

    return this.tagRepository.multipleUpdateTag(userNo, updateData);
  }

  /**
   * @description 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 태그 삭제 데이터
   */
  async adminDeleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<boolean> | null> {
    return this.tagRepository.deleteTag(userNo, deleteData);
  }

  /**
   * @description 다수 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 삭제 데이터
   */
  async adminMultipleDeleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagRepository.multipleDeleteTag(userNo, deleteData);
  }
}
