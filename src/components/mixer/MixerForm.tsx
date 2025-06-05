import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { useMixer } from '../../context/MixerContext';
import { useWallet } from '../../context/WalletContext';
import { MixRequest, AnonymityLevel } from '../../types';
import { formatCurrency, calculateFee } from '../../utils/helpers';

const MixerForm: React.FC = () => {
  const { balances } = useWallet();
  const { requestMix, mixInProgress, feeStructure } = useMixer();
  
  const [formData, setFormData] = useState<MixRequest>({
    amount: 0,
    currency: balances[0]?.currency || '',
    recipientAddress: '',
    anonymityLevel: 'basic',
  });
  
  const [errors, setErrors] = useState({
    amount: '',
    recipientAddress: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
    
    // Clear any related errors
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { amount: '', recipientAddress: '' };
    let isValid = true;

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
      isValid = false;
    }

    const selectedCurrency = balances.find(b => b.currency === formData.currency);
    if (selectedCurrency && formData.amount > selectedCurrency.amount) {
      newErrors.amount = `Insufficient ${formData.currency} balance`;
      isValid = false;
    }

    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = 'Recipient address is required';
      isValid = false;
    } else if (!formData.recipientAddress.startsWith('0x') || formData.recipientAddress.length < 10) {
      newErrors.recipientAddress = 'Invalid wallet address format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await requestMix(formData);
    } catch (error) {
      console.error('Mixing error:', error);
    }
  };

  const getSelectedFeePercentage = (): number => {
    const fee = feeStructure.find(f => f.level === formData.anonymityLevel);
    return fee ? fee.percentage : 1.0;
  };

  const calculateOutputAmount = (): number => {
    const fee = calculateFee(formData.amount, getSelectedFeePercentage());
    return formData.amount - fee;
  };

  const selectedCurrency = balances.find(b => b.currency === formData.currency);
  const selectedSymbol = selectedCurrency?.symbol || '';

  return (
    <Card glowing className="max-w-2xl mx-auto">
      <CardHeader 
        title="Mix Cryptocurrency" 
        subtitle="Enhance privacy by mixing your coins" 
      />
      <form onSubmit={handleSubmit}>
        <CardBody>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="currency" className="block text-sm font-medium text-light-300 mb-1">
                  Select Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full bg-dark-200 border border-dark-100 text-light-300 rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  {balances.map(balance => (
                    <option key={balance.currency} value={balance.currency}>
                      {balance.currency} ({balance.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="amount" className="block text-sm font-medium text-light-300 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleInputChange}
                    className="w-full bg-dark-200 border border-dark-100 text-light-300 rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                    step="0.0001"
                    min="0"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-light-400">
                    {selectedSymbol}
                  </div>
                </div>
                {errors.amount && <p className="mt-1 text-sm text-error-500">{errors.amount}</p>}
                <p className="mt-1 text-xs text-light-400">
                  Balance: {selectedCurrency ? formatCurrency(selectedCurrency.amount, selectedSymbol) : '0'}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="recipientAddress" className="block text-sm font-medium text-light-300 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                id="recipientAddress"
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleInputChange}
                placeholder="Input your wallet address"
                className="w-full bg-dark-200 border border-dark-100 text-light-300 rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              {errors.recipientAddress && (
                <p className="mt-1 text-sm text-error-500">{errors.recipientAddress}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light-300 mb-2">
                Anonymity Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {feeStructure.map((level) => (
                  <div
                    key={level.level}
                    className={`relative rounded-lg border ${
                      formData.anonymityLevel === level.level
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-dark-100 bg-dark-200 hover:bg-dark-100'
                    } p-4 cursor-pointer transition-colors`}
                    onClick={() => setFormData(prev => ({ ...prev, anonymityLevel: level.level as AnonymityLevel }))}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-light-200 capitalize">
                          {level.level}
                        </h3>
                        <p className="mt-1 text-xs text-light-400">
                          {level.description}
                        </p>
                      </div>
                      <span className="text-primary-400 font-medium text-sm">
                        {level.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-dark-200 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-light-300">You send:</span>
                <span className="font-medium">
                  {formatCurrency(formData.amount, selectedSymbol)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-light-300">Fee ({getSelectedFeePercentage()}%):</span>
                <span className="text-light-400">
                  -{formatCurrency(calculateFee(formData.amount, getSelectedFeePercentage()), selectedSymbol)}
                </span>
              </div>
              <div className="pt-3 border-t border-dark-100 flex justify-between items-center">
                <span className="text-light-100">Recipient gets:</span>
                <span className="text-primary-400 font-medium">
                  {formatCurrency(calculateOutputAmount(), selectedSymbol)}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="primary" fullWidth isLoading={mixInProgress} rightIcon={mixInProgress ? <Loader2 className="animate-spin" /> : <ArrowRight />}>
            {mixInProgress ? 'Processing' : 'Mix Now'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MixerForm;