# 🧠 VoiceChain Explorer

**VoiceChain Explorer** is an AI-powered, voice-driven blockchain explorer built for the **WaveHack/Buildathon** using **Nodit’s Blockchain Model Context Protocol (MCP)**, **Web3 Data API**, and **Stream API**. It allows users to query blockchain data (e.g., NFT trades on Polygon or Ethereum) via **natural language input**—voice or text—and receive instant, visualized results. The modern UI is animated and responsive, making Web3 data analytics intuitive and accessible.

---

## 🚀 Features

* **🎙 Voice-Driven Queries**
  Use voice input to query blockchain data via the **Web Speech API**.
  *E.g., “Show me all NFT trades by this address on Polygon in the last 24 hours.”*

* **🤖 AI-Powered NLP**
  Leverages **Nodit’s MCP** to parse natural language and translate it into structured API calls.

* **📡 Real-Time Data Streaming**
  Streams live transaction data using **Nodit’s Stream API** (WebSocket placeholder included).

* **📊 Dynamic Visualizations**
  Visualizes NFT trade volumes and transactions with **Chart.js**-powered bar charts.

* **🌐 Multi-Chain Support**
  Currently supports **Polygon** and **Ethereum**. Expansion potential includes **Aptos**, **XRPL**, and more.

* **📱 Responsive UI**
  Built with **React**, **Tailwind CSS**, and **Framer Motion** for a sleek, animated mobile-first experience.

---

## 🧰 Tech Stack

| Layer              | Tools/Frameworks                               |
| ------------------ | ---------------------------------------------- |
| Frontend           | React, TypeScript, Tailwind CSS, Framer Motion |
| Data Visualization | Chart.js, react-chartjs-2                      |
| Voice Input        | Web Speech API                                 |
| Blockchain Backend | Nodit Web3 Data API, MCP, Stream API           |
| Dev Tools          | Axios, PostCSS, Autoprefixer                   |

---

## 🎯 Hackathon Alignment: *WaveHack/Buildathon*

VoiceChain Explorer addresses the **AI + Analytics** theme by:

* Using **Nodit MCP** for natural language blockchain querying.
* Leveraging **Web3 Data API** to fetch NFT & transaction history.
* Implementing **Stream API** for real-time data monitoring.
* Delivering **on-chain data visualizations** to enable actionable insights.
* Lowering the entry barrier to Web3 with a voice/text interface.

---

## 📦 Prerequisites

* **Node.js**: v20.x (LTS) – *Tested on v23.6.0*
* **npm**: v10.9.2+
* **Nodit API Key**: [Obtain one from Nodit](https://nodit.io)
* **Microphone**: For voice input (Chrome recommended)
* **Git**: For cloning the repository

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/voicechain-explorer.git
cd voicechain-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_NODIT_API_KEY=your-nodit-api-key
```

### 4. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### 5. Start the Development Server

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) — Chrome is recommended for voice input.

---

## 🧪 Usage

### 🎙 Query Blockchain Data

* Click the mic button and say a query like:
  *“Show me all NFT trades by 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon in the last 24 hours.”*

* Alternatively, type queries in the input field.

### 📊 View Results

* Results will display in a dynamic table.
* NFT trade volumes are visualized using **bar charts**.

### 🛰 Real-Time Monitoring

* Placeholder for **live transaction updates** using **Nodit Stream API** (WebSocket setup required).



## 🔌 Nodit Integration

### 📦 Web3 Data API

Example for fetching NFT transfers:

```ts
const data = await fetchNFTTrades(
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "polygon"
);
```

### 🧠 MCP Setup

Example `mcp.config.json`:

```json
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": {
        "NODIT_API_KEY": "your-api-key"
      }
    }
  }
}
```
