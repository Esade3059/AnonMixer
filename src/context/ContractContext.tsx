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

        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('Fetching contract data...');

        // First, let's check if we can access the table
        const { data: tableCheck, error: tableError } = await supabase
          .from('contracts')
          .select('count')
          .limit(1);

        console.log('Table check response:', { tableCheck, tableError });
        console.log('Table check data type:', typeof tableCheck);
        console.log('Table check data:', tableCheck);
        console.log('Table check error:', tableError);

        // Now fetch the actual data
        const { data, error } = await supabase
          .from('contracts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        console.log('Raw response:', { data, error });
        console.log('Data type:', typeof data);
        console.log('Data length:', data?.length);
        console.log('First row:', data?.[0]);
        console.log('Contract address type:', typeof data?.[0]?.contract_address);
        console.log('Contract address value:', data?.[0]?.contract_address);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (data && data.length > 0) {
          const address = data[0].contract_address;
          console.log('Found contract address:', address);
          if (typeof address === 'string' && address.trim().length > 0) {
            setContractAddress(address);
            setError(null);
          } else {
            console.error('Invalid contract address format:', address);
            setError('Invalid contract address format');
          }
        } else {
          console.log('No contract address found in database');
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

    // Subscribe to realtime updates
    console.log('Setting up realtime subscription...');
    const subscription = supabase
      .channel('contract-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contracts',
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          const newContract = payload.new as ContractData;
          if (newContract && newContract.contract_address) {
            console.log('Setting new contract address:', newContract.contract_address);
            setContractAddress(newContract.contract_address);
            setError(null);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up subscription...');
      subscription.unsubscribe();
    };
  }, []);

  // Log state changes
  useEffect(() => {
    console.log('Contract state updated:', { contractAddress, isLoading, error });
  }, [contractAddress, isLoading, error]);

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