import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Card, Icon, Spinner } from "@/components/ui";
import { newServiceFromConfig } from "@/features/ai";
import { Model } from "@/features/ai/types/service";
import { Extension } from "@/features/extension";
import { RootState } from "@/stores/store";

import { CardContent } from "./card-content";

interface Props {
  className?: string;
  extension: Extension;
}

function Analysis({ className, extension }: Props) {
  const { t } = useTranslation();

  const activeProvider = useSelector(({ ai }: RootState) =>
    ai.providers.find((p) => p.type === ai.activeProvider)
  );

  const service = useMemo(() => {
    if (!activeProvider) return null;
    return newServiceFromConfig(activeProvider);
  }, [activeProvider]);

  const [models, setModels] = useState<Model[] | null>(null);

  useEffect(() => {
    if (!service) return;
    const fetchModels = async () => {
      setModels(null);
      const models = [];
      for await (const model of service.getModels()) models.push(model);
      setModels(models);
    };
    fetchModels();
  }, [service]);

  return (
    <Card className={className}>
      <Card.Header>
        <Icon icon="stars" className="mr-2 inline-block text-blue-500" />
        {t("routes.extension.extension.ai.aiAnalysis")}
      </Card.Header>

      {service && models ? (
        <CardContent extension={extension} service={service} models={models} />
      ) : (
        <Card.Body className="flex justify-center items-center h-32">
          <Spinner />
        </Card.Body>
      )}
    </Card>
  );
}

export default Analysis;
