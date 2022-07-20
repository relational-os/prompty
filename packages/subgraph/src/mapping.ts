import {
  PromptCreated,
  PromptResponse,
  Prompty,
} from "../generated/Prompty/Prompty";

import { Prompt, Wallet, Response } from "../generated/schema";

export function handlePromptCreated(event: PromptCreated): void {
  const prompt = new Prompt(event.params.promptId.toString());
  const wallet = new Wallet(event.params.creator.toHexString());

  prompt.who = wallet.id;
  prompt.text = event.params.prompt;
  prompt.startTime = event.params.startTime;
  prompt.endTime = event.params.endTime;
  prompt.minChars = event.params.minChars.toI32();
  prompt.maxChars = event.params.maxChars.toI32();
  prompt.responseCount = 0;

  wallet.save();
  prompt.save();
}

export function handlePromptResponse(event: PromptResponse): void {
  const response = new Response(
    event.params.promptId.toString() +
      "-" +
      event.params.responder.toHexString()
  );
  const promptId = event.params.promptId.toString();

  const wallet = new Wallet(event.params.responder.toHexString());
  response.who = event.params.responder.toHexString();
  response.text = event.params.response;
  response.prompt = promptId;
  response.created = event.block.timestamp;

  const prompt = Prompt.load(promptId)!;
  prompt.responseCount = prompt.responseCount + 1;

  prompt.save();
  wallet.save();
  response.save();
}
