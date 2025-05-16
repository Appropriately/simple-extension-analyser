import { services } from "../lib";

export type ProviderType = keyof typeof services;

export interface ProviderConfig {
  type: ProviderType;
  apiKey: string;
}
