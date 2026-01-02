// src/teste.ts
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FirecrawlAppV1 } from '@mendable/firecrawl-js';

dotenv.config();

async function testarInstalacao() {
    console.log("1. Testando chaves...");
    if(!process.env.GOOGLE_API_KEY) throw new Error("Faltou a GEMINI_API_KEY");
    if(!process.env.FIRECRAWL_API_KEY) throw new Error("Faltou a FIRECRAWL_API_KEY");

    console.log("2. Testando Gemini...");
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const res = await model.generateContent("Diga 'Sistemas Operacionais' se você me ouve.");
    console.log("🤖 Gemini disse:", res.response.text().trim());

    console.log("3. Testando Firecrawl (Scraper)...");
    const app = new FirecrawlAppV1({ apiKey: process.env.FIRECRAWL_API_KEY });
    // Teste simples de scraping
    console.log("   (Isso pode levar uns segundos...)");
    // Vamos tentar ler o google só pra ver se conecta
    const scrape = await app.scrapeUrl('https://www.google.com', { formats: ['markdown'] });
    
    if(scrape.success) {
        console.log("🕷️ Firecrawl acessou com sucesso! Tamanho:", scrape.markdown?.length);
    } else {
        console.error("❌ Erro no Firecrawl:", scrape.error);
    }
}

testarInstalacao().catch(console.error);