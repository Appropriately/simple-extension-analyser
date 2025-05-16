import { Content, Model, Service } from "./service";

export interface Session {
  id: string;
  service: Service;
  model: Model;
  system?: string;

  getHistory: () => Promise<Content[]>;
  streamContent: (content: Content) => AsyncGenerator<string>;
}
