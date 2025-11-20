'use client';

import type { Block, PartialBlock } from '@blocknote/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePostSchema } from '@nihilog/schemas';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsToggles } from 'react-icons/bs';
import { MdSave, MdPublish, MdTitle, MdDescription, MdFolder, MdOutlineTextFields, MdLockOutline, MdVpnKey, MdLocalOffer, MdImage, MdPushPin, MdArchive } from 'react-icons/md';

import { PostCategorySelect } from '@/_components/admin/posts/PostCategorySelect';
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

  const onSavePost = () => {
    console.log('저장');
  };

  const onPublishPost = () => {
    //
  };

  const menuItems: Menu[] = [
    {
      icon: <MdSave />,
      name: '저장',
      action: onSavePost,
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
    {
      icon: <MdPublish />,
      name: '발행',
      action: onPublishPost,
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

  const selectedCtgryNo = form.watch('ctgryNo');
  const rlsYn = form.watch('rlsYn');
  const secrYn = form.watch('secrYn');
  const pinYn = form.watch('pinYn');
  const archYn = form.watch('archYn');
  const [
    tags,
    setTags,
  ] = useState<string[]>([]);

  const onEditorChange = (blocks: Block[]) => {
    const blocksJson = JSON.stringify(blocks);
    form.setValue(
      'pstMtxt',
      blocksJson
    );
    setPostData({
      ...postData,
      pstMtxt: blocks,
    });
  };

  const onCategoryChange = (value: number | undefined) => {
    form.setValue(
      'ctgryNo',
      value,
      { shouldValidate: true, }
    );
  };

  const onReleaseChange = (value: 'Y' | 'N') => {
    form.setValue(
      'rlsYn',
      value,
      { shouldValidate: true, }
    );
  };

  const onSecretChange = (value: 'Y' | 'N') => {
    form.setValue(
      'secrYn',
      value,
      { shouldValidate: true, }
    );
    // 비밀글이 N으로 변경되면 비밀번호 초기화
    if (value === 'N') {
      form.setValue(
        'pstPswd',
        '',
        { shouldValidate: true, }
      );
    }
  };

  const onPinChange = (value: 'Y' | 'N') => {
    form.setValue(
      'pinYn',
      value,
      { shouldValidate: true, }
    );
  };

  const onArchiveChange = (value: 'Y' | 'N') => {
    form.setValue(
      'archYn',
      value,
      { shouldValidate: true, }
    );
  };

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

  console.log(form.getValues());

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

                <div className='p-5 border border-black-300 rounded-2 flex-1 flex flex-col min-h-0'>
                  <BlockNoteEditor
                    initialContent={
                      postData.pstMtxt && postData.pstMtxt.length > 0
                        ? (postData.pstMtxt as PartialBlock[])
                        : undefined
                    }
                    onChange={onEditorChange}
                  />
                </div>
              </Box.Content>
            </Frame.Main>
            <Frame.Side sidePosition='right' title='사이드바'>
              <Box.Content className='gap-5'>
                <Input.Label
                  label='발행'
                  icon={<BsToggles />}
                  direction='horizontal'
                >
                  <Input.Switch
                    value={rlsYn ?? 'N'}
                    onChange={onReleaseChange}
                  />
                </Input.Label>

                <Input.Label
                  label='고정'
                  icon={<MdPushPin />}
                  direction='horizontal'
                >
                  <Input.Switch
                    value={pinYn ?? 'N'}
                    onChange={onPinChange}
                  />
                </Input.Label>

                <Input.Label
                  label='아카이브'
                  icon={<MdArchive />}
                  direction='horizontal'
                >
                  <Input.Switch
                    value={archYn ?? 'N'}
                    onChange={onArchiveChange}
                  />
                </Input.Label>

                <Input.Label
                  label='비밀글'
                  icon={<MdLockOutline />}
                  direction='horizontal'
                >
                  <Input.Switch
                    value={secrYn ?? 'N'}
                    onChange={onSecretChange}
                  />
                </Input.Label>

                {secrYn === 'Y' && (
                  <Input.Label
                    label='비밀번호'
                    icon={<MdVpnKey />}
                    direction='vertical'
                  >
                    <Input.Text
                      type='password'
                      placeholder='비밀번호를 입력해주세요.'
                      {...form.register('pstPswd')}
                    />
                  </Input.Label>
                )}

                <Input.Label
                  label='썸네일 링크'
                  icon={<MdImage />}
                  direction='vertical'
                >
                  <Input.Text
                    type='text'
                    placeholder='썸네일 이미지 URL을 입력해주세요.'
                    {...form.register('pstThmbLink')}
                  />
                </Input.Label>

                <Input.Label
                  label='슬러그'
                  icon={<MdOutlineTextFields />}
                  direction='vertical'
                >
                  <Input.Text
                    type='text'
                    placeholder='슬러그를 입력해주세요.'
                    {...form.register('pstCd')}
                  />
                </Input.Label>

                <Input.Label
                  label='카테고리'
                  icon={<MdFolder />}
                  direction='vertical'
                >
                  <PostCategorySelect
                    value={selectedCtgryNo}
                    onChange={onCategoryChange}
                  />
                </Input.Label>

                <Input.Label
                  label='태그'
                  icon={<MdLocalOffer />}
                  direction='vertical'
                >
                  <Input.TextArray
                    value={tags}
                    onChange={setTags}
                    placeholder='태그를 입력하고 Enter를 누르세요'
                    maxItems={20}
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
