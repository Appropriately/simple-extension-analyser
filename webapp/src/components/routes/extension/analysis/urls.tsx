import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui";
import { useToasts } from "@/features/toasts";
import {
  ApiKeyForm,
  hasApiKey,
  scanUrl,
  setApiKey,
  Url,
  UrlAnalysis,
} from "@/features/virustotal";

interface Props {
  urls: string[];
  className?: string;
}

function Urls({ urls }: Props) {
  const { t } = useTranslation();
  const { error, show } = useToasts();

  const [analysis, setAnalysis] = useState<UrlAnalysis>();
  const [processedUrls, setProcessedUrls] = useState<URL[] | undefined>(
    undefined
  );

  useEffect(() => {
    // Process URLs in a non-blocking way
    const processUrls = async () => {
      // Defer processing to next tick to allow component to render
      setTimeout(() => {
        const parsedUrls = urls.map((url) => URL.parse(url));
        const uniqueUrls = parsedUrls.filter(
          (url, index, self) =>
            url &&
            self.findIndex((t) => t && t.hostname === url.hostname) === index
        );
        const sortedUrls = uniqueUrls
          .filter((url) => url !== null)
          .sort((a, b) => {
            if (!a || !b) return 0;
            return a.hostname.localeCompare(b.hostname);
          });
        setProcessedUrls(sortedUrls);
      }, 0);
    };

    processUrls();
  }, [urls]);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    show({
      header: t("features.virustotal.apiKey.success"),
      body: t("features.virustotal.apiKey.successMessage"),
      type: "success",
      durationMs: 5000,
    });
  };

  const analyse = async (url: URL | null) => {
    if (!url) return;

    try {
      const res = await scanUrl(url);
      setAnalysis(res);
    } catch (err) {
      if (err instanceof Error) {
        error(err);
      } else {
        error(new Error("An unknown error occurred"));
      }
    }
  };

  return (
    <>
      <div className="flex gap-x-2">
        <Card className="h-full w-64">
          <Card.Header>
            {t("routes.extension.entry.urls.urls")} (
            {processedUrls?.length ?? 0})
          </Card.Header>
          <Card.Body className="overflow-y-auto h-66 w-64">
            {processedUrls === undefined ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-10 w-10 border-4 border-zinc-500 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              processedUrls.map((url) => (
                <button
                  key={url?.href}
                  className={`w-full text-left text-sm px-2 py-1 rounded-md ${
                    hasApiKey()
                      ? "hover:bg-zinc-800 active:bg-zinc-700 cursor-pointer"
                      : "cursor-not-allowed text-zinc-400"
                  }`}
                  onClick={() => hasApiKey() && analyse(url)}
                >
                  {url?.hostname}
                </button>
              ))
            )}
          </Card.Body>
        </Card>

        <div className="w-full">
          <Card className="h-full">
            <Card.Body>
              {hasApiKey() ? (
                analysis && <Url analysis={analysis} />
              ) : (
                <ApiKeyForm onSave={saveApiKey} />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Urls;
