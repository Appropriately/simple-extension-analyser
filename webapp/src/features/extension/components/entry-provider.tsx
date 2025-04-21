import { ReactNode, useState } from "react";

import { EntryContext } from "../context/entry";
import { ExtendedEntry } from "../types/entry";

export const EntryProvider = ({ children }: { children: ReactNode }) => {
  const [entry, setEntry] = useState<ExtendedEntry | undefined>(undefined);

  return (
    <EntryContext.Provider value={{ entry, setEntry }}>
      {children}
    </EntryContext.Provider>
  );
};

export default EntryProvider;
