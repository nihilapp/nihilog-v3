'use client';

import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Done({ children, }: Props) {
  return (
    <>
      {children}
    </>
  );
}
