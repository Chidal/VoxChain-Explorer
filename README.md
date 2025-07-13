# VoiceChain Explorer

**VoiceChain Explorer** is an AI-powered, voice-driven blockchain explorer, leveraging **Nodit’s** Web3 Data API, Model Context Protocol (MCP), Stream API, and Indexer API. Users can query NFT and token data across Polygon, Ethereum, and Aptos using natural language via voice or text, with real-time updates, anomaly detection, and dynamic visualizations. Since Wave 2, we’ve added a portfolio dashboard, Aptos support, community query gallery, and transaction predictions, significantly enhancing functionality and Nodit integration. The app features a polished UI with React, TypeScript, Tailwind CSS, and Framer Motion, deployed on Vercel for a stable demo.

## Wave 3 Improvements
- **Portfolio Dashboard**: View NFT and token holdings across multiple chains (Polygon, Ethereum, Aptos).
- **Aptos Integration**: Query NFT data using Nodit’s Indexer API (GraphQL).
- **Real-Time Streaming**: Live transaction updates via Nodit’s Stream API (WebSocket).
- **Anomaly Detection**: Flags high-value trades with AI-generated explanations.
- **Community Query Gallery**: Share and vote on query templates using Firebase.
- **Transaction Predictions**: Forecast trade volumes with a simple moving average model.
- **UI Enhancements**: Improved responsiveness, accessibility, and animations.

## Features
- **Voice Queries**: Use Web Speech API for natural language queries (e.g., “Show NFT trades on Polygon”).
- **AI Analytics**: Nodit MCP parses queries with a mock LLM (ready for full integration).
- **Real-Time Updates**: Stream API delivers live transaction data.
- **Visualizations**: Chart.js line charts for trade trends and predictions.
- **Multi-Chain Support**: Polygon, Ethereum, Aptos.
- **Community Engagement**: Save and share queries in a public gallery.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Visualization**: Chart.js, react-chartjs-2
- **Voice Input**: Web Speech API
- **Blockchain**: Nodit Web3 Data API, MCP, Stream API, Indexer API
- **Backend**: Firebase Firestore (for query gallery)
- **HTTP Client**: Axios

## Prerequisites
- Node.js: v20.x or v23.6.0
- npm: v10.9.2+
- Nodit API Key: [nodit.io](https://nodit.io)
- Firebase Project: [firebase.google.com](https://firebase.google.com)
- Chrome (for Web Speech API)

## Installation
1. Clone: `git clone https://github.com/chidal/voicechain-explorer.git`
2. Install: `npm install`
3. Set up `.env`:
   ```
   REACT_APP_NODIT_API_KEY=your-nodit-api-key
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
   ```
4. Start: `npm start` (opens `http://localhost:3000`)

## Deployment
1. Push to GitHub: `git push origin main`
2. Deploy on Vercel with environment variables.
3. Test live demo: [your-vercel-url]

## Nodit Integration
- **Web3 Data API**: Queries NFT trades and token balances:
```typescript
  const nfts = await fetchNFTTrades('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'polygon');
  const portfolio = await fetchPortfolio('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', ['polygon', 'ethereum']);
```

- **Indexer API**: Aptos NFT queries via GraphQL.
- **MCP**: AI query parsing (mocked; ready for LLM).
- **Stream API**: Real-time transaction streaming via WebSocket.

## Changelog (Since Wave 2)
- Added portfolio dashboard for multi-chain holdings.
- Integrated Aptos via Indexer API.
- Implemented real-time Stream API.
- Added anomaly detection with explanations.
- Introduced community query gallery with Firebase.
- Enhanced visualizations with transaction predictions.
- Improved UI with accessibility and animations.

## Troubleshooting
- **Voice Input**: Use Chrome with microphone permissions.
- **API Errors**: Verify Nodit and Firebase keys in `.env`.
- **Visualizations**: Install `chart.js` and `react-chartjs-2`.

## License
MIT License

## Acknowledgments
- Nodit: For robust Web3 APIs.
- WaveHack/Buildathon: For inspiring innovation.
```



### Next Steps

1. **Set Up Firebase**:
   - Create a Firebase project and add Firestore.
   - Update `noditService.ts` with your Firebase config.
   - Test `saveQueryTemplate` and `getQueryTemplates`.

2. **Test Locally**:
   ```bash
   npm install firebase chart.js react-chartjs-2 framer-motion axios
   npm start
   ```
   - Test voice queries, portfolio dashboard, real-time updates, and gallery.

3. **Deploy and Record Demo**:
   - Deploy to Vercel with environment variables.
   - Record a 2-3 minute video showing all features.

4. **Commit Strategy**:
   - Use descriptive commits:
     ```bash
     git commit -m "Add portfolio dashboard with multi-chain support"
     git commit -m "Implement Nodit Stream API for real-time updates"
     git commit -m "Integrate Aptos Indexer API for NFT queries"
     ```

5. **MCP Full Setup** (Optional):
   - If time allows, run `@noditlabs/nodit-mcp-server` locally and connect to a real LLM (e.g., Hugging Face API).

---
