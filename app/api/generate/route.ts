import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { appendToSheet } from "../../../lib/googleSheet";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 }
    );
  }

  try {
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    const formattedText = generatedText.replace(/[#*\n]/g, "").trim();
    await appendToSheet({ prompt, result: formattedText });
    return NextResponse.json({ text: formattedText });
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating text", error: (error as Error).message },
      { status: 500 }
    );
  }
}
