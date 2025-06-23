import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataVisualizationProps {
  results: any[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ results }) => {
  // Aggregate data by chain
  const chainCounts = results.reduce((acc, tx) => {
    const chain = tx.chain || 'Unknown';
    acc[chain] = (acc[chain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(chainCounts),
    datasets: [
      {
        label: 'NFT Trades by Chain',
        data: Object.values(chainCounts),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'NFT Trade Distribution by Chain' },
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
      <h2 className="text-2xl font-bold mb-4">Trade Distribution</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No data to visualize. Run a query to see results.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </motion.div>
  );
};

export default DataVisualization;