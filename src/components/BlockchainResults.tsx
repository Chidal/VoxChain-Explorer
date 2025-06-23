import React from 'react';
import { motion } from 'framer-motion';

interface BlockchainResultsProps {
  results: any[];
}

const BlockchainResults: React.FC<BlockchainResultsProps> = ({ results }) => {
  const isHighValueTrade = (trade: any) => {
    // Simple rule: Flag trades with value > 0.1 ETH (placeholder)
    return trade.value && parseFloat(trade.value) > 0.1;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
      role="region"
      aria-label="Query Results"
    >
      <h2 className="text-2xl font-bold mb-4">Transaction Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No results found. Try a different query.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3">Tx Hash</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Token ID</th>
                <th className="p-3">Value (ETH)</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((tx, index) => (
                <motion.tr
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-600 hover:bg-gray-600"
                >
                  <td className="p-3">{tx.transactionHash?.slice(0, 10)}...</td>
                  <td className="p-3">{tx.from?.slice(0, 10)}...</td>
                  <td className="p-3">{tx.to?.slice(0, 10)}...</td>
                  <td className="p-3">{tx.tokenId || 'N/A'}</td>
                  <td className="p-3">{tx.value || 'N/A'}</td>
                  <td className="p-3">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="p-3">
                    {isHighValueTrade(tx) && (
                      <span className="text-yellow-400 font-bold">High Value</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default BlockchainResults;