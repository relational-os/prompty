type Prompt = {
  id: string;
  who?: Author;
  text: string;
  startTime: number;
  endTime: number;
  minChars: number;
  maxChars: number;
  responses?: Response[];
};

type PromptResponse = {
  id: string;
  who?: Author;
  text: string;
  created: number;
  prompt: Prompt;
};

type Author = {
  id: string;
  prompts?: Prompt[];
  responses?: Response[];
};
