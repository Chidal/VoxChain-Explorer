VoiceChain Explorer
VoiceChain Explorer is an AI-powered, voice-driven blockchain explorer built for the WaveHack/Buildathon using Nodit’s Blockchain Model Context Protocol (MCP), Web3 Data API, and Stream API. It enables users to query blockchain data (e.g., NFT trades on Polygon or Ethereum) using natural language via voice or text input, delivering instant results with dynamic visualizations. The app features a modern, animated UI built with React, TypeScript, Tailwind CSS, and Framer Motion, designed to lower barriers to Web3 adoption through intuitive analytics.
Features
Voice-Driven Queries: Use voice input to query blockchain data (e.g., “Show me all NFT trades by this address on Polygon in the last 24 hours”) via the Web Speech API.

AI-Powered Analytics: Leverages Nodit’s MCP to parse natural language queries and fetch relevant blockchain data.

Real-Time Updates: Streams live transaction data using Nodit’s Stream API (placeholder implemented; requires WebSocket setup).

Dynamic Visualizations: Displays NFT trade volumes and transaction details with Chart.js-powered bar charts.

Multi-Chain Support: Queries data from Polygon and Ethereum, with potential expansion to Aptos, XRPL, and more.

Responsive UI: Built with Tailwind CSS and Framer Motion for a sleek, animated, and mobile-friendly interface.

Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Framer Motion

Data Visualization: Chart.js, react-chartjs-2

Voice Input: Web Speech API

Blockchain Integration: Nodit Web3 Data API, MCP, Stream API

Dependencies: Axios, PostCSS, Autoprefixer

WaveHack/Buildathon Alignment
VoiceChain Explorer aligns with the AI + Analytics theme by:
Using Nodit MCP for AI-driven query processing, enabling natural language interaction with blockchain data.

Leveraging Web3 Data API to fetch structured NFT and transaction data for analytics.

Implementing Stream API for real-time transaction monitoring (placeholder included).

Visualizing on-chain data with dynamic charts, addressing the “On-chain Data Analysis” sub-topic.

Lowering Web3 adoption barriers through an intuitive voice and text interface.

Prerequisites
Node.js: v20.x (LTS recommended; v23.6.0 tested)

npm: v10.9.2 or later

Nodit API Key: Obtain from nodit.io

Microphone: For voice input (Chrome recommended for Web Speech API)

Git: For cloning the repository

Installation
Clone the Repository:
bash

git clone https://github.com/your-username/voicechain-explorer.git
cd voicechain-explorer

Install Dependencies:
bash

npm install

Set Up Environment Variables:
Create a .env file in the project root:

REACT_APP_NODIT_API_KEY=your-nodit-api-key

Initialize Tailwind CSS:
bash

npx tailwindcss init -p

Update tailwind.config.js:
javascript

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

Start the Development Server:
bash

npm start

Open http://localhost:3000 in a browser (Chrome recommended for voice input).

Usage
Query Blockchain Data:
Use the voice input button to speak queries like “Show me all NFT trades by 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon in the last 24 hours.”

Alternatively, type queries in the text input field.

The app parses the query, fetches data via Nodit’s Web3 Data API, and displays results in a table.

View Visualizations:
Results include a bar chart showing NFT trade volumes over time, powered by Chart.js.

Real-Time Monitoring:
(Placeholder) Live transaction updates via Nodit’s Stream API (requires WebSocket setup).

Project Structure

voicechain-explorer/
├── src/
│   ├── components/
│   │   ├── VoiceInput.tsx        # Voice and text input for queries
│   │   ├── BlockchainResults.tsx # Displays query results in a table
│   │   ├── DataVisualization.tsx # Renders Chart.js visualizations
│   ├── services/
│   │   ├── noditService.ts       # Nodit API and MCP integration
│   ├── App.tsx                   # Main app component
│   ├── index.tsx                 # Entry point
│   ├── index.css                 # Tailwind CSS styles
├── .env                          # Environment variables
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Project dependencies
├── README.md                     # This file

Nodit Integration
Web3 Data API: Fetches NFT transfer history for a given address and chain (e.g., Polygon, Ethereum).
typescript

// Example: Fetch NFT trades
const data = await fetchNFTTrades("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "polygon");

MCP: Configures an AI agent to parse natural language queries and invoke Nodit APIs dynamically (requires MCP server setup).
javascript

// Example MCP config
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "your-api-key" }
    }
  }
}





// Example MCP config
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "your-api-key" }
    }
  }
}