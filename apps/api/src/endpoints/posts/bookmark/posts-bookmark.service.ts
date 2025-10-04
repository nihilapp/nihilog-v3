import { Injectable } from '@nestjs/common';

import type { CreatePostBookmarkDto } from '@/dto';
import type { SelectPostBookmarkType } from '@/endpoints/prisma/types/post-bookmark.types';
import type { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class PostsBookmarkService {
  constructor(private readonly postRepository: PostRepository) { }

  /**
   * @description 게시글 북마크 생성
   * @param createData 북마크 생성 데이터
   */
  async createPostBookmark(createData: CreatePostBookmarkDto): Promise<SelectPostBookmarkType | null> {
    return this.postRepository.createPostBookmark(createData);
  }
}
