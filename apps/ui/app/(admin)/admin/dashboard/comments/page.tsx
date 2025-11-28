import { AdminCommentList } from '@/_components/admin/comments/AdminCommentList';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '댓글 관리',
  url: '/admin/dashboard/comments',
});

export default function AdminCommentListPage() {
  return (
    <AdminCommentList />
  );
}
