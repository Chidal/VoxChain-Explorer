import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VoiceInputProps {
  onQuery: (query: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onQuery }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onQuery(text);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    if (isListening) recognition.start();

    return () => recognition.stop();
  }, [isListening, onQuery]);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      onQuery(textInput);
      setTextInput("");
    }
  };

  return (
    <div className="p-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-full ${isListening ? "bg-red-500" : "bg-blue-500"} text-white`}
        onClick={() => setIsListening(!isListening)}
      >
        {isListening ? "Stop Listening" : "Start Voice Input"}
      </motion.button>
      <p className="mt-2">{transcript || "Speak or type your query..."}</p>
      <form onSubmit={handleTextSubmit} className="mt-4">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="e.g., Show me all NFT trades by 0x... on Polygon"
          className="p-2 w-full rounded text-black"
        />
        <button type="submit" className="mt-2 p-2 bg-green-500 rounded text-white">
          Submit Query
        </button>
      </form>
    </div>
  );
};

export default VoiceInput;