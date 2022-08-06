export type PromptType = {
  id: string;
  who?: AuthorType;
  text: string;
  startTime: number;
  endTime: number;
  minChars: number;
  maxChars: number;
  responses?: Response[];
  responseCount: number;
  instance: PromptyInstance;
};

export type PromptyInstance = {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  allowedResponders: Wallet[];
}

export type Wallet = {
  id: string;
  prompts: PromptType[];
  responses: PromptResponseType[];
}

export type PromptResponseType = {
  id: string;
  who?: AuthorType;
  text: string;
  created: number;
  prompt: PromptType;
};

export type AuthorType = {
  id: string;
  prompts?: PromptType[];
  responses?: Response[];
};
