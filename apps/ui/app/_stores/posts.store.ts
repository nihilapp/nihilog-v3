import type { Block } from '@blocknote/core';
import type { PostStatus, YnStatus } from '@nihilog/db';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface PostsAction {
  setEditMode: (editMode: 'create' | 'update') => void;
  setPostData: (postData: PostData) => void;
  reset: () => void;
}

interface PostData {
  pstTtl: string;
  pstSmry: string;
  pstMtxt: Block[] | null;
  pstCd: string;
  pstThmbLink: string;
  pstStts: PostStatus;
  publDt: string;
  pinYn: YnStatus;
  rlsYn: YnStatus;
  archYn: YnStatus;
  secrYn: YnStatus;
  pstPswd: string;
  ctgryNo: number | undefined;
}

// Posts 관련 전역 상태 타입
interface PostsState {
  // 상태
  editMode: 'create' | 'update';
  postData: PostData;

  // 액션
  actions: PostsAction;
}

// Posts 스토어 생성
const postsStore = create<PostsState>()(devtools(
  immer((set) => ({
    editMode: 'create',
    postData: {
      pstTtl: '',
      pstSmry: '',
      pstMtxt: [],
      pstCd: '',
      pstThmbLink: '',
      pstStts: 'EMPTY',
      publDt: '',
      pinYn: 'N',
      rlsYn: 'N',
      archYn: 'N',
      secrYn: 'N',
      pstPswd: '',
      ctgryNo: undefined,
    },
    actions: {
      setEditMode: (editMode: 'create' | 'update') => set((state) => {
        state.editMode = editMode;
      }),
      setPostData: (postData: PostData) => set((state) => {
        state.postData = {
          ...state.postData,
          ...postData,
        };
      }),
      reset: () => set((state) => {
        state.editMode = 'create';
        state.postData = {
          pstTtl: '',
          pstSmry: '',
          pstMtxt: [],
          pstCd: '',
          pstThmbLink: '',
          pstStts: 'EMPTY',
          publDt: '',
          pinYn: 'N',
          rlsYn: 'N',
          archYn: 'N',
          secrYn: 'N',
          pstPswd: '',
          ctgryNo: undefined,
        };
      }),
    },
  })),
  {
    name: 'posts-store',
  }
));

export const useEditMode = () => postsStore((state) => state.editMode);
export const usePostData = () => postsStore((state) => state.postData);

export const usePostActions = () => postsStore((state) => state.actions);
