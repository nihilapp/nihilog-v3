import { NotFound } from '@/_components/common/not-found/NotFound';
import { CommonLayout } from '@/_layouts/CommonLayout';

export default function NotFoundPage() {
  return (
    <CommonLayout>
      <NotFound />
    </CommonLayout>
  );
}
