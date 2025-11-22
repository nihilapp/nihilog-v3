'use client';

import type { Block } from '@blocknote/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePostSchema } from '@nihilog/schemas';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdSave, MdPublish } from 'react-icons/md';

import type { BlockNoteEditorRef } from '@/_components/admin/posts/BlockNoteEditor';
import { PostEditorMain } from '@/_components/admin/posts/PostEditorMain';
import { PostEditorSidebar } from '@/_components/admin/posts/PostEditorSidebar';
import { PostStatusBadges } from '@/_components/admin/posts/PostStatusBadges';
import { Loading } from '@/_components/common/Loading';
import { Frame } from '@/_components/ui/frame';
import { useAdminUpdatePost } from '@/_entities/admin/posts/hooks/use-admin-update-post';
import { useAlert } from '@/_entities/common/hooks/use-alert';
import { useGetPostByNo } from '@/_entities/posts/hooks';
import { DateFormat, DateTools } from '@/_libs/tools/date.tools';
import { useEditMode, usePostActions, usePostData } from '@/_stores/posts.store';
import type { Menu } from '@/_types/common.types';

// BlockNoteEditorDynamic은 PostEditorMain에서 사용
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

interface Props {}

function PostEditorContent() {
  const params = useSearchParams();
  const pstNo = params.get('pstNo');

  const editMode = useEditMode();
  const postData = usePostData();

  const { setPostData, } = usePostActions();
  const router = useRouter();
  const { triggerError, triggerConfirm, } = useAlert();

  const { response, loading, done, } = useGetPostByNo(Number(pstNo));
  const updatePostMutation = useAdminUpdatePost(Number(pstNo) || 0);
  const editorRef = useRef<BlockNoteEditorRef>(null);

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
  const pstStts = form.watch('pstStts');
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

  const onStatusChange = (value: string) => {
    form.setValue(
      'pstStts',
      value as 'EMPTY' | 'WRITING' | 'FINISHED',
      { shouldValidate: true, }
    );
  };

  const onStatusDisplayValue = (value: string) => {
    switch (value) {
      case 'EMPTY':
        return '초안 없음';
      case 'WRITING':
        return '작성중';
      case 'FINISHED':
        return '작성완료';
      default:
        return value;
    }
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

  const getFieldName = (fieldName: string): string => {
    const fieldNameMap: Record<string, string> = {
      pstTtl: '제목',
      pstSmry: '요약',
      pstMtxt: '본문',
      pstCd: '슬러그',
      pstThmbLink: '썸네일 링크',
      pstStts: '상태',
      publDt: '발행 일시',
      pinYn: '고정',
      rlsYn: '공개',
      archYn: '보관',
      secrYn: '비밀글',
      pstPswd: '비밀번호',
      ctgryNo: '카테고리',
    };

    return fieldNameMap[fieldName] || fieldName;
  };

  const onSavePost = async () => {
    if (!pstNo) {
      triggerError('포스트 번호가 없습니다.');
      return;
    }

    const formData = form.getValues();
    // 빈 문자열을 undefined로 변환 (optional 필드에서 빈 문자열은 validation을 트리거함)
    const cleanedData = Object.fromEntries(Object.entries(formData).map(([
      key,
      value,
    ]) => [
      key,
      value === ''
        ? undefined
        : value,
    ])) as Record<string, unknown>;

    // 변환된 데이터를 form에 설정
    Object.entries(cleanedData).forEach(([
      key,
      value,
    ]) => {
      form.setValue(
        key as keyof typeof formData,
        value as never
      );
    });

    // 변환된 데이터로 다시 검증
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      const firstErrorKey = Object.keys(errors)[0];
      if (!firstErrorKey) {
        triggerError('입력값을 확인해주세요.');
        return;
      }
      const firstError = errors[firstErrorKey as keyof typeof errors];
      const fieldName = getFieldName(firstErrorKey);
      const errorMessage = firstError?.message as string || '입력값을 확인해주세요.';
      triggerError(`${fieldName}: ${errorMessage}`);
      return;
    }

    triggerConfirm(
      '포스트를 저장하시겠습니까?',
      () => {
        const {
          updtNo: _updtNo,
          updtDt: _updtDt,
          delNo: _delNo,
          delDt: _delDt,
          pstNoList: _pstNoList,
          ...updateData
        } = cleanedData;
        updatePostMutation.mutate(updateData);
      }
    );
  };

  const onPublishPost = async () => {
    if (!pstNo) {
      triggerError('포스트 번호가 없습니다.');
      return;
    }

    const formData = form.getValues();
    // 빈 문자열을 undefined로 변환 (optional 필드에서 빈 문자열은 validation을 트리거함)
    const cleanedData = Object.fromEntries(Object.entries(formData).map(([
      key,
      value,
    ]) => [
      key,
      value === ''
        ? undefined
        : value,
    ])) as Record<string, unknown>;

    // 변환된 데이터를 form에 설정
    Object.entries(cleanedData).forEach(([
      key,
      value,
    ]) => {
      form.setValue(
        key as keyof typeof formData,
        value as never
      );
    });

    // 변환된 데이터로 다시 검증
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      const firstErrorKey = Object.keys(errors)[0];
      if (!firstErrorKey) {
        triggerError('입력값을 확인해주세요.');
        return;
      }
      const firstError = errors[firstErrorKey as keyof typeof errors];
      const fieldName = getFieldName(firstErrorKey);
      const errorMessage = firstError?.message as string || '입력값을 확인해주세요.';
      triggerError(`${fieldName}: ${errorMessage}`);
      return;
    }

    triggerConfirm(
      '포스트를 발행하시겠습니까?',
      () => {
        const {
          updtNo: _updtNo,
          updtDt: _updtDt,
          delNo: _delNo,
          delDt: _delDt,
          pstNoList: _pstNoList,
          ...baseData
        } = cleanedData;
        const now = DateTools.format(
          DateTools.now(),
          DateFormat.DATETIME
        );

        updatePostMutation.mutate({
          ...baseData,
          rlsYn: 'Y',
          pstStts: 'FINISHED',
          publDt: (baseData.publDt as string | undefined)
            || now,
        });
      }
    );
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
              <PostEditorMain
                form={form}
                postData={postData}
                onEditorChange={onEditorChange}
                onEditorContainerClick={onEditorContainerClick}
              />
            </Frame.Main>
            <Frame.Side sidePosition='right' title='사이드바'>
              <PostEditorSidebar
                form={form}
                tags={tags}
                setTags={setTags}
                selectedCtgryNo={selectedCtgryNo}
                pstStts={pstStts}
                rlsYn={rlsYn}
                secrYn={secrYn}
                pinYn={pinYn}
                archYn={archYn}
                onCategoryChange={onCategoryChange}
                onStatusChange={onStatusChange}
                onReleaseChange={onReleaseChange}
                onSecretChange={onSecretChange}
                onPinChange={onPinChange}
                onArchiveChange={onArchiveChange}
                onStatusDisplayValue={onStatusDisplayValue}
              />
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
