// Generate a random ID for transactions and other entities
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format currency values with specified decimals and currency symbol
export const formatCurrency = (
  value: number, 
  symbol: string = '', 
  decimals: number = 2
): string => {
  return `${value.toFixed(decimals)} ${symbol}`;
};

// Calculate fee amount based on percentage
export const calculateFee = (amount: number, feePercentage: number): number => {
  return amount * (feePercentage / 100);
};

// Generate a random wallet address
export const generateRandomAddress = (): string => {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// Format timestamp to readable date string
export const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Truncate long strings (like addresses) with ellipsis
export const truncateString = (str: string, maxLength: number = 12): string => {
  if (str.length <= maxLength) return str;
  
  const prefixLength = Math.ceil(maxLength / 2);
  const suffixLength = Math.floor(maxLength / 2) - 3; // -3 for the ellipsis
  
  return `${str.substring(0, prefixLength)}...${str.substring(str.length - suffixLength)}`;
};

// Determine color class based on transaction status
export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'text-success-500';
    case 'pending':
      return 'text-warning-500';
    case 'processing':
      return 'text-secondary-400';
    case 'failed':
      return 'text-error-500';
    default:
      return 'text-light-300';
  }
};

// Simulate network latency for async operations
export const simulateLatency = async (minMs: number = 500, maxMs: number = 2000): Promise<void> => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Get anonymity level description
export const getAnonymityLevelDescription = (level: string): string => {
  switch (level) {
    case 'basic':
      return 'Single-pass mixing through one pool';
    case 'enhanced':
      return 'Dual-pass mixing through different pools';
    case 'maximum':
      return 'Multi-pass mixing with time delays';
    default:
      return 'Unknown mixing level';
  }
};