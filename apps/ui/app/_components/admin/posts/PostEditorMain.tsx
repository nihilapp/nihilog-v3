'use client';

import type { Block, PartialBlock } from '@blocknote/core';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { MdDescription, MdTitle } from 'react-icons/md';

import type { BlockNoteEditorRef } from '@/_components/admin/posts/BlockNoteEditor';
import { Box } from '@/_components/ui/box';
import { Input } from '@/_components/ui/input';

import { BlockNoteEditorDynamic } from './BlockNoteEditorDynamic';

interface Props {
  form: UseFormReturn<Record<string, unknown>>;
  postData: {
    pstMtxt?: Block[] | null;
  };
  onEditorChange: (blocks: Block[]) => void;
  onEditorContainerClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function PostEditorMain({
  form,
  postData,
  onEditorChange,
  onEditorContainerClick,
}: Props) {
  const editorRef = useRef<BlockNoteEditorRef>(null);

  return (
    <Box.Content className='gap-5 flex flex-col h-full'>
      <Input.Label
        label='제목'
        icon={<MdTitle />}
        direction='horizontal'
      >
        <Input.Text
          type='text'
          placeholder='제목을 입력해주세요.'
          {...form.register('pstTtl')}
        />
      </Input.Label>

      <Input.Label
        label='요약'
        icon={<MdDescription />}
        direction='horizontal'
      >
        <Input.LongText
          rows={3}
          className='resize-none'
          placeholder='요약을 입력해주세요.'
          {...form.register('pstSmry')}
        />
      </Input.Label>

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
    </Box.Content>
  );
}
