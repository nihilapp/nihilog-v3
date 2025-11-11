import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: '새 포스트',
  url: '/admin/posts/new',
});

export default function NewPostPage() {
  return (
    <div>content</div>
  );
}
