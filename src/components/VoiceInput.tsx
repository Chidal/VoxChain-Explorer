import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveQueryTemplate } from '../services/noditService';

interface VoiceInputProps {
  onQuery: (query: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onQuery }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const suggestions = [
    'Show NFT trades by 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon',
    'View portfolio for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Ethereum',
  ];

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Voice input not supported. Use text input.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onQuery(text);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setError('Voice recognition failed. Try again or use text input.');
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    if (isListening) recognition.start();

    return () => recognition.stop();
  }, [isListening, onQuery]);

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      onQuery(textInput);
      await saveQueryTemplate(textInput, 'anonymous'); // Save to community gallery
      setTextInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTextInput(suggestion);
    onQuery(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
      role="region"
      aria-label="Query Input"
    >
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white focus:outline-none focus:ring-2 focus:ring-blue-300`}
          onClick={() => setIsListening(!isListening)}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? 'Stop' : 'Speak'}
        </motion.button>
        <p className="text-sm">{transcript || 'Speak or type your query...'}</p>
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      <form onSubmit={handleTextSubmit} className="mt-4">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="e.g., Show NFT trades on Polygon"
          className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Text query input"
        />
        <button
          type="submit"
          className="mt-2 w-full p-3 bg-green-500 rounded-lg text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label="Submit query"
        >
          Submit
        </button>
      </form>
      <div className="mt-4">
        <p className="text-sm">Try these queries:</p>
        <ul className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="text-blue-300 hover:underline focus:outline-none"
                onClick={() => handleSuggestionClick(suggestion)}
                aria-label={`Use suggestion: ${suggestion}`}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default VoiceInput;