import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getQueryTemplates } from '../services/noditService';

interface QueryGalleryProps {
  onSelectQuery: (query: string) => void;
}

const QueryGallery: React.FC<QueryGalleryProps> = ({ onSelectQuery }) => {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    getQueryTemplates().then(setTemplates).catch(console.error);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
      role="region"
      aria-label="Query Gallery"
    >
      <h2 className="text-2xl font-bold mb-4">Community Queries</h2>
      {templates.length === 0 ? (
        <p className="text-gray-400">No community queries yet.</p>
      ) : (
        <ul className="space-y-2">
          {templates.map((template, index) => (
            <motion.li
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="text-blue-300 hover:underline focus:outline-none"
                onClick={() => onSelectQuery(template.template)}
                aria-label={`Run community query: ${template.template}`}
              >
                {template.template} (Votes: {template.votes})
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default QueryGallery;