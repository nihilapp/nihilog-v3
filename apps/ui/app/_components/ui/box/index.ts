import { BoxAction } from '@/_components/ui/box/BoxAction';
import { BoxContent } from '@/_components/ui/box/BoxContent';
import { BoxDivider } from '@/_components/ui/box/BoxDivider';
import { BoxPanel } from '@/_components/ui/box/BoxPanel';
import { BoxTop } from '@/_components/ui/box/BoxTop';

/**
 * Box.Panel = 차지할 수 있는 모든 영역을 차지. mode 에 따라 div, section, main, aside 로 설정 가능.
 * Box.Divider = 상하 혹은 좌우로 flex 하는 컴포넌트. 이 안에 Panel을 넣어서 레이아웃을 잡아 사용. direction={ 'horizontal' | 'vertical' } 으로 가로 세로 구분.
 * Box.Top = 패널의 상단 영역. 제목이나 액션 버튼들이 위치함.
 * Box.Action = 상단 내부에 들어가는 버튼 모음.
 * Box.Content = 패널의 내부 영역. 주요 컨텐츠가 위치함.
 */

export const Box = {
  Panel: BoxPanel,
  Divider: BoxDivider,
  Top: BoxTop,
  Action: BoxAction,
  Content: BoxContent,
};
