import { ReactNode, useState } from 'react';

import { ExtendedEntry } from '../types/entry';
import { EntryContext } from './entry';

export const EntryProvider = ({ children }: { children: ReactNode }) => {
  const [entry, setEntry] = useState<ExtendedEntry | undefined>(undefined);

  return (
    <EntryContext.Provider value={{ entry, setEntry }}>
      {children}
    </EntryContext.Provider>
  );
};

export default EntryProvider;
