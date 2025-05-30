import React from 'react';
import { Link } from 'react-router-dom';
import { Shuffle, ArrowRight } from 'lucide-react';
import WalletBalances from '../components/wallet/WalletBalances';
import TransactionsList from '../components/transactions/TransactionsList';
import PoolStats from '../components/dashboard/PoolStats';
import Button from '../components/ui/Button';
import ContractAddress from '../components/contract/ContractAddress';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-light-100">Dashboard</h1>
      <ContractAddress />
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-dark-300 to-dark-200 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-hero-pattern opacity-10" />
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-light-100 mb-4">
              Enhance Your <span className="text-primary-400">Privacy</span> with AnonMixer
            </h1>
            <p className="text-light-300 text-lg mb-8">
              Mix your cryptocurrencies to make transactions harder to trace while maintaining complete control of your assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/mixer">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<Shuffle size={18} />}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Start Mixing
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WalletBalances />
          </div>
          <div className="lg:col-span-2">
            <TransactionsList limit={5} showViewAll />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Available Mixing Pools</h2>
          <PoolStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;