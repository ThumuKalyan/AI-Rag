\# Web RAG Assistant



A \*\*full-stack Retrieval Augmented Generation (RAG) system\*\* that allows users to:



\- Scrape a website

\- Index its content locally

\- Ask questions about the scraped content

\- Get answers powered by a local LLM



The system uses \*\*React, Node.js, FastAPI, FAISS, Playwright, and Ollama\*\* to build a complete local RAG pipeline.



---



\# Architecture



The system consists of three layers:



```

React Frontend

&nbsp;       │

&nbsp;       ▼

Node.js API (Proxy Layer)

&nbsp;       │

&nbsp;       ▼

FastAPI AI Server

&nbsp;       │

&nbsp;       ▼

FAISS Vector Index + Ollama LLM

```



\## Components



\### Frontend

\- React

\- Axios for API communication



\### Backend API

\- Node.js

\- Express

\- Handles routing between frontend and AI server



\### AI Server

\- FastAPI

\- Playwright for scraping dynamic websites

\- FAISS for vector similarity search

\- Ollama for local LLM inference

\- nomic-embed-text for embeddings



---



\# Features



\### Website Crawling

\- Uses \*\*Playwright headless browser\*\*

\- Handles dynamic sites (React, Next.js etc.)

\- Automatically scrolls pages to load lazy content



\### Content Processing

\- Extracts meaningful text

\- Removes cookie banners and noise

\- Cleans formatting issues



\### Vector Search

\- Text is split into chunks

\- Embedded using \*\*nomic-embed-text\*\*

\- Stored in \*\*FAISS vector database\*\*



\### Question Answering

\- Retrieves relevant chunks

\- Sends context to \*\*Qwen2.5 LLM via Ollama\*\*

\- Generates contextual answers



\### Caching System

Each scraped website is cached locally.



```

cache/

&nbsp;  site\_hash.faiss

&nbsp;  site\_hash.pkl

```



This avoids re-scraping and speeds up future queries.



---



\# Project Structure



```

web-rag/

│

├── frontend/

│   └── React UI

│

├── backend/

│   └── server.js

│

├── ai-server/

│   ├── ai\_server.py

│   └── cache/

│

└── README.md

```



---



\# Requirements



Install the following:



\- Node.js

\- Python 3.10+

\- Ollama

\- Git



---



\# Install Ollama Models



Install the required models locally.



\### LLM



```

ollama pull qwen2.5:3b

```



\### Embeddings



```

ollama pull nomic-embed-text

```



---



\# Python Setup (AI Server)



Navigate to the AI server directory.



```

cd ai-server

```



Create a virtual environment.



```

python -m venv venv

```



Activate it.



\### Windows



```

venv\\Scripts\\activate

```



\### Mac/Linux



```

source venv/bin/activate

```



Install dependencies.



```

pip install fastapi uvicorn requests faiss-cpu numpy beautifulsoup4 trafilatura playwright

```



Install Playwright browser.



```

playwright install

```



Run the AI server.



```

uvicorn ai\_server:app --reload --port 8000

```



---



\# Node.js Backend Setup



Navigate to backend folder.



```

cd backend

```



Install dependencies.



```

npm install

```



Start server.



```

node server.js

```



Node server runs on:



```

http://localhost:3000

```



---



\# React Frontend Setup



Navigate to frontend.



```

cd frontend

```



Install dependencies.



```

npm install

```



Start development server.



```

npm start

```



Frontend runs on:



```

http://localhost:3001

```



---



\# How It Works



\## 1. Scrape Website



Enter a website URL in the UI.



Example:



```

https://credera.com/en-in/about-us/our-leadership

```



Click \*\*Scrape\*\*.



The system will:



1\. Crawl pages

2\. Extract text

3\. Clean content

4\. Generate embeddings

5\. Build FAISS index

6\. Save to cache



---



\## 2. Ask Questions



After scraping, ask questions like:



```

Who is the CEO?

Where is Renu Hooda located?

Who leads Asia Pacific?

```



The system will:



1\. Convert question to embedding

2\. Search FAISS index

3\. Retrieve relevant chunks

4\. Send context to LLM

5\. Return answer



---



\# Example Flow



User Question:



```

Who is the Global Chief People Officer?

```



Vector Search finds:



```

Renu Hooda

Global Chief People Officer

New York

```



LLM generates:



```

Renu Hooda is the Global Chief People Officer based in New York.

```



---



\# Force Re-Scrape



To rebuild the index:



```

POST /scrape?force=true

```



This ignores cache and reindexes the website.



---



\# API Endpoints



\## Scrape Website



```

POST /scrape

```



Body:



```

{

&nbsp;"url": "https://example.com"

}

```



Force rebuild:



```

POST /scrape?force=true

```



---



\## Ask Question



```

POST /chat

```



Body:



```

{

&nbsp;"question": "Who is CEO?",

&nbsp;"key": "site\_hash"

}

```



---



\## List Cached Sites



```

GET /sites

```



Returns available indexed websites.



---



\# Performance Tips



Recommended settings.



```

MAX\_PAGES = 10

Chunk Size = 400

Top-K Retrieval = 8

```



For faster testing:



```

MAX\_PAGES = 3

```



---



\# Known Limitations



\- Some sites block scraping

\- Very large websites may take longer to index

\- Context window limited by LLM size



---



\# Future Improvements



Potential upgrades:



\- Streaming LLM responses

\- Semantic reranking

\- Hybrid BM25 + Vector search

\- Named entity extraction

\- Multi-site querying

\- Background indexing

\- UI improvements



---



\# License



MIT License

