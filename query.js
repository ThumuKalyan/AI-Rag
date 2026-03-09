import { Ollama } from "@langchain/ollama";
import { getCollection } from './database.js';

// 1. Initialize the Chat Model (The "Thinker")
// const model = new Ollama({
//     model: "llama3",
//     baseUrl: "http://localhost:11434",
// });

import { ChatOpenAI } from "@langchain/openai";

// Switch from Ollama to Credera's ModelVend
const model = new ChatOpenAI({
  // 1. Pass your Vending Machine token here
  apiKey: "KEY--SHHHHH--SECRET", 
  
  // 2. Point it to the Credera ModelVend Proxy
  configuration: {
    baseURL: "https://credera.ai.omcpmg.com/modelvend/proxy",
  },
  
  // 3. Set the model name (e.g., gpt-4o or what was assigned to you)
 modelName: "bedrock/global.anthropic.claude-sonnet-4-5-20250929-v1:0",
});

export async function askQuestion(siteNickname, question) {
    const collection = await getCollection();

    // 2. Search only the tagged site!
    const results = await collection.query({
        queryTexts: [question],
        nResults: 2, // Get the top 2 most relevant pieces of text
        where: { "site_name": siteNickname } // This is your dropdown logic!
    });

    const context = results.documents[0].join("\n");

    // 3. Ask the AI with the context
    const prompt = `
    Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.

    Context: ${context}

    Question: ${question}

    Answer:`;

    const response = await model.invoke(prompt);
    console.log("\n--- AI RESPONSE ---");
    console.log(response);
    return response;
}