import { createVirusTotal } from "../api";
import { UrlAnalysis } from "../types";

const virusTotal = createVirusTotal();

const hasApiKey = () => virusTotal.hasApiKey();

const setApiKey = (apiKey: string) => virusTotal.setApiKey(apiKey);

const scanUrl = async (url: URL): Promise<UrlAnalysis> => {
  const analysisId = await virusTotal.postUrl(url);

  let analysis: UrlAnalysis;
  do {
    analysis = (await virusTotal.getAnalysisById(analysisId)) as UrlAnalysis;
    if (analysis.data.attributes.status !== "completed")
      await new Promise((resolve) => setTimeout(resolve, 5000));
  } while (analysis.data.attributes.status !== "completed");

  return analysis;
};

export { scanUrl, setApiKey, hasApiKey };
