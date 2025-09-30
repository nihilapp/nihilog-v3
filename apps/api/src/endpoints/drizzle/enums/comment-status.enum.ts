import { nihilogSchema } from '@/endpoints/drizzle/tables/nihilog.schema';

export const commentStatus = nihilogSchema.enum('comment_status', [
  'PENDING', // 승인 대기
  'APPROVED', // 승인됨(노출)
  'REJECTED', // 거절됨(비노출)
  'SPAM', // 스팸 처리
]);
