'use client';

import type { Block, PartialBlock } from '@blocknote/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { updatePostSchema } from '@nihilog/schemas';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PostStatusBadges } from '@/_components/admin/posts/PostStatusBadges';
import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Frame } from '@/_components/ui/frame';
import { Input } from '@/_components/ui/input';
import { useGetPostByNo } from '@/_entities/posts/hooks';
import { useEditMode, usePostActions, usePostData } from '@/_stores/posts.store';
import type { Menu } from '@/_types/common.types';

const BlockNoteEditor = dynamic(
  () => import('./BlockNoteEditor').then((mod) => ({ default: mod.BlockNoteEditor, })),
  {
    ssr: false,
    loading: () => (
      <div className='p-5 border border-black-300 rounded-2'>
        <div className='text-black-500'>에디터를 불러오는 중...</div>
      </div>
    ),
  }
);

interface Props {}

function PostEditorContent() {
  const params = useSearchParams();
  const pstNo = params.get('pstNo');

  const editMode = useEditMode();
  const postData = usePostData();

  const { setPostData, } = usePostActions();
  const router = useRouter();

  const { response, loading, done, } = useGetPostByNo(Number(pstNo));

  const menuItems: Menu[] = [
    {
      icon: <Icon icon='material-symbols:save' />,
      name: '저장',
      action: () => {
        console.log('저장');
      },
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
    {
      icon: <Icon icon='material-symbols:publish' />,
      name: '발행',
      action: () => {
        //
      },
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
  ];

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      pstTtl: postData.pstTtl,
      pstSmry: postData.pstSmry,
      pstMtxt: postData.pstMtxt
        ? JSON.stringify(postData.pstMtxt)
        : '[]',
      pstCd: postData.pstCd,
      pstThmbLink: postData.pstThmbLink,
      pstStts: postData.pstStts,
      publDt: postData.publDt,
      pinYn: postData.pinYn,
      rlsYn: postData.rlsYn,
      archYn: postData.archYn,
      secrYn: postData.secrYn,
      pstPswd: postData.pstPswd,
      ctgryNo: postData.ctgryNo,
    },
  });

  useEffect(
    () => {
      if (!pstNo) {
        router.replace('/admin/dashboard');
        return;
      }

      if (done && response?.data) {
        const newPostData = {
          pstTtl: response.data.pstTtl ?? '',
          pstSmry: response.data.pstSmry ?? '',
          pstMtxt: (response.data.pstMtxt as Block[]) ?? [],
          pstCd: response.data.pstCd ?? '',
          pstThmbLink: response.data.pstThmbLink ?? '',
          pstStts: response.data.pstStts,
          publDt: response.data.publDt ?? '',
          pinYn: response.data.pinYn,
          rlsYn: response.data.rlsYn,
          archYn: response.data.archYn,
          secrYn: response.data.secrYn,
          pstPswd: response.data.pstPswd ?? '',
          ctgryNo: response.data.ctgryNo ?? undefined,
        };

        setPostData(newPostData);
        form.reset({
          ...newPostData,
          pstMtxt: JSON.stringify(newPostData.pstMtxt),
        });
      }
    },
    [
      pstNo,
      router,
      response?.data,
      done,
      setPostData,
      form,
    ]
  );

  console.log(postData);

  return (
    <>
      {editMode === 'update' && loading && (
        <Loading
          message='포스트 정보를 불러오는 중입니다...'
        />
      )}
      {editMode === 'update' && (!response || !done) && (
        null
      )}
      {done && postData && (
        <>
          <Frame.Header text='NIHILOG POST EDITOR' href='/admin/dashboard'>
            <PostStatusBadges
              editMode={editMode}
              pstStts={postData.pstStts}
              rlsYn={postData.rlsYn}
              secrYn={postData.secrYn}
              archYn={postData.archYn}
              pinYn={postData.pinYn}
            />
            <div className='frame-nav-saparator' />
            <Frame.AuthButtons
              beforeSignInMenu={[]}
              afterSignInMenu={menuItems}
            />
          </Frame.Header>
          <Frame.Content>
            <Frame.Main>
              <Box.Content className='gap-5'>
                <Input.Label label='제목' direction='horizontal'>
                  <Input.Text
                    type='text'
                    placeholder='제목을 입력해주세요.'
                    {...form.register('pstTtl')}
                  />
                </Input.Label>

                <Input.Label label='요약' direction='horizontal'>
                  <Input.LongText
                    rows={3}
                    className='resize-none'
                    placeholder='요약을 입력해주세요.'
                    {...form.register('pstSmry')}
                  />
                </Input.Label>

                <div className='p-5 border border-black-300 rounded-2'>
                  <BlockNoteEditor
                    initialContent={
                      postData.pstMtxt && postData.pstMtxt.length > 0
                        ? (postData.pstMtxt as PartialBlock[])
                        : undefined
                    }
                    onChange={(blocks: Block[]) => {
                      const blocksJson = JSON.stringify(blocks);
                      form.setValue(
                        'pstMtxt',
                        blocksJson
                      );
                      setPostData({
                        ...postData,
                        pstMtxt: blocks,
                      });
                    }}
                  />
                </div>
              </Box.Content>
            </Frame.Main>
            <Frame.Side sidePosition='right' title='사이드바'>
              <Box.Content className='gap-5'>
                <Input.Label label='카테고리' direction='vertical'>
                  <Input.Text
                    type='text'
                    placeholder='카테고리를 입력해주세요.'
                    {...form.register('ctgryNo')}
                  />
                </Input.Label>
              </Box.Content>
            </Frame.Side>
          </Frame.Content>
          <Frame.Footer />
        </>
      )}
    </>
  );
}

export function PostEditor({ }: Props) {
  return (
    <Suspense fallback={<Loading message='포스트 정보를 불러오는 중입니다...' />}>
      <PostEditorContent />
    </Suspense>
  );
}
