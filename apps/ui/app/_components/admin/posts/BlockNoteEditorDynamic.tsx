'use client';

import dynamic from 'next/dynamic';

export const BlockNoteEditorDynamic = dynamic(
  () => import('./BlockNoteEditor').then((mod) => ({ default: mod.BlockNoteEditor, })),
  {
    ssr: false,
    loading: () => (
      <div className='p-5 border border-black-300 rounded-2'>
        <div className='text-black-500'>에디터를 불러오는 중...</div>
      </div>
    ),
  }
) as typeof import('./BlockNoteEditor').BlockNoteEditor;
