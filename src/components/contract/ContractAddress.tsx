import React from 'react';
import { useContract } from '../../context/ContractContext';
import { Copy } from 'lucide-react';

const ContractAddress: React.FC = () => {
  const { contractAddress, isLoading, error } = useContract();

  const copyToClipboard = async () => {
    if (contractAddress) {
      try {
        await navigator.clipboard.writeText(contractAddress);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse bg-dark-200 rounded-lg p-4">
        <div className="h-4 bg-dark-300 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-500/10 border border-error-500 rounded-lg p-4 text-error-500">
        Error: {error}
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <div className="bg-primary-500/10 border border-primary-500 rounded-lg p-4">
        <p className="text-primary-400 font-medium text-center">Launching in Q2 2025</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-light-100 break-all">{contractAddress}</p>
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-dark-300 rounded-lg transition-colors ml-4"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5 text-light-300/60" />
        </button>
      </div>
    </div>
  );
};

export default ContractAddress; 