export type Block = {
  // 식별자
  id: string;

  // 타입 및 컨텐츠
  type: 'text' | 'image' | 'link' | 'code' | 'quote' | 'list' | 'table' | 'divider' | 'html' | 'custom';
  content: string;

  // 스타일링
  style: {
    [key: string]: string;
  };
  attributes: {
    [key: string]: string;
  };

  // 구조
  children: Block[];
  parentId?: string;
  depth?: number;
  index?: number;

  // 메타데이터
  createdAt?: string;
  updatedAt?: string;

  // 상태
  isSelected?: boolean;
  isFocused?: boolean;
  isCollapsed?: boolean;
  isEditable?: boolean;

  // 검증
  isValid?: boolean;
  error?: string;

  // 기능 플래그
  canMove?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  canEdit?: boolean;

  // 스타일 옵션
  alignment?: 'left' | 'center' | 'right' | 'justify';
  className?: string | string[];
};

// 툴바 버튼 인터페이스
export interface ToolbarButton {
  icon: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  visible?: boolean;
  className?: string | string[];
  group?: string;
}
