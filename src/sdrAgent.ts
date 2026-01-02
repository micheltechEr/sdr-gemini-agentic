import {functionsDeclarationModel} from './config';
import { scrapperProductImpl } from './tools/marketTool';


export async function runSdrAgent(userQuery:string){
    const chat = functionsDeclarationModel.startChat();
    let result = await chat.sendMessage(userQuery);

    const call = result.response.functionCalls()?.[0];
    if(call){
        const fnName = call.name;
        const args = call.args;
        console.log(`⚡ Gemini pediu para executar: ${fnName} com args:`, args);

       if (fnName === "scrapperProduct") {
            const url = args.productUrl as string;
            const toolOutput= await scrapperProductImpl({ productUrl: url });
            result = await chat.sendMessage([
                {
                    functionResponse: {
                        name: fnName,
                        response: { content: toolOutput}
                }
            }
            ]);
       }
    }
    return result.response.text();
}