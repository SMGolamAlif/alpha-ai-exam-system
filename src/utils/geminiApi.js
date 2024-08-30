import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBJgPCsqjMdXldrx9DDB-K9Rxx5gvUKw7k";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateQuestions(topic, difficulty, count, language) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate ${count} multiple-choice questions about ${topic} at a ${difficulty} difficulty level in ${language}. Each question should have 4 options with one correct answer. Format the response as a JSON array of objects, each with properties: question, options (array of 4 strings), correctAnswer (index of correct option), and brif explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response?.candidates[0]?.content?.parts[0]?.text;
    // await response.text();
    console.log(response);

    console.log("Raw API response:", text);

    // Clean up the response text if needed
    const cleanedText = JSON.parse(
      text
        .trim()
        .replace(/^json\n/, "")
        .replace(/\n$/, "")
        .replace(/```|json/g, "")
    );
    console.log(cleanedText);

    // Parse the cleaned JSON
    try {
      return cleanedText;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Invalid JSON format in API response");
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
