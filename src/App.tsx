import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import BlockchainResults from "./components/BlockchainResults";
import DataVisualization from "./components/DataVisualization";
import { motion } from "framer-motion";
import { fetchNFTTrades } from "./services/noditService";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Parse query to extract address and chain (simplified for demo)
      const addressMatch = query.match(/0x[a-fA-F0-9]{40}/);
      const chain = query.includes("Polygon") ? "polygon" : "ethereum";
      const address = addressMatch ? addressMatch[0] : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

      const data = await fetchNFTTrades(address, chain);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
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
        <p className="text-lg mt-2">AI-Powered Blockchain Analytics with Voice Input</p>
      </motion.header>
      <main className="container mx-auto p-4">
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
        {error && <p className="text-red-500 text-center">{error}</p>}
        <BlockchainResults results={results} />
        <DataVisualization results={results} />
      </main>
    </div>
  );
};

export default App;