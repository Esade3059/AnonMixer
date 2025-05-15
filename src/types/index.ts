export interface WalletBalance {
  currency: string;
  amount: number;
  symbol: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'mix';
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fee?: number;
  fromAddress?: string;
  toAddress?: string;
  anonymityScore?: number;
  mixId?: string;
}

export interface MixingPool {
  id: string;
  name: string;
  currency: string;
  liquidity: number;
  anonymityScore: number;
  fee: number;
  minAmount: number;
  maxAmount: number;
  participantsCount: number;
  processingTime: {
    min: number;
    max: number;
  };
}

export interface MixRequest {
  amount: number;
  currency: string;
  recipientAddress: string;
  anonymityLevel: 'basic' | 'enhanced' | 'maximum';
  delayHours?: number;
}

export type AnonymityLevel = 'basic' | 'enhanced' | 'maximum';

export interface FeeStructure {
  level: AnonymityLevel;
  percentage: number;
  description: string;
}