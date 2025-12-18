
import { GoogleGenAI, Type } from "@google/genai";
import { DesignSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDesignSuggestion = async (prompt: string): Promise<DesignSuggestion> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User needs branding/design ideas for: ${prompt}. As a senior creative director at Aspire Graphics, provide a professional recommendation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            fonts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            concept: { type: Type.STRING }
          },
          required: ["title", "description", "colorPalette", "fonts", "concept"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as DesignSuggestion;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
