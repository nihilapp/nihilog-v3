import 'styled-components';
import type { CSSProp } from 'styled-components';

declare module 'react' {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    css?: CSSProp;
  }
}
