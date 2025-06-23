Sure! Here's your content neatly arranged in a professional and readable **README.md** format for the **VoiceChain Explorer** project:

---

# 🔊 VoiceChain Explorer

**VoiceChain Explorer** is an AI-powered, voice-driven blockchain explorer built for the **WaveHack/Buildathon** using **Nodit’s** Web3 Data API, Model Context Protocol (MCP), and Stream API. Users can query blockchain data (e.g., NFT trades on Polygon or Ethereum) via voice or text using natural language, and receive instant results with dynamic visualizations.

The app features a polished, animated UI built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**—designed to make Web3 analytics both accessible and engaging.

---

## 🚀 Features

* 🎙️ **Voice-Driven Queries**: Query blockchain data with natural language via voice input using the Web Speech API (with a text fallback).
* 🤖 **AI-Powered Analytics**: Integrates Nodit’s MCP for natural language query parsing.
* ⏱️ **Real-Time Updates**: Streams live NFT trades (mocked for demo; WebSocket-ready).
* 📊 **Dynamic Visualizations**: Trade data is visualized using Chart.js (bar charts).
* 🚨 **Anomaly Detection**: Highlights high-value trades.
* 🌐 **Multi-Chain Support**: Works with Polygon and Ethereum; support for Aptos and XRPL planned.
* 📱 **Responsive UI**: Mobile-friendly, animated interface with a modern design.

---

## 🧰 Tech Stack

| Category        | Tools Used                                     |
| --------------- | ---------------------------------------------- |
| Frontend        | React, TypeScript, Tailwind CSS, Framer Motion |
| Visualization   | Chart.js, react-chartjs-2                      |
| Voice Input     | Web Speech API                                 |
| Blockchain Data | Nodit Web3 Data API, MCP, Stream API           |
| Networking      | Axios                                          |

---

## 🎯 WaveHack/Buildathon Alignment

VoiceChain Explorer supports the **AI + Analytics** theme by:

* Utilizing **Nodit MCP** for natural language understanding.
* Leveraging **Web3 Data API** for real-time NFT analytics.
* Integrating **Stream API** (mocked now, ready for WebSocket-based live updates).
* Visualizing multi-chain data with anomaly detection features.
* Enhancing data accessibility via voice and natural language.

---

## ✅ Prerequisites

Ensure the following are installed:

* **Node.js**: `v20.x` (LTS) or `v23.6.0`
* **npm**: `v10.9.2` or later
* **Browser**: Google Chrome (for Web Speech API support)
* **Microphone**: Required for voice input
* **Nodit API Key**: [Get one here](https://nodit.io)

---

## 🛠️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/chidal/voicechain-explorer.git
   cd voicechain-explorer
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory:

   ```
   REACT_APP_NODIT_API_KEY=your-nodit-api-key
   ```

4. **Start the Development Server**

   ```bash
   npm start
   ```

   Open in your browser: [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Deploy VoiceChain Explorer"
   git push origin main
   ```

2. **Deploy on Vercel**

   * Go to [vercel.com](https://vercel.com) and import the repository.
   * Add your `REACT_APP_NODIT_API_KEY` under **Environment Variables**.
   * Deploy and view your live app!

---

## 💡 Usage

* **Run Queries**: Click "🎙️ Speak" or type queries like:

  ```
  Show NFT trades by 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon
  ```

* **Explore Results**:

  * View a table of transactions.
  * High-value trades are flagged.
  * View distribution in a bar chart.

* **Live Monitoring**:

  * Trade data updates every 5 seconds (demo version).

---

## 🔗 Nodit Integration

### Web3 Data API

```ts
const data = await fetchNFTTrades('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'polygon');
```

### MCP (Model Context Protocol)

```js
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "your-api-key" }
    }
  }
}
```

### Stream API

Real-time updates are currently mocked but ready for WebSocket integration.

---

## 🔭 Future Enhancements

* ✅ Full MCP integration with a production LLM.
* 🔌 Live streaming via Nodit’s WebSocket API.
* 🌉 Multi-chain expansion to Aptos and XRPL.
* 📈 More visualizations (e.g., price trends).
* 🌍 Multilingual voice input support.

---

## 🐛 Troubleshooting

| Issue                | Solution                                                 |
| -------------------- | -------------------------------------------------------- |
| Voice not working    | Use Google Chrome and ensure mic permissions are granted |
| API not responding   | Double-check `REACT_APP_NODIT_API_KEY` in `.env`         |
| Charts not rendering | Ensure Chart.js and react-chartjs-2 are installed        |

---

## 📄 License

This project is licensed under the **MIT License**.
