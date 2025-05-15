import React from 'react';
import TransactionsList from '../components/transactions/TransactionsList';

const TransactionHistory: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-light-400">
          View all your past deposits, withdrawals and mixing operations.
        </p>
      </div>
      
      <TransactionsList />
    </div>
  );
};

export default TransactionHistory;