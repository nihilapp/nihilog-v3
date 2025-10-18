import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Tags 관련 전역 상태 타입
interface TagsState {
  // 상태
  selectedTag: number | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // 액션
  setSelectedTag: (tagId: number | null) => void;
  setCreating: (isCreating: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setDeleting: (isDeleting: boolean) => void;
  reset: () => void;
}

// 초기 상태
const initialState = {
  selectedTag: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

// Tags 스토어 생성
export const useTagsStore = create<TagsState>()(devtools(
  (set) => ({
    ...initialState,

    setSelectedTag: (tagId) => set({ selectedTag: tagId, }),
    setCreating: (isCreating) => set({ isCreating, }),
    setUpdating: (isUpdating) => set({ isUpdating, }),
    setDeleting: (isDeleting) => set({ isDeleting, }),
    reset: () => set(initialState),
  }),
  {
    name: 'tags-store',
  }
));
