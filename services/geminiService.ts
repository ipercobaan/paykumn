import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ReceiptData } from "../types";

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeReceipt = async (file: File): Promise<ReceiptData> => {
  // Use the provided API key or fallback to env var
  const apiKey = 'AIzaSyAxYtpUXdDBxA9jWtAz8DX7Iyw8__qCexA'; 
  
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-2.5-flash"; 

  const base64Data = await fileToGenerativePart(file);

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      amount: { type: Type.NUMBER, description: "The total transaction amount found in the receipt." },
      date: { type: Type.STRING, description: "The date of transaction found in the receipt (YYYY-MM-DD format if possible)." },
      senderName: { type: Type.STRING, description: "Name of the sender if visible." },
      transactionId: { type: Type.STRING, description: "Transaction ID or Reference Number." },
      isValidReceipt: { type: Type.BOOLEAN, description: "True if this image looks like a valid payment proof/receipt, false otherwise." },
    },
    required: ["isValidReceipt"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: file.type,
            },
          },
          {
            text: "Analyze this image. It is supposed to be a payment proof (transfer receipt or QRIS success screen). Extract the details."
          }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as ReceiptData;
    return data;

  } catch (error) {
    console.error("Error analyzing receipt:", error);
    throw new Error("Failed to analyze receipt. Please verify manually.");
  }
};