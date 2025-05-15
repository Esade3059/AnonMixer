import React from 'react';
import MixerForm from '../components/mixer/MixerForm';
import MixingVisualization from '../components/mixer/MixingVisualization';
import { useMixer } from '../context/MixerContext';

const MixerPage: React.FC = () => {
  const { mixInProgress, mixingComplete } = useMixer();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Cryptocurrency Mixer</h1>
        <p className="text-light-400 max-w-2xl mx-auto">
          Enhance the privacy of your cryptocurrency transactions by mixing your coins with others, making them harder to trace.
        </p>
      </div>

      {(mixInProgress || mixingComplete) ? (
        <MixingVisualization />
      ) : (
        <MixerForm />
      )}

      <div className="mt-8 bg-dark-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-3">
              <span className="font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Deposit Funds</h3>
            <p className="text-sm text-light-400">
              Select a currency and amount to mix. Your funds are pooled with other users'.
            </p>
          </div>
          
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-3">
              <span className="font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Mix in Pool</h3>
            <p className="text-sm text-light-400">
              Our protocol mixes funds through multiple addresses to break the transaction trail.
            </p>
          </div>
          
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-3">
              <span className="font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Receive Anonymized</h3>
            <p className="text-sm text-light-400">
              Receive your funds at a new address with no connection to the original source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixerPage;