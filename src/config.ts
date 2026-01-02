import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FirecrawlAppV1 } from '@mendable/firecrawl-js';
import { scrapperProduct } from './tools/marketTool';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const firecrawl = new FirecrawlAppV1({ apiKey: process.env.FIRECRAWL_API_KEY! });
export const functionsDeclarationModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash", tools: [{functionDeclarations: [scrapperProduct]}],toolConfig: { functionCallingConfig: { mode: "AUTO" } } });
export const firecrawlClient = firecrawl;