import React from 'react';
import { motion } from 'framer-motion';

const BlockchainResults: React.FC = () => {
  const mockResults = [
    { transactionHash: '0x123...', from: '0xABC...', to: '0xDEF...', tokenId: 'NFT001', value: '1 ETH' },
    { transactionHash: '0x456...', from: '0xGHI...', to: '0xJKL...', tokenId: 'NFT002', value: '0.5 ETH' },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Blockchain Results"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Blockchain Results</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="pb-2">Tx Hash</th>
            <th className="pb-2">From</th>
            <th className="pb-2">To</th>
            <th className="pb-2">Token ID</th>
            <th className="pb-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">{result.transactionHash.slice(0, 10)}...</td>
              <td className="py-2">{result.from.slice(0, 10)}...</td>
              <td className="py-2">{result.to.slice(0, 10)}...</td>
              <td className="py-2">{result.tokenId}</td>
              <td className="py-2">{result.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BlockchainResults;