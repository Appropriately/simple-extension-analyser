import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, FormGroup, Input } from "@/components/ui";

interface Props {
  className?: string;
  onSave: (key: string) => void;
}

function ApiKeyForm({ onSave }: Props) {
  const { t } = useTranslation();

  const [key, setKey] = useState("");

  const save = () => {
    if (!key) {
      return;
    }

    onSave(key);
  };

  return (
    <div className="flex items-center gap-3">
      <FormGroup
        className="flex-1"
        label={t("features.virustotal.apiKey.label")}
        help={t("features.virustotal.apiKey.help")}
      >
        <Input
          placeholder={t("features.virustotal.apiKey.placeholder")}
          value={key}
          type="password"
          required
          onChange={(e) => setKey(e.target.value)}
        />
      </FormGroup>

      <Button onClick={save} className="ml-auto">
        {t("base.save")}
      </Button>
    </div>
  );
}

export default ApiKeyForm;
