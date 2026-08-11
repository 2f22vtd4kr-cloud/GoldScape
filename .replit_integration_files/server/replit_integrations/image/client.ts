import { GoogleGenAI, Modality } from "@google/genai";

// This is using Replit's AI Integrations service, which provides Gemini-compatible API access without requiring your own Gemini API key.
export const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export type ReferenceImage = {
  /** Base64 data (with or without data: URL prefix) or raw base64 string */
  data: string;
  mimeType?: string;
};

/**
 * Extract raw base64 + mime from a data URL or plain base64 string.
 */
function normalizeImageData(input: string): { data: string; mimeType: string } {
  if (input.startsWith("data:")) {
    const match = input.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
  }
  return { mimeType: "image/png", data: input };
}

/**
 * Generate an image and return as base64 data URL.
 * Uses gemini-2.5-flash-image model via Replit AI Integrations.
 *
 * Supports optional reference images for visual consistency (the recommended
 * way to keep the same building / materials / landmark across scenes).
 * When references are supplied the model treats them as identity anchors;
 * the text prompt should explicitly say what to preserve and what to change.
 */
export async function generateImage(
  prompt: string,
  references?: ReferenceImage | ReferenceImage[],
): Promise<string> {
  const refs = references
    ? Array.isArray(references)
      ? references
      : [references]
    : [];

  const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [];

  // Put reference images first so the model sees them as primary identity.
  for (const ref of refs) {
    const { data, mimeType } = normalizeImageData(ref.data);
    parts.push({
      inlineData: {
        data,
        mimeType: ref.mimeType || mimeType,
      },
    });
  }

  // Explicit role labelling improves consistency (Gemini multi-image best practice).
  const rolePrefix =
    refs.length === 1
      ? "Image 1 is the MASTER REFERENCE of the exact same real property. Preserve the building geometry, facade materials, window frames, roof, site context and landmark from Image 1 with high fidelity. Only change what the SCENE description requires.\n\n"
      : refs.length > 1
        ? `The first ${refs.length} images are MASTER REFERENCES of the exact same real property. Preserve building geometry, facade materials, window frames, roof, site context and landmark with high fidelity. Only change what the SCENE description requires.\n\n`
        : "";

  parts.push({ text: rolePrefix + prompt });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ role: "user", parts }],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  const candidate = response.candidates?.[0];
  const imagePart = candidate?.content?.parts?.find(
    (part: { inlineData?: { data?: string; mimeType?: string } }) => part.inlineData
  );

  if (!imagePart?.inlineData?.data) {
    throw new Error("No image data in response");
  }

  const mimeType = imagePart.inlineData.mimeType || "image/png";
  return `data:${mimeType};base64,${imagePart.inlineData.data}`;
}
