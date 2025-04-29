export class VirusTotalSession {
  private apiKey: string | null = null;
  private baseUrl: string = "https://www.virustotal.com/api/v3";

  public constructor() {}

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public getApiKey(): string | null {
    return this.apiKey;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getBaseOptions(): RequestInit {
    if (!this.apiKey) throw new Error("API key is not set");

    const headers: HeadersInit = {
      accept: "application/json",
      "x-apikey": this.apiKey,
      "Content-Type": "application/json",
    };

    return {
      method: "GET",
      headers,
    };
  }
}
