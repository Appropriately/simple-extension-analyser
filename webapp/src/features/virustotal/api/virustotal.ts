import { Analysis, AnalysisId } from "../types";
import { VirusTotalSession } from "./session";

export function createVirusTotal() {
  const session = new VirusTotalSession();

  return {
    hasApiKey: () => !!session.getApiKey(),
    setApiKey: (apiKey: string) => session.setApiKey(apiKey),
    postUrl,
    getAnalysisById,
  };

  async function postUrl(url: URL): Promise<AnalysisId> {
    const options = session.getBaseOptions();
    options.headers = {
      ...options.headers,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    options.method = "POST";
    options.body = new URLSearchParams({
      url: url.toString(),
    });

    const response = await fetch(`${session.getBaseUrl()}/urls`, options);
    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    return data.data.id as AnalysisId;
  }

  async function getAnalysisById(id: AnalysisId): Promise<Analysis> {
    const options = session.getBaseOptions();
    options.method = "GET";

    const response = await fetch(
      `${session.getBaseUrl()}/analyses/${id}`,
      options
    );
    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    return (await response.json()) as Analysis;
  }
}
