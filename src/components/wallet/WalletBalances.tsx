import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useWallet } from '../../context/WalletContext';
import { formatCurrency } from '../../utils/helpers';

const WalletBalances: React.FC = () => {
  const { balances } = useWallet();

  // Mock price changes for demo
  const getPriceChange = (currency: string): { change: number; isPositive: boolean } => {
    const mockChanges: Record<string, number> = {
      'Bitcoin': 2.35,
      'Ethereum': -1.47,
      'USDC': 0.02,
      'Anonimity Coin': 8.76
    };
    
    const change = mockChanges[currency] || (Math.random() * 10 - 5);
    return {
      change: Math.abs(change),
      isPositive: change >= 0
    };
  };

  return (
    <Card>
      <CardHeader title="Wallet Balances" subtitle="Your available currencies" />
      <CardBody className="p-0">
        <div className="divide-y divide-dark-200">
          {balances.map((balance) => {
            const priceChange = getPriceChange(balance.currency);
            return (
              <div key={balance.currency} className="flex items-center justify-between p-4 hover:bg-dark-200 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                    <span className="text-primary-300 font-medium">{balance.symbol.substring(0, 1)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-light-200">{balance.currency}</h3>
                    <div className="flex items-center mt-1">
                      {priceChange.isPositive ? (
                        <TrendingUp className="w-3 h-3 text-success-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-error-500 mr-1" />
                      )}
                      <span className={`text-xs ${priceChange.isPositive ? 'text-success-500' : 'text-error-500'}`}>
                        {priceChange.isPositive ? '+' : '-'}{priceChange.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(balance.amount, balance.symbol)}</p>
                  <p className="text-xs text-light-400">
                    ${(balance.amount * (balance.currency === 'Bitcoin' ? 35000 : 
                                         balance.currency === 'Ethereum' ? 2500 : 
                                         balance.currency === 'USDC' ? 1 : 0.05)).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletBalances;