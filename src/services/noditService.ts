import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const NODIT_API_KEY = process.env.REACT_APP_NODIT_API_KEY || 'your-api-key';

// Firebase setup for community queries (replace with your config)
const firebaseConfig = {
  apiKey: 'your-firebase-api-key',
  authDomain: 'your-firebase-auth-domain',
  projectId: 'your-firebase-project-id',
  storageBucket: 'your-firebase-storage-bucket',
  messagingSenderId: 'your-firebase-messaging-sender-id',
  appId: 'your-firebase-app-id',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchNFTTrades = async (address: string, chain: string) => {
  const isAptos = chain === 'aptos';
  const url = isAptos
    ? 'https://indexer.nodit.io/v1/aptos/mainnet/graphql'
    : `https://web3.nodit.io/v1/${chain}/mainnet/nft/getNFTTransfersByAccount`;
  try {
    const response = isAptos
      ? await axios.post(
          url,
          {
            query: `
              query {
                nfts(owner: "${address}") {
                  id
                  collection
                  owner
                  lastTransactionTimestamp
                }
              }`,
          },
          { headers: { 'X-API-KEY': NODIT_API_KEY } }
        )
      : await axios.post(
          url,
          {
            accountAddress: address,
            fromDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            toDate: new Date().toISOString(),
          },
          {
            headers: {
              'X-API-KEY': NODIT_API_KEY,
              'accept': 'application/json',
              'content-type': 'application/json',
            },
          }
        );
    return (isAptos ? response.data.data.nfts : response.data.transfers || []).map((tx: any) => ({
      ...tx,
      chain,
      timestamp: tx.lastTransactionTimestamp || tx.timestamp || new Date().toISOString(),
      transactionHash: tx.id || tx.transactionHash,
      from: tx.owner || tx.from,
      to: tx.to || 'N/A',
      tokenId: tx.id || tx.tokenId,
      value: tx.value || '0',
    }));
  } catch (error) {
    console.error('Error fetching NFT trades:', error);
    throw new Error('Failed to fetch NFT trades.');
  }
};

export const fetchPortfolio = async (address: string, chains: string[]) => {
  try {
    const results = await Promise.all(
      chains.map(async (chain) => {
        const nftData = await fetchNFTTrades(address, chain);
        const tokenData = chain !== 'aptos' ? await axios.post(
          `https://web3.nodit.io/v1/${chain}/mainnet/token/getTokenBalancesByAccount`,
          { accountAddress: address },
          { headers: { 'X-API-KEY': NODIT_API_KEY } }
        ) : { data: { balances: [] } }; // Aptos token balances TBD
        return { chain, nfts: nftData, tokens: tokenData.data.balances };
      })
    );
    return results;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw new Error('Failed to fetch portfolio.');
  }
};

export const setupMCP = async () => {
  try {
    // Placeholder for full MCP server setup
    console.log('Initializing Nodit MCP server...');
    // Run: npx @noditlabs/nodit-mcp-server@latest
    // Mock LLM response for demo
    return {
      status: 'MCP active',
      queryProcessor: (query: string) => ({
        address: query.match(/0x[a-fA-F0-9]{40}/)?.[0],
        chain: query.toLowerCase().includes('polygon') ? 'polygon' : query.toLowerCase().includes('aptos') ? 'aptos' : 'ethereum',
        type: query.toLowerCase().includes('portfolio') ? 'portfolio' : 'nft',
      }),
    };
  } catch (error) {
    console.error('MCP setup failed:', error);
    throw new Error('Failed to initialize MCP.');
  }
};

export const setupStream = (chain: string, callback: (event: any) => void) => {
  // Placeholder: Replace with real WebSocket
  const ws = new WebSocket(`wss://stream.nodit.io/v1/${chain}/mainnet?apiKey=${NODIT_API_KEY}`);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback({ ...data, chain, timestamp: new Date().toISOString() });
  };
  ws.onerror = () => console.error('Stream error');
  ws.onopen = () => console.log(`Streaming ${chain} transactions`);
  return () => ws.close();
};

export const saveQueryTemplate = async (template: string, user: string) => {
  try {
    await addDoc(collection(db, 'templates'), { template, user, votes: 0 });
  } catch (error) {
    console.error('Error saving query template:', error);
  }
};

export const getQueryTemplates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'templates'));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching query templates:', error);
    return [];
  }
};