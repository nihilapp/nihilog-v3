import { useCallback, useRef, useState } from 'react';

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FormElementValue<T extends FormElement> = T extends HTMLInputElement
  ? T['type'] extends 'checkbox' | 'radio'
    ? boolean
    : string
  : T extends HTMLTextAreaElement
    ? string
    : T extends HTMLSelectElement
      ? string
      : string;

export function useInput<
  TElement extends FormElement = HTMLInputElement,
  TValue = FormElementValue<TElement>
>(initialValue: TValue | (() => TValue)) {
  const [
    value,
    setValue,
  ] = useState<TValue>(initialValue);
  const [
    isFocused,
    setIsFocused,
  ] = useState(false);
  const [
    isDirty,
    setIsDirty,
  ] = useState(false);

  const ref = useRef<TElement>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<TElement>) => {
      const newValue = (e.target.type === 'checkbox' || e.target.type === 'radio')
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

      setValue(newValue as TValue);
      setIsDirty(true);
    },
    []
  );

  const onInput = useCallback(
    (e: React.FormEvent<TElement>) => {
      const target = e.currentTarget;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        const newValue = target.value;
        setValue(newValue as TValue);
        setIsDirty(true);
      }
    },
    []
  );

  const onBlur = useCallback(
    () => {
      setIsFocused(false);
    },
    []
  );

  const onFocus = useCallback(
    () => {
      setIsFocused(true);
    },
    []
  );

  const reset = useCallback(
    () => {
      setValue(initialValue instanceof Function
        ? initialValue()
        : initialValue);
      setIsDirty(false);
      setIsFocused(false);
    },
    [ initialValue, ]
  );

  const clear = useCallback(
    () => {
      setValue('' as TValue);
      setIsDirty(false);
    },
    []
  );

  const getSelection = useCallback(
    () => {
      const element = ref.current;
      if (!element || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
        return {
          start: 0,
          end: 0,
          text: '',
          length: 0,
        };
      }

      const start = element.selectionStart ?? 0;
      const end = element.selectionEnd ?? 0;
      const text = element.value.substring(
        start,
        end
      );

      return {
        start,
        end,
        text,
        length: end - start,
      };
    },
    []
  );

  return {
    value,
    setValue,
    ref,
    isFocused,
    isDirty,
    onChange,
    onInput,
    onBlur,
    onFocus,
    reset,
    clear,
    getSelection,
  };
}
