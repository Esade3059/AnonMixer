import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Shuffle, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useWallet } from '../../context/WalletContext';
import { formatDate, getStatusColorClass, truncateString } from '../../utils/helpers';
import { Transaction } from '../../types';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-success-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-warning-500" />;
      case 'mix':
        return <Shuffle className="w-4 h-4 text-primary-400" />;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-secondary-400 animate-pulse" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-error-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="transaction-item hover:bg-dark-200 p-4 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center mr-3">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-light-200 capitalize">
                {transaction.type}
              </h3>
              <span className={`ml-2 flex items-center text-xs ${getStatusColorClass(transaction.status)}`}>
                {getStatusIcon()}
                <span className="ml-1 capitalize">{transaction.status}</span>
              </span>
            </div>
            <p className="text-xs text-light-400">{formatDate(transaction.timestamp)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono font-medium">
            {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toFixed(4)} {transaction.currency}
          </p>
          {transaction.type === 'mix' && transaction.fee && (
            <p className="text-xs text-light-400">Fee: {transaction.fee.toFixed(4)} {transaction.currency}</p>
          )}
        </div>
      </div>

      {/* Expandable details section */}
      <div className="transaction-details pl-11 mt-2">
        <div className="p-3 bg-dark-300 rounded-lg font-mono text-xs">
          {transaction.type === 'mix' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-light-400">From:</p>
                  <p className="text-light-300">{truncateString(transaction.fromAddress || '', 24)}</p>
                </div>
                <div>
                  <p className="text-light-400">To:</p>
                  <p className="text-light-300">{truncateString(transaction.toAddress || '', 24)}</p>
                </div>
              </div>
              {transaction.anonymityScore !== undefined && (
                <div className="mt-2">
                  <p className="text-light-400">Anonymity Score: <span className="text-primary-300">{transaction.anonymityScore}/100</span></p>
                </div>
              )}
            </>
          )}
          <div className="mt-2">
            <p className="text-light-400">Transaction ID:</p>
            <p className="text-light-300">{transaction.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TransactionsListProps {
  limit?: number;
  showViewAll?: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ limit, showViewAll = false }) => {
  const { transactions } = useWallet();
  
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <Card>
      <CardHeader 
        title="Recent Transactions" 
        subtitle={`${displayTransactions.length} transaction${displayTransactions.length !== 1 ? 's' : ''}`}
        action={
          showViewAll && limit && transactions.length > limit ? (
            <a href="/transactions" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
              View All
            </a>
          ) : undefined
        }
      />
      <CardBody className="p-0">
        <div className="divide-y divide-dark-200">
          {displayTransactions.length > 0 ? (
            displayTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="p-6 text-center text-light-400">
              No transactions found
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionsList;