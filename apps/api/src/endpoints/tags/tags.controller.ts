import {
  Controller,
  Body,
  Param
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto } from '@/dto';
import { SearchTagDto } from '@/dto/tag.dto';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagInfoListItemType, SelectTagInfoType } from '@/endpoints/prisma/types/tag.types';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { TagService } from './tags.service';

@ApiTags('tags')
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
    summary: '🏷️ 태그 목록 조회',
    description: '전체 태그 목록을 조회합니다. 인기도순/알파벳순 정렬, 사용 횟수 포함',
    options: {
      body: [ '태그 검색 DTO', SearchTagDto, ],
      responses: [
        [
          '태그 목록 조회 성공',
          [ false, 'SUCCESS', 'SUCCESS', CreateExample.tag('list'), ],
        ],
        [
          '태그 목록 조회 실패 (Repository)',
          [ true, 'INTERNAL_SERVER_ERROR', 'INTERNAL_SERVER_ERROR', null, ],
        ],
      ],
    },
  })
  async getTagList(@Body() searchData: SearchTagDto): Promise<ResponseDto<ListType<SelectTagInfoListItemType>>> {
    const result = await this.tagService.getTagList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'INTERNAL_SERVER_ERROR'
      );
    }

    return createResponse('SUCCESS', 'SUCCESS', result.data);
  }

  /**
   * @description 태그 번호로 태그 조회
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'GET',
    summary: '🏷️ 태그 상세 조회',
    description: '특정 태그의 상세 정보를 조회합니다. 태그된 게시글 목록, 관련 태그 추천 포함',
    options: {
      params: [ [ 'tagNo', '태그 번호', 'number', true, ], ],
      responses: [
        [
          '태그 조회 성공',
          [ false, 'SUCCESS', 'SUCCESS', CreateExample.tag('detail'), ],
        ],
        [
          '태그를 찾을 수 없음 (Repository)',
          [ true, 'NOT_FOUND', 'NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getTagByTagNo(@Param('tagNo') tagNo: number): Promise<ResponseDto<SelectTagInfoType>> {
    const result = await this.tagService.getTagByTagNo(tagNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'SUCCESS', result.data);
  }

  /**
   * @description 태그명으로 태그 조회
   * @param name 태그명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
    summary: '🏷️ 태그명으로 검색',
    description: '태그명으로 태그를 검색합니다. 자동완성 기능, 유사 태그 제안',
    options: {
      params: [ [ 'name', '태그명', 'string', true, ], ],
      responses: [
        [
          '태그 조회 성공',
          [ false, 'SUCCESS', 'SUCCESS', CreateExample.tag('detail'), ],
        ],
        [
          '태그를 찾을 수 없음 (Repository)',
          [ true, 'NOT_FOUND', 'NOT_FOUND', null, ],
        ],
      ],
    },
  })
  async getTagByTagNm(@Param('name') name: string): Promise<ResponseDto<SelectTagInfoType>> {
    const result = await this.tagService.getTagByTagNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'SUCCESS', result.data);
  }
}
