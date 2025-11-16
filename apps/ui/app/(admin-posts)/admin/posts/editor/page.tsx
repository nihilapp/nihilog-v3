import { PostEditor } from '@/_components/admin/posts/PostEditor';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '새 포스트',
  url: '/admin/posts/editor',
});

export default function EditorPage() {
  return (
    <PostEditor />
  );
}
