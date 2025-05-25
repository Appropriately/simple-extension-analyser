import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, Select } from "@/components/ui";
import { StreamWriter } from "@/features/ai";
import { Model, Service } from "@/features/ai/types/service";
import { Extension } from "@/features/extension";
import { useToasts } from "@/features/toasts";

interface Props {
  extension: Extension;
  service: Service;
  models: Model[];
}

export function CardContent({ extension, service, models }: Props) {
  const { t } = useTranslation();
  const { error } = useToasts();

  const [textStream, setTextStream] = useState<AsyncGenerator<string> | null>(
    null
  );
  const [streamError, setStreamError] = useState<Error | null>(null);
  const [currentModel, setCurrentModel] = useState<Model | null>(null);

  useEffect(() => {
    setCurrentModel(models[0]);
  }, [models]);

  const session = useMemo(() => {
    if (!currentModel) return null;

    return service.createSession(
      currentModel,
      "You are providing a concise description of an extension from a cybersecurity perspective with evidence, returning Markdown with all formatting supported."
    );
  }, [service, currentModel]);

  const analyse = async () => {
    setTextStream(null);
    setStreamError(null);

    if (!session) throw new Error("No session");

    try {
      const content = {
        role: "user",
        content: JSON.stringify(extension.manifest),
      };

      setTextStream(session.streamContent(content));
    } catch (e) {
      if (e instanceof Error) error(e);
      setTextStream(null);
    }
  };

  const handleStreamError = (e: Error) => {
    setStreamError(e);
    error(e);
    setTextStream(null);
  };

  const onAnalyse = async () => {
    try {
      await analyse();
    } catch (e) {
      if (e instanceof Error) {
        error(e);
      } else {
        error(new Error("An unknown error occurred"));
      }
    }
  };

  return (
    <>
      {textStream && !streamError ? (
        <Card.Body className="max-h-[300px] overflow-y-auto">
          <StreamWriter stream={textStream} onError={handleStreamError} />
        </Card.Body>
      ) : (
        <>
          <Card.Body>
            <p>{t("routes.extension.extension.ai.aiAnalysisDescription")}</p>
          </Card.Body>

          <Card.Footer className="flex justify-between">
            <div className="max-w-[500px] flex gap-2 items-center">
              <label className="text-zinc-600 dark:text-zinc-300">
                {t("routes.extension.extension.ai.model")}
              </label>
              <Select
                value={currentModel?.id || ""}
                onChange={(e) => {
                  const model = models.find((m) => m.id === e.target.value);
                  if (model) setCurrentModel(model);
                }}
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Select>
            </div>

            {models.length > 0 && (
              <Button variant="primary" onClick={onAnalyse}>
                {t("routes.extension.extension.ai.aiAnalysisButton")}
              </Button>
            )}
          </Card.Footer>
        </>
      )}
    </>
  );
}
