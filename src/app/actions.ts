"use server";

import { google } from "@ai-sdk/google";
import { generateObject, streamObject, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

// export async function codeConvert(
//   code: string,
//   sourceLanguage: string,
//   translatedLanguage: string
// ) {
//   const stream = createStreamableValue("");

//   const prompted = ` convert this code from ${sourceLanguage} to ${translatedLanguage} : ${code}  \n just send the code in perfect format, no explanation needed. dont send in markdown format. clean code only`;

//   (async () => {
//     const { textStream } = await streamText({
//       model: google("models/gemini-1.5-flash"),
//       system:
//         "You are the best code and code generator. you take the code and give the code in the perfect format. you will reject everything except codes.",
//       prompt: prompted,
//     });

//     for await (const delta of textStream) {
//       stream.update(delta);
//     }
//     stream.done();
//   })();

//   return { output: stream.value };
// }

export async function codeConvert(
  code: string,
  sourceLanguage: string,
  translatedLanguage: string
) {
  const stream = createStreamableValue("");

  const prompted = ` convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${code}`;

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: google("models/gemini-1.5-flash"),
      system:
        "You are the best code and code generator. you take the code and give the converted code in the perfect format with some bit of explanations. you will reject everything except codes.",
      prompt: prompted,
      schema: z.object({
        code: z.string(),
        explanation: z.string(),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(JSON.stringify(partialObject, null, 2));
    }
    stream.done();
  })();

  return { output: stream.value };
}
