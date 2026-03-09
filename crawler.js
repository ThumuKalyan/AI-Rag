import { PlaywrightCrawler } from 'crawlee';
import { getCollection } from './database.js'; // Import the function specifically

export async function crawlWebsite(url, nickname) {
    // Call our updated function that has the "translator" attached
    const collection = await getCollection(); 

    const crawler = new PlaywrightCrawler({
        async requestHandler({ page, request, log }) {
            const title = await page.title();
            log.info(`Crawling: ${title}`);

            const content = await page.innerText('body');

            // Now when we call .add, Chroma uses Ollama to translate the text!
            await collection.add({
                ids: [Buffer.from(request.url).toString('base64')], 
                metadatas: [{ site_name: nickname, url: request.url }],
                documents: [content]
            });
        },
        maxRequestsPerCrawl: 3, 
    });

    await crawler.run([url]);
}