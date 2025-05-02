import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/forms/form-group";
import Input from "@/components/forms/input";
import { useToasts } from "@/features/toasts";
import { setApiKey } from "@/features/virustotal";

interface Props {
  className?: string;
}

function VirusTotal({ className }: Props) {
  const { t } = useTranslation();
  const { show, error } = useToasts();

  const [key, setKey] = useState("");

  const save = () => {
    if (!key) {
      error(new Error("API key is required."));
      return;
    }

    setApiKey(key);
    show({
      header: t("routes.settings.virustotal.apiKeySuccess"),
      body: t("routes.settings.virustotal.apiKeySuccessMessage"),
      type: "success",
      durationMs: 5000,
    });
  };
  return (
    <div className={`container mx-auto mt-2 ${className ? className : ""}`}>
      <Card>
        <Card.Header>
          <h1>{t("routes.settings.virustotal.title")}</h1>
        </Card.Header>

        <Card.Body>
          <FormGroup
            className="mb-3"
            label={t("routes.settings.virustotal.apiKey")}
            help={t("routes.settings.virustotal.apiKeyHelp")}
          >
            <Input
              placeholder={t("routes.settings.virustotal.apiKeyPlaceholder")}
              value={key}
              type="password"
              required
              onChange={(e) => setKey(e.target.value)}
            />
          </FormGroup>

          <Button onClick={save}>{t("base.save")}</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VirusTotal;
