import { ChromaClient } from "chromadb";
import { OllamaEmbeddings } from "@langchain/ollama";

// 1. Setup the "Translator" using Ollama
const embedder = new OllamaEmbeddings({
    model: "mxbai-embed-large", // This is the model we pulled earlier
    baseUrl: "http://localhost:11434",
});

const client = new ChromaClient({ path: "http://localhost:8000" });

// Custom function to handle the embedding
const ollamaEmbeddingFunction = {
    generate: async (texts) => {
        return await embedder.embedDocuments(texts);
    }
};

export async function getCollection() {
    return await client.getOrCreateCollection({
        name: "my_rag_collection",
        embeddingFunction: ollamaEmbeddingFunction // <--- We added the translator here!
    });
}

export default client;