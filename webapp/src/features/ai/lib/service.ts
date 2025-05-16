import { ProviderConfig, Service } from "../types";
import Gemini from "./services/gemini";

export const newServiceFromConfig = (config: ProviderConfig): Service => {
  switch (config.type) {
    case "gemini":
      return new Gemini(config);
    default:
      throw new Error(`Unsupported provider: ${config.type}`);
  }
};
