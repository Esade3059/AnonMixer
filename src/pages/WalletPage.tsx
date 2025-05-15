import React from 'react';
import { Link } from 'react-router-dom';
import WalletBalances from '../components/wallet/WalletBalances';
import TransactionsList from '../components/transactions/TransactionsList';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWallet } from '../context/WalletContext';
import { CopyIcon, Shuffle } from 'lucide-react';

const WalletPage: React.FC = () => {
  const { walletAddress } = useWallet();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress || '');
    // In a real app, you'd add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wallet Dashboard</h1>
        <p className="text-light-400">
          Manage your assets and view transaction history.
        </p>
      </div>
      
      <Card>
        <CardHeader title="Wallet Address" />
        <CardBody>
          <div className="flex flex-col md:flex-row items-center justify-between bg-dark-200 p-4 rounded-lg">
            <span className="font-mono text-light-300 mb-4 md:mb-0">
              {walletAddress || '0x0000000000000000000000000000000000000000'}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              leftIcon={<CopyIcon size={16} />}
            >
              Copy
            </Button>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
            <Link to="/mixer" className="w-full md:w-auto">
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<Shuffle size={16} />}
              >
                Mix Cryptocurrency
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
      
      <WalletBalances />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <TransactionsList limit={5} />
      </div>
    </div>
  );
};

export default WalletPage;