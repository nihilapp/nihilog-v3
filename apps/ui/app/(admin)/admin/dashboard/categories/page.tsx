import { AdminCategoryList } from '@/_components/admin/categories/AdminCategoryList';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '카테고리 목록',
  url: '/admin/dashboard/categories',
});

export default function AdminCategoryListPage() {
  return (
    <AdminCategoryList />
  );
}
