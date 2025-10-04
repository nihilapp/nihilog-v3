import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { CreatePostBookmarkDto, type ResponseDto } from '@/dto';
import { PostsBookmarkService } from '@/endpoints/posts/bookmark/posts-bookmark.service';
import type { SelectPostBookmarkType } from '@/endpoints/prisma/types/post-bookmark.types';
import { createError, createResponse } from '@/utils';

@ApiTags('posts-bookmark')
@Controller('posts')
export class PostsBookmarkController {
  constructor(private readonly postsBookmarkService: PostsBookmarkService) { }

  @Endpoint({
    endpoint: '/:pstNo/bookmark',
    method: 'POST',
    summary: '게시글 북마크 생성',
    description: '게시글 북마크를 생성합니다.',
    options: {
      body: [ '북마크 생성 데이터', CreatePostBookmarkDto, ],
    },
  })
  async createPostBookmark(
    @Param('pstNo') pstNo: number,
    @Body() createData: CreatePostBookmarkDto
  ): Promise<ResponseDto<SelectPostBookmarkType>> {
    const bookmark = await this.postsBookmarkService.createPostBookmark(createData);

    if (!bookmark) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_BOOKMARK_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_BOOKMARK_CREATE_SUCCESS',
      bookmark
    );
  }
}
