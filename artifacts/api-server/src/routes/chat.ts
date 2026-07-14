import { Router } from "express";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "../lib/logger";

const router = Router();

const TIMEOUT_MS = 9_000;

const SYSTEM_PROMPT = `You are a knowledgeable assistant for EstateofMind — a premium international real estate brokerage for Russian-speaking investors and families.

You help clients with:
- Buying property in Dubai (UAE), Turkey, Cyprus, Georgia, Thailand, Portugal, and Serbia
- Residency permits (ВНЖ, ПМЖ, golden visas) obtained through property purchase
- Legally moving capital abroad: SWIFT, SEPA, cryptocurrency, and other mechanisms
- Tax implications and structuring in target jurisdictions
- The transaction process: due diligence, title checks, timelines, costs

Tone: warm, professional, concise. Clients are often anxious — they're moving significant savings in a stressful geopolitical context. Acknowledge that and be reassuring.

Language: reply in the same language the user writes in (Russian or English).

Do NOT invent specific prices, legal rules, or yield figures. If you're uncertain, say so clearly and invite the client to book a free consultation. Never give binding legal or financial advice — always recommend speaking with a local specialist for final decisions.

When relevant, mention that EstateofMind offers a free initial consultation and works with vetted local partners (fäm Properties in Dubai, H&S Real Estate in Cyprus/Turkey, Knight Frank in Portugal, etc.).`;

// ── OpenAI ───────────────────────────────────────────────────────────────────

async function callOpenAI(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<string> {
  if (!process.env["OPENAI_API_KEY"]) throw new Error("OPENAI_API_KEY not set");

  const client = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await client.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 700,
        temperature: 0.65,
      },
      { signal: controller.signal },
    );
    return response.choices[0]?.message?.content ?? "";
  } finally {
    clearTimeout(timer);
  }
}

// ── Gemini ───────────────────────────────────────────────────────────────────

async function callGemini(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<string> {
  if (!process.env["GEMINI_API_KEY"]) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  // Gemini requires alternating user/model turns; last message must be user
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const last = messages[messages.length - 1];

  const chat = model.startChat({ history });

  const result = await Promise.race([
    chat.sendMessage(last.content),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("gemini_timeout")), TIMEOUT_MS),
    ),
  ]);

  return result.response.text();
}

// ── Route ────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };
type ModelName = "openai" | "gemini";

router.post("/chat", async (req, res) => {
  const { messages, preferredModel = "openai" } = req.body as {
    messages: Message[];
    preferredModel?: ModelName;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  const primary: ModelName = preferredModel === "gemini" ? "gemini" : "openai";
  const secondary: ModelName = primary === "openai" ? "gemini" : "openai";

  const tryModel = (m: ModelName) =>
    m === "openai" ? callOpenAI(messages) : callGemini(messages);

  // Try primary, fall back to secondary on any error (timeout, quota, network)
  try {
    const content = await tryModel(primary);
    res.json({ content, model: primary, fallback: false });
  } catch (primaryErr) {
    logger.warn(
      { err: primaryErr, primary, secondary },
      "Primary model failed — trying fallback",
    );
    try {
      const content = await tryModel(secondary);
      res.json({ content, model: secondary, fallback: true });
    } catch (secondaryErr) {
      logger.error({ err: secondaryErr }, "Both AI models failed");
      res.status(503).json({
        error:
          "AI assistant is temporarily unavailable. Please try again in a moment.",
      });
    }
  }
});

export default router;
