import {
  InstanceCreated,
  PromptCreated,
  PromptResponse,
  Prompty,
  ResponderAdded,
} from "../generated/Prompty/Prompty";

import { Prompt, Wallet, Response, PromptyInstance } from "../generated/schema";

export function handleInstanceCreated(event: InstanceCreated): void {
  const instance = new PromptyInstance(event.params.id.toString());

  instance.name = event.params.name;
  instance.allowedResponders = [];
  instance.description = event.params.description;

  instance.save();
}

export function handleResponderAdded(event: ResponderAdded): void {
  const instance = PromptyInstance.load(event.params.instanceId.toString())!;

  let responders = instance.allowedResponders!.concat([
    event.params.responder.toString(),
  ]);
  instance.allowedResponders = responders;

  instance.save();
}

export function handlePromptCreated(event: PromptCreated): void {
  const prompt = new Prompt(event.params.promptId.toString());
  const wallet = new Wallet(event.params.creator.toHexString());

  prompt.who = wallet.id;
  prompt.instance = event.params.instanceId.toString();
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
