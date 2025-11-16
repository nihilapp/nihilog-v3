interface FormatTextParams {
  selectedText: string;
  selectionStart: number;
  selectionEnd: number;
  currentValue: string;
  wrapper: string;
  patterns: {
    only: RegExp;
    withOther1: RegExp;
    withOther2: RegExp;
  };
  otherWrapper: string;
}

interface FormatTextResult {
  newContent: string;
  newStart: number;
  newEnd: number;
}

export function formatText(params: FormatTextParams): FormatTextResult | null {
  const {
    selectedText,
    selectionStart,
    selectionEnd,
    currentValue,
    wrapper,
    patterns,
    otherWrapper,
  } = params;

  if (selectionEnd - selectionStart === 0) {
    return null;
  }

  let newText: string;
  let newStart: number;
  let newEnd: number;

  if (patterns.only.test(selectedText)) {
    // 단독 포맷 제거: `wrappertextwrapper` → `text`
    const match = selectedText.match(patterns.only);
    if (match && match[1]) {
      newText = match[1];
      newStart = selectionStart;
      newEnd = selectionStart + newText.length;
    }
    else {
      return null;
    }
  }
  else if (patterns.withOther1.test(selectedText)) {
    // 다른 포맷과 함께 (순서1): `wrapper${otherWrapper}text${otherWrapper}wrapper` → `${otherWrapper}text${otherWrapper}`
    const match = selectedText.match(patterns.withOther1);
    if (match && match[1]) {
      newText = `${otherWrapper}${match[1]}${otherWrapper}`;
      newStart = selectionStart;
      newEnd = selectionStart + newText.length;
    }
    else {
      return null;
    }
  }
  else if (patterns.withOther2.test(selectedText)) {
    // 다른 포맷과 함께 (순서2): `${otherWrapper}wrappertextwrapper${otherWrapper}` → `${otherWrapper}text${otherWrapper}`
    const match = selectedText.match(patterns.withOther2);
    if (match && match[1]) {
      newText = `${otherWrapper}${match[1]}${otherWrapper}`;
      newStart = selectionStart;
      newEnd = selectionStart + newText.length;
    }
    else {
      return null;
    }
  }
  else {
    // 포맷 추가
    newText = `${wrapper}${selectedText}${wrapper}`;
    newStart = selectionStart;
    newEnd = selectionStart + newText.length;
  }

  // 선택된 부분을 새 텍스트로 교체
  const newContent = currentValue.substring(
    0,
    selectionStart
  ) + newText + currentValue.substring(selectionEnd);

  return {
    newContent,
    newStart,
    newEnd,
  };
}
