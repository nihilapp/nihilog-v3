'use client';

import { BsToggles } from 'react-icons/bs';
import { MdArchive, MdEdit, MdFolder, MdImage, MdLocalOffer, MdLockOutline, MdOutlineTextFields, MdPushPin, MdVpnKey } from 'react-icons/md';

import { PostCategorySelect } from '@/_components/admin/posts/PostCategorySelect';
import { Box } from '@/_components/ui/box';
import { Input } from '@/_components/ui/input';
import { usePostActions, usePostData, usePostErrors } from '@/_stores/posts.store';

interface Props {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function PostEditorSidebar({ tags, onTagsChange, }: Props) {
  const postData = usePostData();
  const postErrors = usePostErrors();
  const { setPostData, } = usePostActions();

  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = postErrors.find((err) => err.field === fieldName);
    return error?.message;
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

  const onStatusChange = (value: string) => {
    setPostData({
      ...postData,
      pstStts: value as 'EMPTY' | 'WRITING' | 'FINISHED',
    });
  };

  const onReleaseChange = (value: 'Y' | 'N') => {
    setPostData({
      ...postData,
      rlsYn: value,
    });
  };

  const onPinChange = (value: 'Y' | 'N') => {
    setPostData({
      ...postData,
      pinYn: value,
    });
  };

  const onArchiveChange = (value: 'Y' | 'N') => {
    setPostData({
      ...postData,
      archYn: value,
    });
  };

  const onSecretChange = (value: 'Y' | 'N') => {
    setPostData({
      ...postData,
      secrYn: value,
      // 비밀글이 N으로 변경되면 비밀번호 초기화
      pstPswd: value === 'N'
        ? ''
        : postData.pstPswd,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      pstPswd: e.target.value,
    });
  };

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      pstThmbLink: e.target.value || undefined,
    });
  };

  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      pstCd: e.target.value,
    });
  };

  const onCategoryChange = (value: number | undefined) => {
    setPostData({
      ...postData,
      ctgryNo: value,
    });
  };
  return (
    <Box.Content className='gap-5'>
      <Input.Label
        label='포스트 상태'
        icon={<MdEdit />}
        direction='vertical'
        errorMessage={getErrorMessage('pstStts')}
      >
        <Input.SelectContainer
          value={postData.pstStts ?? 'EMPTY'}
          onValueChange={onStatusChange}
        >
          <Input.Selection
            placeholder='상태를 선택하세요'
            displayValue={onStatusDisplayValue}
          />
          <Input.Select>
            <Input.SelectItem value='EMPTY'>
              초안 없음
            </Input.SelectItem>
            <Input.SelectItem value='WRITING'>
              작성중
            </Input.SelectItem>
            <Input.SelectItem value='FINISHED'>
              작성완료
            </Input.SelectItem>
          </Input.Select>
        </Input.SelectContainer>
      </Input.Label>

      {/* <Input.Label
        label='발행 일시'
        icon={<MdSchedule />}
        direction='vertical'
      >
        <Input.Text
          type='text'
          placeholder={`${DateFormat.DATETIME} 형식으로 입력하세요`}
          value={publDt || ''}
          onChange={onPublishDateInputChange}
        />
      </Input.Label> */}

      <Input.Label
        label='발행'
        icon={<BsToggles />}
        direction='horizontal'
      >
        <Input.Switch
          value={postData.rlsYn ?? 'N'}
          onChange={onReleaseChange}
        />
      </Input.Label>

      <Input.Label
        label='고정'
        icon={<MdPushPin />}
        direction='horizontal'
      >
        <Input.Switch
          value={postData.pinYn ?? 'N'}
          onChange={onPinChange}
        />
      </Input.Label>

      <Input.Label
        label='아카이브'
        icon={<MdArchive />}
        direction='horizontal'
      >
        <Input.Switch
          value={postData.archYn ?? 'N'}
          onChange={onArchiveChange}
        />
      </Input.Label>

      <Input.Label
        label='비밀글'
        icon={<MdLockOutline />}
        direction='horizontal'
      >
        <Input.Switch
          value={postData.secrYn ?? 'N'}
          onChange={onSecretChange}
        />
      </Input.Label>

      {postData.secrYn === 'Y' && (
        <Input.Label
          label='비밀번호'
          icon={<MdVpnKey />}
          direction='vertical'
          errorMessage={getErrorMessage('pstPswd')}
        >
          <Input.Text
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            value={postData.pstPswd}
            onChange={onPasswordChange}
          />
        </Input.Label>
      )}

      <Input.Label
        label='썸네일 링크'
        icon={<MdImage />}
        direction='vertical'
        errorMessage={getErrorMessage('pstThmbLink')}
      >
        <Input.Text
          type='text'
          placeholder='썸네일 이미지 URL을 입력해주세요.'
          value={postData.pstThmbLink || ''}
          onChange={onThumbnailChange}
        />
      </Input.Label>

      <Input.Label
        label='슬러그'
        icon={<MdOutlineTextFields />}
        direction='vertical'
        errorMessage={getErrorMessage('pstCd')}
      >
        <Input.Text
          type='text'
          placeholder='슬러그를 입력해주세요.'
          value={postData.pstCd}
          onChange={onSlugChange}
        />
      </Input.Label>

      <Input.Label
        label='카테고리'
        icon={<MdFolder />}
        direction='vertical'
        errorMessage={getErrorMessage('ctgryNo')}
      >
        <PostCategorySelect
          value={postData.ctgryNo}
          onChange={onCategoryChange}
        />
      </Input.Label>

      <Input.Label
        label='태그'
        icon={<MdLocalOffer />}
        direction='vertical'
        showErrorMessage={false}
      >
        <Input.TextArray
          value={tags}
          onChange={onTagsChange}
          placeholder='태그를 입력하고 Enter를 누르세요'
          maxItems={20}
          inputPosition='bottom'
          custom={{
            item: 'bg-black-100 text-black-900',
            itemButton: 'text-black-700 hover:text-black-900 hover:bg-black-200 focus:ring-black-500',
          }}
        />
      </Input.Label>
    </Box.Content>
  );
}
