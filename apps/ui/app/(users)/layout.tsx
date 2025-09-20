import { UsersLayout } from './_layouts';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return <UsersLayout>{children}</UsersLayout>;
}
