
import { GoogleGenAI } from "@google/genai";

// Initialize with a named parameter as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAssistantResponse = async (userMessage: string) => {
  try {
    // Call generateContent with model name and contents prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are the virtual assistant for 'F&F Coffee Shop'. You are warm, welcoming, and knowledgeable about specialty coffee, gourmet teas, and pastries. Encourage customers to try our seasonal blends and help with menu inquiries. Keep responses concise and friendly.",
      },
    });
    // Directly access the text property.
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
};
