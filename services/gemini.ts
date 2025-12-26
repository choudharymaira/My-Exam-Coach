
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { CoachResponse } from "../types";

export const getCoachFeedback = async (userInput: string): Promise<CoachResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInput,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          greeting: { 
            type: Type.STRING, 
            description: "A short, kind introductory greeting without markdown." 
          },
          conceptExplanation: { 
            type: Type.STRING, 
            description: "A simple explanation of the concept using analogies, no markdown." 
          },
          examinerExpectations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of things examiners look for, no markdown."
          },
          commonMistakes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of common pitfalls where marks are lost, no markdown."
          },
          modelAnswer: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "EXACTLY 10 bullet points representing a complete high-scoring model answer, no markdown." 
          }
        },
        required: ["greeting", "conceptExplanation", "examinerExpectations", "commonMistakes", "modelAnswer"]
      }
    },
  });

  const rawJson = response.text || "{}";
  const parsed: CoachResponse = JSON.parse(rawJson);

  const clean = (text: string) => text.replace(/[*_~`]/g, "");

  return {
    greeting: clean(parsed.greeting),
    conceptExplanation: clean(parsed.conceptExplanation),
    examinerExpectations: parsed.examinerExpectations.map(clean),
    commonMistakes: parsed.commonMistakes.map(clean),
    modelAnswer: parsed.modelAnswer.map(clean),
  };
};
