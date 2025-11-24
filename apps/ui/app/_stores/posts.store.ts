import type { Block } from '@blocknote/core';
import type { PostStatus, YnStatus } from '@nihilog/db';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { PostValidationError } from '@/_types';

export interface PostTag {
  tagNo: number | null;
  tagText: string;
}

interface PostsAction {
  setEditMode: (editMode: 'create' | 'update') => void;
  setPostData: (postData: PostData) => void;
  setErrors: (errors: PostValidationError[]) => void;
  clearErrors: () => void;
  reset: () => void;
  setTags: (tags: PostTag[]) => void;
  addTag: (tagText: string) => void;
  removeTag: (index: number) => void;
}

interface PostData {
  pstTtl: string;
  pstSmry: string;
  pstMtxt: Block[] | null;
  pstCd: string;
  pstThmbLink: string | undefined;
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
  errors: PostValidationError[];
  postTags: PostTag[];

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
      pstThmbLink: undefined,
      pstStts: 'EMPTY',
      publDt: '',
      pinYn: 'N',
      rlsYn: 'N',
      archYn: 'N',
      secrYn: 'N',
      pstPswd: '',
      ctgryNo: undefined,
    },
    errors: [],
    postTags: [],
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
      setErrors: (errors: PostValidationError[]) => set((state) => {
        state.errors = errors;
      }),
      clearErrors: () => set((state) => {
        state.errors = [];
      }),
      setTags: (tags: PostTag[]) => set((state) => {
        state.postTags = tags;
      }),
      addTag: (tagText: string) => set((state) => {
        const trimmedText = tagText.trim();
        if (trimmedText && !state.postTags.some((tag) => tag.tagText === trimmedText)) {
          state.postTags.push({
            tagNo: null,
            tagText: trimmedText,
          });
        }
      }),
      removeTag: (index: number) => set((state) => {
        state.postTags.splice(
          index,
          1
        );
      }),
      reset: () => set((state) => {
        state.editMode = 'create';
        state.postData = {
          pstTtl: '',
          pstSmry: '',
          pstMtxt: [],
          pstCd: '',
          pstThmbLink: undefined,
          pstStts: 'EMPTY',
          publDt: '',
          pinYn: 'N',
          rlsYn: 'N',
          archYn: 'N',
          secrYn: 'N',
          pstPswd: '',
          ctgryNo: undefined,
        };
        state.errors = [];
        state.postTags = [];
      }),
    },
  })),
  {
    name: 'posts-store',
  }
));

export const useEditMode = () => postsStore((state) => state.editMode);
export const usePostData = () => postsStore((state) => state.postData);
export const usePostErrors = () => postsStore((state) => state.errors);
export const usePostTags = () => postsStore((state) => state.postTags);

export const usePostActions = () => postsStore((state) => state.actions);
