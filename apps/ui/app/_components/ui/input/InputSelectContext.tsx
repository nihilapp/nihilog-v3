'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface InputSelectContextValue {
  value: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (value: string) => void;
  onToggle: () => void;
}

const InputSelectContext = createContext<InputSelectContextValue | null>(null);

export function useInputSelectContext() {
  const context = useContext(InputSelectContext);
  if (!context) {
    throw new Error('InputSelect 컴포넌트는 InputSelectContainer 내부에서 사용되어야 합니다.');
  }
  return context;
}

interface InputSelectProviderProps {
  children: ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
}

export function InputSelectProvider({ children, value, onValueChange, }: InputSelectProviderProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const onSelect = (newValue: string) => {
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <InputSelectContext.Provider
      value={{
        value,
        isOpen,
        setIsOpen,
        onSelect,
        onToggle,
      }}
    >
      {children}
    </InputSelectContext.Provider>
  );
}
