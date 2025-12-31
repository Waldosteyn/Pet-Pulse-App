
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAmberAlertDescription = async (pet: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate an urgent but clear Amber Alert description for a lost pet. 
      Pet Name: ${pet.name}, Type: ${pet.type}, Breed: ${pet.breed}, Color: ${pet.color}, Description: ${pet.description}.
      Keep it punchy, emotional, and include call-to-action details.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `URGENT: ${pet.name} is lost. ${pet.breed} with ${pet.color} color. ${pet.description}. Please help!`;
  }
};

export const getSmartPetTips = async (petType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 quick safety tips for a ${petType} owner.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return ["Keep your pet leashed", "Ensure collar tag is up to date", "Microchip your pet"];
  }
};
