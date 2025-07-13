import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface DataVisualizationProps {
  results: any[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ results }) => {
  const chainCounts = results.reduce((acc, tx) => {
    const chain = tx.chain || 'Unknown';
    acc[chain] = (acc[chain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dates = results.map((tx) => new Date(tx.timestamp).toLocaleDateString());
  const volumes = results.map(() => 1); // Count trades
  const predicted = volumes.map((v, i) => (i > 0 ? (v + volumes[i - 1]) / 2 : v)); // Simple moving average

  const data = {
    labels: dates.length > 0 ? dates : Object.keys(chainCounts),
    datasets: [
      {
        label: 'Actual Trades',
        data: volumes.length > 0 ? volumes : Object.values(chainCounts),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Predicted Trades',
        data: predicted,
        borderColor: 'green',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'NFT Trade Trends and Predictions' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
      role="region"
      aria-label="Data Visualization"
    >
      <h2 className="text-2xl font-bold mb-4">Trade Trends</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No data to visualize. Run a query to see results.</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </motion.div>
  );
};

export default DataVisualization;