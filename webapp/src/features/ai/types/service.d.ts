import { Session } from "./session";

export interface Model {
  id: string;
  name?: string;
  version?: string;
  description?: string;
  properties?: Record<string, unknown>;
}

export interface Content {
  role?: string;
  content: string;
}

export interface Service {
  sessions: Record<string, Session>;

  /**
   * Test the service to ensure it is working.
   */
  test: () => Promise<void>;

  /**
   * Get a list of models available from the service.
   */
  getModels: () => AsyncGenerator<Model>;

  /**
   * Create a new session with the service.
   */
  createSession: (model: Model, system?: string) => Session;
}
