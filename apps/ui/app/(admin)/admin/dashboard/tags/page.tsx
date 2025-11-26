import { AdminTagList } from '@/_components/admin/tags/AdminTagList';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '태그 목록',
  url: '/admin/dashboard/tags',
});

export default function AdminTagListPage() {
  return (
    <AdminTagList />
  );
}
