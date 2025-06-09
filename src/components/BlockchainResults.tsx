import React from "react";
import { motion } from "framer-motion";

interface BlockchainResultsProps {
  results: any[];
}

const BlockchainResults: React.FC<BlockchainResultsProps> = ({ results }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold">Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2">Transaction Hash</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Token ID</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {results.map((tx, index) => (
              <motion.tr
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b"
              >
                <td className="p-2">{tx.transactionHash}</td>
                <td className="p-2">{tx.from}</td>
                <td className="p-2">{tx.to}</td>
                <td className="p-2">{tx.tokenId}</td>
                <td className="p-2">{new Date(tx.timestamp).toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default BlockchainResults;