import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, ContractData } from '../lib/supabase';

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
    // Initial fetch of contract data
    const fetchContractData = async () => {
      try {
        // Check if Supabase is configured
        if (!supabase) {
          throw new Error('Supabase client is not configured');
        }

        const { data, error } = await supabase
          .from('contracts')
          .select('contract_address')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No data found - this is not an error
            setContractAddress(null);
          } else {
            throw error;
          }
        } else if (data) {
          setContractAddress(data.contract_address);
        }
      } catch (err) {
        console.error('Contract fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contract data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractData();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel('contract-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contracts',
        },
        (payload) => {
          const newContract = payload.new as ContractData;
          setContractAddress(newContract.contract_address);
          setError(null); // Clear any previous errors
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
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