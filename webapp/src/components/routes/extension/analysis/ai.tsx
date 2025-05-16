import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Card, Icon } from "@/components/ui";
import { newServiceFromConfig } from "@/features/ai";
import { Model } from "@/features/ai/types/service";
import { RootState } from "@/stores/store";

import { CardContent } from "./ai/card-content";

interface Props {
  className?: string;
}

function AI({ className }: Props) {
  const { t } = useTranslation();

  const activeProvider = useSelector(({ ai }: RootState) =>
    ai.providers.find((p) => p.type === ai.activeProvider)
  );

  const provider = useMemo(() => {
    if (!activeProvider) return null;
    return newServiceFromConfig(activeProvider);
  }, [activeProvider]);

  const [models, setModels] = useState<Model[] | null>(null);
  const [currentModel, setCurrentModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provider) return;
    const fetchModels = async () => {
      setLoading(true);
      const models = [];
      for await (const model of provider.getModels()) models.push(model);
      setModels(models);
      setCurrentModel(models[0] || null);
      setLoading(false);
    };
    fetchModels();
  }, [provider]);

  return (
    <Card className={className}>
      <Card.Header>
        <Icon icon="stars" className="mr-2 inline-block text-blue-500" />
        {t("routes.extension.extension.ai.aiAnalysis")}
      </Card.Header>

      <CardContent
        models={models}
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        loading={loading}
      />
    </Card>
  );
}

export default AI;
