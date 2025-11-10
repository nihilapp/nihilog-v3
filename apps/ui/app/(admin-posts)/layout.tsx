import { PostEditorLayout } from '@/_layouts/PostEditorLayout';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
  return (
    <PostEditorLayout>
      {children}
    </PostEditorLayout>
  );
}
