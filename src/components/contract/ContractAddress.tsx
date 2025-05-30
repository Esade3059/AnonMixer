import React, { useState, useEffect } from 'react';
import { useContract } from '../../context/ContractContext';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContractAddress: React.FC = () => {
  const { contractAddress, isLoading, error } = useContract();
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showCopied) {
      timeoutId = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showCopied]);

  const copyToClipboard = async () => {
    if (contractAddress) {
      try {
        await navigator.clipboard.writeText(contractAddress);
        setShowCopied(true);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse bg-dark-200 rounded-lg p-4 max-w-2xl mx-auto"
      >
        <div className="h-4 bg-dark-300 rounded w-3/4 mx-auto"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-error-500/10 border border-error-500 rounded-lg p-4 text-error-500 max-w-2xl mx-auto"
      >
        Error: {error}
      </motion.div>
    );
  }

  if (!contractAddress || typeof contractAddress !== 'string' || contractAddress.trim() === '') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-500/10 border border-primary-500 rounded-lg p-4 max-w-2xl mx-auto"
      >
        <p className="text-primary-400 font-medium text-center">Launching in Q2 2025</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-200 rounded-lg p-4 max-w-2xl mx-auto"
      >
        <motion.div 
          className="flex items-center justify-between"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="font-mono text-light-100 break-all">{contractAddress}</p>
          <motion.button
            onClick={copyToClipboard}
            className="p-2 hover:bg-dark-300 rounded-lg transition-colors ml-4"
            title="Copy to clipboard"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Copy className="w-5 h-5 text-light-300/60" />
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showCopied && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-primary-500/90 backdrop-blur-sm text-light-100 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Copied CA!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContractAddress; 