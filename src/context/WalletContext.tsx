import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { WalletBalance, Transaction } from '../types';
import { generateMockTransactions } from '../utils/mockData';

interface WalletContextProps {
  connected: boolean;
  balances: WalletBalance[];
  transactions: Transaction[];
  connect: () => void;
  disconnect: () => void;
  addTransaction: (transaction: Transaction) => void;
  walletAddress: string | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

const mockBalances: WalletBalance[] = [
  { currency: 'Bitcoin', amount: 0.45, symbol: 'BTC' },
  { currency: 'Ethereum', amount: 3.2, symbol: 'ETH' },
  { currency: 'USDC', amount: 1250.75, symbol: 'USDC' },
  { currency: 'Anonimity Coin', amount: 42000, symbol: 'ANON' }
];

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connect = useCallback(() => {
    setConnected(true);
    setBalances(mockBalances);
    setTransactions(generateMockTransactions(10));
    setWalletAddress('0x' + Math.random().toString(16).substring(2, 14) + '...');
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setBalances([]);
    setTransactions([]);
    setWalletAddress(null);
  }, []);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);

    // Update balance if completed
    if (transaction.status === 'completed') {
      setBalances(prev =>
        prev.map(balance => {
          if (balance.currency === transaction.currency) {
            const multiplier = transaction.type === 'deposit' ? 1 : -1;
            return {
              ...balance,
              amount: balance.amount + transaction.amount * multiplier
            };
          }
          return balance;
        })
      );
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        balances,
        transactions,
        connect,
        disconnect,
        addTransaction,
        walletAddress
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};