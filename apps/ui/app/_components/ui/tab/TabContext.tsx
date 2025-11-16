'use client';

import { createContext, useContext } from 'react';

interface TabContextValue {
  selectedTab: string | null;
  setSelectedTab: (tab: string) => void;
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within TabContainer');
  }
  return context;
}

export { TabContext };
