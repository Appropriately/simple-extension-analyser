import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui";

import { EntryTreeFilters } from "../types";

interface Props {
  onChange: (entry: EntryTreeFilters) => void;
}

function TreeFilters({ onChange }: Props) {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<EntryTreeFilters>({});

  useEffect(() => onChange(filters), [filters, onChange]);

  return (
    <>
      <Input
        type="text"
        placeholder={t("features.extension.tree.filters.placeholder")}
        onChange={(e) => setFilters({ ...filters, term: e.target.value })}
      />
    </>
  );
}

export default TreeFilters;
