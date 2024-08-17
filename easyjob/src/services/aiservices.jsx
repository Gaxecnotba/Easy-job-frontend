import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.local.VITE_GOOGLE_API_KEY;
console.log(apiKey ? "API key found" : "API key not found");

const genAi = new GoogleGenerativeAI(apiKey);

const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getSuggestions(description, style = "neutral") {
  try {
    const prompt = `Please provide improvements for the following job description in a ${style} tone:\n\nDescription: ${description}, please do not include about Job title or compay name, the user are post easy jobs to do without any experience, the user are looking for a person to do the job in a short time and with a low budget.`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.5,
      },
    });

    const text = await result.response.text();

    if (!text) {
      throw new Error("No content found in the response");
    }

    return { description: text };
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return null;
  }
}
