export type PromptType = {
  id: string;
  who?: AuthorType;
  text: string;
  startTime: number;
  endTime: number;
  minChars: number;
  maxChars: number;
  responses?: Response[];
};

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
