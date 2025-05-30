import React, { createContext, useContext, useEffect, useState } from 'react';

interface ContractContextType {
  contractAddress: string | null;
  isLoading: boolean;
  error: string | null;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        console.log('Fetching contract data from:', backendUrl);

        const response = await fetch(`${backendUrl}/api/contract`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch contract data');
        }

        if (data.contract_address) {
          console.log('Found contract address:', data.contract_address);
          setContractAddress(data.contract_address);
          setError(null);
        } else {
          console.log('No contract address found');
          setContractAddress(null);
        }
      } catch (err) {
        console.error('Contract fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contract data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractData();
  }, []);

  return (
    <ContractContext.Provider value={{ contractAddress, isLoading, error }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}; 