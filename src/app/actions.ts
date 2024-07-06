"use server";

import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function codeConvert(
  code: string,
  sourceLanguage: string,
  translatedLanguage: string
) {
  const stream = createStreamableValue("");

  const prompted = ` convert this code from ${sourceLanguage} to ${translatedLanguage} : ${code}  \n just send the code in perfect format, no explanation needed. dont send in markdown format. clean code only`;

  (async () => {
    const { textStream } = await streamText({
      model: google("models/gemini-1.5-flash"),
      prompt: prompted,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();

  return { output: stream.value };
}
