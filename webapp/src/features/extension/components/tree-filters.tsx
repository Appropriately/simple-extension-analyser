import { useEffect, useState } from "react";

import Input from "@/components/forms/input";

import { EntryTreeFilters } from "../types";

interface Props {
  onChange: (entry: EntryTreeFilters) => void;
}

function TreeFilters({ onChange }: Props) {
  const [filters, setFilters] = useState<EntryTreeFilters>({});

  useEffect(() => onChange(filters), [filters, onChange]);

  return (
    <>
      <Input
        type="text"
        placeholder="Search..."
        onChange={(e) => setFilters({ ...filters, term: e.target.value })}
      />
    </>
  );
}

export default TreeFilters;
