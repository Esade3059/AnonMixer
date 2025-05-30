import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Lock } from 'lucide-react';
import Button from '../ui/Button';
import { useWallet } from '../../context/WalletContext';

const ConnectWalletPrompt: React.FC = () => {
  const { connect } = useWallet();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto text-center p-8"
      >
        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg relative">
            <Wallet className="w-10 h-10 text-dark-400" />
            <motion.div 
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "loop"
              }}
              style={{ border: '1px solid #33FF6A' }}
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-light-100">Connect Your Wallet</h2>
        <p className="text-light-400 mb-8">
          Connect your wallet to access the AnonMixer platform and enhance your transaction privacy
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-dark-300 rounded-lg text-left">
            <div className="flex items-start">
              <div className="min-w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                <Lock className="w-4 h-4 text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-light-200 mb-1">Demo Mode</h3>
                <p className="text-sm text-light-400">
                  This is a demonstration application. No real cryptocurrency will be transferred or mixed.
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="primary"
            fullWidth
            onClick={connect}
            rightIcon={<ArrowRight size={16} />}
          >
            Connect Demo Wallet
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectWalletPrompt;