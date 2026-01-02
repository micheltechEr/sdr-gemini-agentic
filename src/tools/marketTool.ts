import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { firecrawlClient } from "../config";

export const scrapperProduct : FunctionDeclaration = {
    name: "scrapperProduct",
    "description": "Acessa uma URL (seja de um produto único ou de uma lista/catálogo de produtos) e extrai o conteúdo. Use para descobrir preços, listar produtos disponíveis ou comparar itens.",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            productUrl: {
                type: SchemaType.STRING,
                description: "A URL do site, catálogo ou produto a ser analisado (ex: 'site.com/colecao' ou 'site.com/produto-x')."
            },
        },
        required: ["productUrl"],
    },
}

export async function scrapperProductImpl(args: { productUrl: string }){
    try{
        const { productUrl } = args;
        const scrape = await firecrawlClient.scrapeUrl(productUrl, { formats: ['markdown'] });
        if(!scrape.success){
            return `Erro ao acessar a URL: ${scrape.error}`;
        }
        console.log("✅ Site acessado com sucesso! Retornando dados...");
        return {
            source_url: productUrl,
            content: scrape.markdown,
            scraped_at: new Date().toISOString()
        }
    }
    catch(err){
        return `Erro ao acessar a URL: ${err}`;
    }
}