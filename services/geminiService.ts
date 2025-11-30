import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CloudConcept, RoadmapItem } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const askCloudGuru = async (
  prompt: string,
  history: { role: string; text: string }[] = []
): Promise<string> => {
  try {
    // Construct a context-aware prompt
    const systemInstruction = `You are "Cloud Guru", a friendly and expert AI assistant for a website called "CloudHorizon 2025". 
    Your goal is to explain cloud computing concepts (IaaS, PaaS, SaaS, Serverless, Edge) and the 2025 Cloud Roadmap (AI Ops, Green Cloud, Wasm, Sovereign Cloud) to users.
    Keep answers concise (under 150 words), engaging, and easy to understand for a tech-curious audience.
    Use analogies where possible.`;

    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble connecting to the cloud right now. Try again later!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch response from AI.");
  }
};

export const generateDynamicContent = async (): Promise<{ concepts: CloudConcept[], roadmapItems: RoadmapItem[] }> => {
  try {
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        concepts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              iconName: { type: Type.STRING, enum: ['Server', 'Layers', 'Box', 'Zap', 'Globe'] }
            },
            required: ['id', 'title', 'description', 'iconName']
          }
        },
        roadmapItems: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              quarter: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['quarter', 'title', 'description', 'tags']
          }
        }
      },
      required: ['concepts', 'roadmapItems']
    };

    const response = await ai.models.generateContent({
      model,
      contents: "Generate 5 key cloud computing concepts (mix of fundamental and modern) and 4 strategic roadmap milestones for the year 2025. Ensure content is futuristic yet realistic.",
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, 
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Data Generation Error:", error);
    throw error;
  }
}