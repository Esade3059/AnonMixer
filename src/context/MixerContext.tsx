import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { MixingPool, MixRequest, Transaction, AnonymityLevel, FeeStructure } from '../types';
import { generateRandomId } from '../utils/helpers';
import { mockPools } from '../utils/mockData';
import { useWallet } from './WalletContext';

interface MixerContextProps {
  pools: MixingPool[];
  selectedPool: MixingPool | null;
  selectPool: (poolId: string) => void;
  requestMix: (request: MixRequest) => Promise<Transaction>;
  mixInProgress: boolean;
  currentMixTransaction: Transaction | null;
  mixingComplete: boolean;
  resetMixingState: () => void;
  feeStructure: FeeStructure[];
}

const MixerContext = createContext<MixerContextProps | undefined>(undefined);

export const feeStructureData: FeeStructure[] = [
  {
    level: 'basic',
    percentage: 1.2,
    description: 'Basic mixing with standard pool size and single-pass mixing.'
  },
  {
    level: 'enhanced',
    percentage: 2.5,
    description: 'Enhanced privacy with larger pool size and dual-pass mixing algorithm.'
  },
  {
    level: 'maximum',
    percentage: 4.0,
    description: 'Maximum privacy with time-delayed multi-pass mixing through segregated pools.'
  }
];

export const MixerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pools] = useState<MixingPool[]>(mockPools);
  const [selectedPool, setSelectedPool] = useState<MixingPool | null>(null);
  const [mixInProgress, setMixInProgress] = useState(false);
  const [currentMixTransaction, setCurrentMixTransaction] = useState<Transaction | null>(null);
  const [mixingComplete, setMixingComplete] = useState(false);
  const { addTransaction } = useWallet();

  const selectPool = useCallback((poolId: string) => {
    const pool = pools.find(p => p.id === poolId) || null;
    setSelectedPool(pool);
  }, [pools]);

  const getFeeForLevel = (level: AnonymityLevel): number => {
    const fee = feeStructureData.find(f => f.level === level);
    return fee ? fee.percentage : 1.0;
  };

  const requestMix = useCallback(async (request: MixRequest): Promise<Transaction> => {
    setMixInProgress(true);
    setMixingComplete(false);

    const fee = (request.amount * getFeeForLevel(request.anonymityLevel)) / 100;
    const mixId = generateRandomId();

    // Create initial transaction
    const transaction: Transaction = {
      id: generateRandomId(),
      type: 'mix',
      amount: request.amount,
      currency: request.currency,
      timestamp: new Date(),
      status: 'processing',
      fee,
      fromAddress: '0x' + Math.random().toString(16).substring(2, 14),
      toAddress: request.recipientAddress,
      anonymityScore: request.anonymityLevel === 'basic' ? 65 : 
                      request.anonymityLevel === 'enhanced' ? 85 : 95,
      mixId
    };

    setCurrentMixTransaction(transaction);
    addTransaction(transaction);

    // Simulate mixing process
    const processingTime = request.anonymityLevel === 'basic' ? 8000 : 
                          request.anonymityLevel === 'enhanced' ? 12000 : 18000;

    return new Promise((resolve) => {
      setTimeout(() => {
        const completedTransaction = {
          ...transaction,
          status: 'completed' as const
        };
        
        setCurrentMixTransaction(completedTransaction);
        setMixingComplete(true);
        setMixInProgress(false);
        addTransaction(completedTransaction);
        resolve(completedTransaction);
      }, processingTime);
    });
  }, [addTransaction]);

  const resetMixingState = useCallback(() => {
    setMixInProgress(false);
    setCurrentMixTransaction(null);
    setMixingComplete(false);
  }, []);

  return (
    <MixerContext.Provider
      value={{
        pools,
        selectedPool,
        selectPool,
        requestMix,
        mixInProgress,
        currentMixTransaction,
        mixingComplete,
        resetMixingState,
        feeStructure: feeStructureData
      }}
    >
      {children}
    </MixerContext.Provider>
  );
};

export const useMixer = (): MixerContextProps => {
  const context = useContext(MixerContext);
  if (context === undefined) {
    throw new Error('useMixer must be used within a MixerProvider');
  }
  return context;
};