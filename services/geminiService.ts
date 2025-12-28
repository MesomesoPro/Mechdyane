
import { GoogleGenAI, Type } from "@google/genai";
import { Domain, Lesson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateLessonContent = async (domain: string, topic: string, level: number): Promise<Partial<Lesson>> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a beginner-friendly lesson for ${domain} on the topic of "${topic}". 
    The user is currently at level ${level}. 
    Make it engaging, use analogies, and include 3 multiple-choice questions for a quiz.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          content: { type: Type.STRING, description: "Detailed markdown content of the lesson" },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                text: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER },
                explanation: { type: Type.STRING }
              },
              required: ["id", "text", "options", "correctIndex", "explanation"]
            }
          }
        },
        required: ["title", "description", "content", "quiz"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getPersonalizedRecommendation = async (interests: string[], completedTopics: string[]): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the user's interests: ${interests.join(', ')} and completed topics: ${completedTopics.join(', ')}, suggest 3 next topics they should learn. Return just a simple list of topics.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  return JSON.parse(response.text);
};
