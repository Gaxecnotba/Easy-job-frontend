import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.KEY_GEMINI);

const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
