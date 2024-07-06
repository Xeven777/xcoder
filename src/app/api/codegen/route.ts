import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: google("models/gemini-1.5-flash"),
    system:
      "You are the best code and code generator. you take the code and give the converted code in the perfect format with some bit of explanations. you will reject everything except codes.",
    prompt: context,
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  return result.toTextStreamResponse();
}
