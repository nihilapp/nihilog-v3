import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@nihilog/code';
import type { SearchTagDto } from '@/dto/tag.dto';
import type { RepoResponseType } from '@nihilog/schemas';
import type { SelectTagInfoListItemType, SelectTagInfoType } from '@nihilog/schemas';
import { TagRepository } from '@/endpoints/repositories/tag.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) { }

  /**
   * @description 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagList(searchData: SearchTagDto): Promise<RepoResponseType<{ list: SelectTagInfoListItemType[];
    totalCnt: number; }> | null> {
    return this.tagRepository.getTagList(searchData);
  }

  /**
   * @description 태그 번호로 태그 조회
   * @param tagNo 태그 번호
   */
  async getTagByTagNo(tagNo: number): Promise<RepoResponseType<SelectTagInfoType> | null> {
    const result = await this.tagRepository.getTagByTagNo(tagNo);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.TAG.USER.NOT_FOUND
      );
    }

    return result;
  }

  /**
   * @description 태그명으로 태그 조회
   * @param tagNm 태그명
   */
  async getTagByTagNm(tagNm: string): Promise<RepoResponseType<SelectTagInfoType> | null> {
    const result = await this.tagRepository.getTagByTagNm(tagNm);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.TAG.USER.NAME_NOT_FOUND
      );
    }

    return result;
  }
}
