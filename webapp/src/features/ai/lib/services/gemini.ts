import { Chat, CreateChatParameters, GoogleGenAI } from "@google/genai";

import { Content, Model, ProviderConfig, Service } from "../../types";
import { Session } from "../../types";

class GeminiSession implements Session {
  id: string;
  service: Gemini;
  chat: Chat;
  model: Model;
  system?: string;

  constructor(id: string, service: Gemini, model: Model, system?: string) {
    this.id = id;
    this.service = service;
    this.system = system;
    this.model = model;

    const options: CreateChatParameters = {
      model: this.model.id,
    };

    if (system) options.config = { systemInstruction: system };

    this.chat = this.service.client.chats.create(options);
  }

  async getHistory(): Promise<Content[]> {
    const history = this.chat.getHistory();
    const contents: Content[] = [];

    for (const message of history) {
      contents.push({
        role: message.role,
        content: message.parts?.map((part) => part.text).join("") ?? "",
      });
    }

    return contents;
  }

  async *streamContent(content: Content): AsyncGenerator<string> {
    const stream = await this.chat.sendMessageStream({
      message: content.content,
    });

    for await (const chunk of stream) {
      if (!chunk.text) continue;
      yield chunk.text;
    }
  }
}

class Gemini implements Service {
  client: GoogleGenAI;
  sessions: Record<string, Session>;

  constructor(config: ProviderConfig) {
    this.client = new GoogleGenAI({
      apiKey: config.apiKey,
    });
    this.sessions = {};
  }

  async test(): Promise<void> {
    await this.client.models.list();
  }

  async *getModels(): AsyncGenerator<Model> {
    const models = await this.client.models.list();

    for await (const model of models) {
      if (!model.name) continue;
      if (
        !model.supportedActions ||
        (!model.supportedActions.includes("generateContent") &&
          !model.supportedActions.includes("generateText"))
      )
        continue;

      // Dramatically reduce the number of models to show the user.
      if (!model.name.startsWith("models/gemini-")) continue;

      yield {
        id: model.name,
        name: model.displayName,
        version: model.version,
        description: model.description,
        properties: model,
      } as Model;
    }
  }

  createSession(model: Model, system?: string): Session {
    const id = crypto.randomUUID();
    const session = new GeminiSession(id, this, model, system);
    this.sessions[id] = session;
    return session;
  }
}

export default Gemini;
