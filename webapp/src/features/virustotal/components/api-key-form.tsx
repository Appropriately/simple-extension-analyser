import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, FormGroup, Input, Form } from "@/components/ui";

interface FormData {
  apiKey: string;
}

interface Props {
  className?: string;
  onSave: (key: string) => void;
}

function ApiKeyForm({ onSave }: Props) {
  const { t } = useTranslation();

  const [key, setKey] = useState("");

  const save = (data: FormData) => {
    if (!data.apiKey) return;
    onSave(data.apiKey);
  };

  return (
    <Form<FormData> className="flex items-center gap-3" onSubmit={save}>
      <FormGroup
        className="flex-1"
        label={t("features.virustotal.apiKey.label")}
        help={t("features.virustotal.apiKey.help")}
      >
        <Input
          name="apiKey"
          placeholder={t("features.virustotal.apiKey.placeholder")}
          value={key}
          type="password"
          required
          minLength={16}
          onChange={(e) => setKey(e.target.value)}
        />
      </FormGroup>

      <Button type="submit" className="ml-auto">
        {t("base.save")}
      </Button>
    </Form>
  );
}

export default ApiKeyForm;
