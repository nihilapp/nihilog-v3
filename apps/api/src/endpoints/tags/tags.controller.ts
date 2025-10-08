import {
  Controller,
  Body,
  Param
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto } from '@/dto';
import { SearchTagDto } from '@/dto/tag.dto';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagInfoListItemType, SelectTagInfoType } from '@/endpoints/prisma/types/tag.types';
import { createError, createResponse } from '@/utils';

import { TagService } from './tags.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  /**
   * @description 태그 목록 조회
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
  })
  async getTagList(@Body() searchData: SearchTagDto): Promise<ResponseDto<ListType<SelectTagInfoListItemType>>> {
    const result = await this.tagService.getTagList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.USER.SEARCH_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.TAG.USER.SEARCH_SUCCESS, result.data);
  }

  /**
   * @description 태그 번호로 태그 조회
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
  })
  async getTagByTagNo(@Param('tagNo') tagNo: number): Promise<ResponseDto<SelectTagInfoType>> {
    const result = await this.tagService.getTagByTagNo(tagNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.TAG.USER.NOT_FOUND
      );
    }

    return createResponse('SUCCESS', MESSAGE.TAG.USER.GET_SUCCESS, result.data);
  }

  /**
   * @description 태그명으로 태그 조회
   * @param name 태그명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
  })
  async getTagByTagNm(@Param('name') name: string): Promise<ResponseDto<SelectTagInfoType>> {
    const result = await this.tagService.getTagByTagNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.TAG.USER.NAME_NOT_FOUND
      );
    }

    return createResponse('SUCCESS', MESSAGE.TAG.USER.GET_BY_NAME_SUCCESS, result.data);
  }
}
