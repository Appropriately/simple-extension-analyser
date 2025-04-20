import { createContext, useContext } from 'react';

import { ExtendedEntry } from '@/features/extension/types/entry';

interface EntryContextType {
  entry?: ExtendedEntry;
  setEntry: (entry?: ExtendedEntry) => void;
}

export const EntryContext = createContext<EntryContextType | undefined>(undefined);

export const useEntryContext = () => {
  const context = useContext(EntryContext);
  if (context === undefined) throw new Error("useEntryContext must be used within an EntryProvider");

  return context;
};
