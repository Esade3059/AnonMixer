import { MixingPool } from '../types';
import { generateRandomId, generateRandomAddress } from './helpers';

// Mock mixing pools
export const mockPools: MixingPool[] = [
  {
    id: 'btc-pool',
    name: 'Bitcoin Mixer',
    currency: 'Bitcoin',
    liquidity: 156.45,
    anonymityScore: 92,
    fee: 1.2,
    minAmount: 0.01,
    maxAmount: 5,
    participantsCount: 1234,
    processingTime: {
      min: 30,
      max: 120
    }
  },
  {
    id: 'eth-pool',
    name: 'Ethereum Mixer',
    currency: 'Ethereum',
    liquidity: 2156.78,
    anonymityScore: 88,
    fee: 1.5,
    minAmount: 0.1,
    maxAmount: 20,
    participantsCount: 989,
    processingTime: {
      min: 15,
      max: 60
    }
  },
  {
    id: 'usdc-pool',
    name: 'USDC Mixer',
    currency: 'USDC',
    liquidity: 850000,
    anonymityScore: 85,
    fee: 0.8,
    minAmount: 100,
    maxAmount: 50000,
    participantsCount: 1412,
    processingTime: {
      min: 10,
      max: 45
    }
  }
];

// Generate mock transactions for initial state
export const generateMockTransactions = () => {
  return [];
};

// Get mock wallet data for demo
export const getMockWalletData = () => {
  return [
    { currency: 'Bitcoin', amount: 0.0025, symbol: 'BTC' },
    { currency: 'Ethereum', amount: 0.042, symbol: 'ETH' },
    { currency: 'USDC', amount: 100, symbol: 'USDC' }
  ];
};