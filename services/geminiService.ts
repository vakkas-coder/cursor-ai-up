
import { GoogleGenAI } from "@google/genai";

// Note: process.env.API_KEY is pre-configured
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async chat(prompt: string, codeContext?: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `
          Context: You are an expert software engineer within an IDE called "Cursor Clone".
          Current Code Context:
          \`\`\`
          ${codeContext || 'No code selected'}
          \`\`\`
          
          User Request: ${prompt}
        `,
        config: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Error: Failed to connect to Gemini API. Please check your network or API key.";
    }
  }

  async generateCodeFix(errorCode: string, description: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Fix the following code error:\n\nCode:\n${errorCode}\n\nProblem: ${description}`,
    });
    return response.text;
  }
}

export const gemini = new GeminiService();
