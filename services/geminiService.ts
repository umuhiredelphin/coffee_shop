
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIAssistantResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are the virtual concierge for 'Monolith Market & Café'. You are sophisticated, minimalist, and helpful. You recommend food, coffee, and help with reservations. Keep answers brief and elegant.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "The monolith is currently processing. Please try again in a moment.";
  }
};
