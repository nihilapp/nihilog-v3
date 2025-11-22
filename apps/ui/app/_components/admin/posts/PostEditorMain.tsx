'use client';

import type { Block, PartialBlock } from '@blocknote/core';
import { useRef } from 'react';
import { MdArticle, MdDescription, MdTitle } from 'react-icons/md';

import type { BlockNoteEditorRef } from '@/_components/admin/posts/BlockNoteEditor';
import { Box } from '@/_components/ui/box';
import { Input } from '@/_components/ui/input';
import { usePostActions, usePostData, usePostErrors } from '@/_stores/posts.store';

import { BlockNoteEditorDynamic } from './BlockNoteEditorDynamic';

interface Props {}

export function PostEditorMain({ }: Props) {
  const postData = usePostData();
  const postErrors = usePostErrors();
  const { setPostData, } = usePostActions();
  const editorRef = useRef<BlockNoteEditorRef>(null);

  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = postErrors.find((err) => err.field === fieldName);
    return error?.message;
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      pstTtl: e.target.value,
    });
  };

  const onSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({
      ...postData,
      pstSmry: e.target.value,
    });
  };

  const onEditorChange = (blocks: Block[]) => {
    setPostData({
      ...postData,
      pstMtxt: blocks,
    });
  };

  const onEditorContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 에디터 내부가 아닌 빈 공간 클릭 시에만 포커스
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.bn-container') === null) {
      // BlockNote 에디터의 contentEditable 요소 찾기
      const editorElement = e.currentTarget.querySelector('[contenteditable="true"]') as HTMLElement;
      if (editorElement) {
        editorElement.focus();
      }
      else {
        // ref를 통한 포커스 시도
        editorRef.current?.focus();
      }
    }
  };

  return (
    <Box.Content className='gap-5 flex flex-col h-full'>
      <Input.Label
        label='제목'
        icon={<MdTitle />}
        errorMessage={getErrorMessage('pstTtl')}
      >
        <Input.Text
          type='text'
          placeholder='제목을 입력해주세요.'
          value={postData.pstTtl}
          onChange={onTitleChange}
        />
      </Input.Label>

      <Input.Label
        label='요약'
        icon={<MdDescription />}
        errorMessage={getErrorMessage('pstSmry')}
      >
        <Input.LongText
          rows={3}
          className='resize-none'
          placeholder='요약을 입력해주세요.'
          value={postData.pstSmry}
          onChange={onSummaryChange}
        />
      </Input.Label>

      <Input.Label
        label='본문'
        icon={<MdArticle />}
        direction='vertical'
        className='flex-1 flex flex-col min-h-0'
        errorMessage={getErrorMessage('pstMtxt')}
      >
        <div
          className='p-5 border border-black-300 rounded-2 flex-1 flex flex-col min-h-0 cursor-text'
          onClick={onEditorContainerClick}
        >
          <BlockNoteEditorDynamic
            ref={editorRef}
            initialContent={
              postData.pstMtxt && postData.pstMtxt.length > 0
                ? (postData.pstMtxt as PartialBlock[])
                : undefined
            }
            onChange={onEditorChange}
          />
        </div>
      </Input.Label>
    </Box.Content>
  );
}
