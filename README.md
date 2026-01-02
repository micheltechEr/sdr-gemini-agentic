#  SDR Gemini Agentic

> An autonomous AI Agent acting as a **Sales Development Representative (SDR)**. It navigates the web, analyzes products, and retrieves real-time market data using Function Calling.

## About The Project

This project explores the concept of **Agentic AI**. Unlike a standard chatbot that relies on pre-trained data, this agent has "tools" to access the real world. It can browse e-commerce websites, read catalogs, and extract pricing or product details to answer complex user queries.

Example: {
  "message": "Acesse o site da My Creators Store, segue https://mycreators.store/collections/mano-deyvin e me diga qual o produto mais barato deles."
}

**Key Features:**
* **Autonomous Decisions:** The AI decides *when* to browse the internet based on the user's prompt.
* **Web Scraping:** Uses **Firecrawl** to turn complex HTML/JS websites into clean Markdown for the AI.
* **Structured Output:** Capable of returning data comparisons (e.g., price analysis).

##  Tech Stack

* **Runtime:** Node.js (TypeScript)
* **Brain (LLM):** Google Gemini 2.0 Flash (via Google Generative AI SDK)
* **Tools (Hands):** Firecrawl API (for scraping)
* **Server:** Fastify

##  How to Run

### Prerequisites
* Node.js (v18+)
* API Key from [Google AI Studio](https://aistudio.google.com/)
* API Key from [Firecrawl](https://firecrawl.dev/)

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/micheltechEr/sdr-gemini-agentic.git](https://github.com/micheltechEr/sdr-gemini-agentic.git)
    cd sdr-gemini-agentic
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    GEMINI_API_KEY="your_gemini_key_here"
    FIRECRAWL_API_KEY="your_firecrawl_key_here"
    ```

4.  **Run the Server**
    ```bash
    npx tsx src/server.ts
    ```

## 📡 API Usage

**Endpoint:** `POST /chat/sdr`

**Body:**
```json
{
  "message": "Access the My Creators Store website at [https://mycreators.store/collections/all](https://mycreators.store/collections/all) and tell me which is the cheapest product."
}
