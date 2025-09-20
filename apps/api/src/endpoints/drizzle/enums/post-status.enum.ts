import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';

// 게시물 상태: empty(초안 없음), writing(작성중), finished(작성완료)
export const postStatus = nihilogSchema.enum('post_status', [ 'EMPTY', 'WRITING', 'FINISHED', ]);
