import { useTranslation } from "react-i18next";

import { Card, Icon } from "@/components/ui";
import { useToasts } from "@/features/toasts";
import { ApiKeyForm, hasApiKey, setApiKey } from "@/features/virustotal";

interface Props {
  className?: string;
}

function VirusTotal({ className }: Props) {
  const { t } = useTranslation();
  const { show } = useToasts();

  const save = (key: string) => {
    setApiKey(key);
    show({
      header: t("features.virustotal.apiKey.success"),
      body: t("features.virustotal.apiKey.successMessage"),
      type: "success",
      durationMs: 5000,
    });
  };

  return (
    <div className={className}>
      <Card>
        <Card.Header>
          <h4 className="flex items-center">
            {hasApiKey() && (
              <Icon
                icon="check2-circle"
                className="fill-green-500 inline-block me-2"
                width={22}
                height={22}
              />
            )}
            {t("features.virustotal.title")}
          </h4>
        </Card.Header>

        <Card.Body>
          <ApiKeyForm onSave={save} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default VirusTotal;
