import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataVisualizationProps {
  results: any[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ results }) => {
  const data = {
    labels: results.map((tx) => new Date(tx.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "NFT Trade Volume",
        data: results.map(() => 1), // Simplified: count of trades
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "NFT Trade Volume (Last 24 Hours)" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold">Trade Volume Visualization</h2>
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default DataVisualization;