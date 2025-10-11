import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Categories 관련 전역 상태 타입
interface CategoriesState {
  // 상태
  selectedCategory: number | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // 액션
  setSelectedCategory: (categoryId: number | null) => void;
  setCreating: (isCreating: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setDeleting: (isDeleting: boolean) => void;
  reset: () => void;
}

// 초기 상태
const initialState = {
  selectedCategory: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

// Categories 스토어 생성
export const useCategoriesStore = create<CategoriesState>()(
  devtools(
    (set) => ({
      ...initialState,

      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId, }),
      setCreating: (isCreating) => set({ isCreating, }),
      setUpdating: (isUpdating) => set({ isUpdating, }),
      setDeleting: (isDeleting) => set({ isDeleting, }),
      reset: () => set(initialState),
    }),
    {
      name: 'categories-store',
    }
  )
);
