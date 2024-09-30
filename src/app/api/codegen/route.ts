// import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";
export const dynamic = "force-dynamic";
export const maxDuration = 30;
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: groq("llama-3.1-70b-versatile"),
    system:
      "You are the best code and code generator. you take the code and give the converted code in the perfect format with some bit of explanations. you will reject everything except codes.",
    prompt: context,
    schemaDescription: "Code and its explanation",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  return result.toTextStreamResponse();
}
