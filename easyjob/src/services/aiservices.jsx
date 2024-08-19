import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = import.meta.env.local.VITE_GOOGLE_API_KEY;
// console.log(apiKey ? "API key found" : "API key not found");

const genAi = new GoogleGenerativeAI("AIzaSyAdLUbDQEd3qTbbysWOq1covjKT3PoeDh4");

const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getSuggestions(description, style = "neutral") {
  try {
    const prompt = `Please provide improvements for the following job description in a ${style} tone:\n\nDescription: ${description}, please do not include about Job title or company name, the user is looking for a person to do the job in a short time. Give me the answer in plain text , at least two paragraphs separate with \n and give me the response more relax.`;

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
    console.log(text);

    if (!text) {
      throw new Error("No content found in the response");
    }

    return { description: text };
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return null;
  }
}
