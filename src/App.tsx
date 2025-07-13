import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VoiceInput from './components/VoiceInput';
import BlockchainResults from './components/BlockchainResults';
import DataVisualization from './components/DataVisualization';
import QueryGallery from './components/QueryGallery';
import { fetchNFTTrades, fetchPortfolio, setupStream, setupMCP } from './services/noditService';

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize MCP
    setupMCP().catch((err) => setError('MCP initialization failed.'));
    // Set up real-time stream for Polygon
    const unsubscribe = setupStream('polygon', (event) => {
      setResults((prev) => [event, ...prev.slice(0, 9)]); // Keep latest 10
    });
    return unsubscribe;
  }, []);

  const handleQuery = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const addressMatch = query.match(/0x[a-fA-F0-9]{40}/);
      const chain = query.toLowerCase().includes('polygon') ? 'polygon' : query.toLowerCase().includes('aptos') ? 'aptos' : 'ethereum';
      const address = addressMatch ? addressMatch[0] : '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

      if (query.toLowerCase().includes('portfolio')) {
        const data = await fetchPortfolio(address, [chain]);
        setPortfolio(data);
      } else {
        const data = await fetchNFTTrades(address, chain);
        setResults(data);
      }
    } catch (err) {
      setError('Failed to fetch data. Check your query or API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 text-center"
      >
        <h1 className="text-4xl font-bold">VoiceChain Explorer</h1>
        <p className="text-lg mt-2">AI-Powered Multi-Chain Analytics</p>
      </motion.header>
      <main className="container mx-auto p-4 space-y-6">
        <VoiceInput onQuery={handleQuery} />
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-center text-2xl"
          >
            Loading...
          </motion.div>
        )}
        {error && <p className="text-red-500 text-center text-lg">{error}</p>}
        <QueryGallery onSelectQuery={handleQuery} />
        {results.length > 0 && (
          <>
            <BlockchainResults results={results} />
            <DataVisualization results={results} />
          </>
        )}
        {portfolio.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-gray-800 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>
            {portfolio.map((chainData, index) => (
              <div key={index}>
                <h3 className="text-xl">{chainData.chain.toUpperCase()}</h3>
                <p>NFTs: {chainData.nfts.length}</p>
                <p>Tokens: {chainData.tokens.length}</p>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default App;