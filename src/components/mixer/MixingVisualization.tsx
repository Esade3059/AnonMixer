import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useMixer } from '../../context/MixerContext';
import { ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const MixingVisualization: React.FC = () => {
  const { currentMixTransaction, mixInProgress, mixingComplete, resetMixingState } = useMixer();
  const [coins, setCoins] = useState<number[]>([]);
  const [mixedCoins, setMixedCoins] = useState<number[]>([]);

  useEffect(() => {
    if (mixInProgress && !mixingComplete) {
      // Create initial coins
      const coinCount = Math.max(3, Math.min(20, Math.floor((currentMixTransaction?.amount || 1) * 5)));
      setCoins(Array.from({ length: coinCount }, (_, i) => i));
      setMixedCoins([]);
    }
  }, [mixInProgress, mixingComplete, currentMixTransaction]);

  useEffect(() => {
    if (mixInProgress && !mixingComplete && coins.length > 0) {
      // Start mixing animation
      const totalDuration = 
        currentMixTransaction?.anonymityScore === 95 ? 15000 : 
        currentMixTransaction?.anonymityScore === 85 ? 10000 : 6000;
      
      const interval = setInterval(() => {
        if (coins.length > 0) {
          const coin = coins[0];
          setCoins(prev => prev.slice(1));
          setMixedCoins(prev => [...prev, coin]);
        }
      }, totalDuration / coins.length);
      
      return () => clearInterval(interval);
    }
  }, [mixInProgress, mixingComplete, coins, currentMixTransaction]);

  if (!mixInProgress && !mixingComplete) {
    return null;
  }

  const renderCoinPath = (index: number, isExit: boolean = false) => {
    // Create random bezier curves for mixing visualization
    const startX = index % 2 === 0 ? -30 : 130;
    const startY = 50 + (index % 3) * 20;
    
    const exitX = (index % 2 === 0 ? 130 : -30);
    const exitY = 40 + (index % 4) * 15;
    
    // Control points for the bezier curve
    const cp1x = 20 + (index % 5) * 12;
    const cp1y = 10 + (index % 3) * 25;
    const cp2x = 80 - (index % 5) * 10;
    const cp2y = 70 - (index % 4) * 15;
    
    return isExit
      ? `M 50 50 C ${cp2x} ${cp2y}, ${cp1x} ${cp1y}, ${exitX} ${exitY}`
      : `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, 50 50`;
  };

  return (
    <Card glowing className="mt-8 max-w-2xl mx-auto">
      <CardHeader 
        title={mixingComplete ? "Mixing Complete" : "Mixing in Progress"} 
        subtitle={
          mixingComplete 
            ? "Your transaction has been successfully anonymized" 
            : "Your cryptocurrency is being mixed through multiple addresses"
        }
        icon={mixingComplete ? <CheckCircle2 className="text-success-500" /> : <RefreshCw className="animate-spin" />}
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="w-full h-60 relative bg-dark-400 rounded-lg mb-4 overflow-hidden">
            {/* Central mixing pool */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-dark-300 border-2 border-primary-500/30 flex items-center justify-center green-glow">
              <div className="animate-pulse-slow w-16 h-16 rounded-full bg-gradient-radial from-primary-400/40 to-transparent"></div>
              <div className="absolute w-full h-full rounded-full border border-primary-400/20 animate-pulse"></div>
            </div>
            
            {/* Input coins */}
            {coins.map((coin, index) => (
              <motion.div
                key={`coin-in-${coin}`}
                className="absolute w-3 h-3 rounded-full bg-primary-400 shadow-lg"
                initial={{ 
                  x: index % 2 === 0 ? -30 : 130, 
                  y: 50 + (index % 3) * 20 
                }}
                animate={{ 
                  x: 50, 
                  y: 50 
                }}
                transition={{ 
                  duration: 1 + (index % 3), 
                  delay: index * 0.2, 
                  ease: "easeInOut" 
                }}
                style={{ left: '50%', top: '50%', marginLeft: '-1.5px', marginTop: '-1.5px' }}
              />
            ))}
            
            {/* Output coins */}
            {mixedCoins.map((coin, index) => (
              <motion.div
                key={`coin-out-${coin}`}
                className="absolute w-3 h-3 rounded-full bg-secondary-400 shadow-lg"
                initial={{ x: 50, y: 50 }}
                animate={{ 
                  x: (index % 2 === 0 ? 130 : -30), 
                  y: 40 + (index % 4) * 15 
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5, 
                  ease: "easeInOut" 
                }}
                style={{ left: '50%', top: '50%', marginLeft: '-1.5px', marginTop: '-1.5px' }}
              />
            ))}
            
            {/* Transaction details */}
            <div className="absolute bottom-3 left-3 text-xs font-mono bg-dark-300/80 p-2 rounded">
              <p className="text-light-400">
                ID: <span className="text-primary-400">{currentMixTransaction?.id.substring(0, 8)}...</span>
              </p>
              <p className="text-light-400">
                <span className="text-secondary-400">
                  {mixingComplete 
                    ? 'Anonymity Score: ' + currentMixTransaction?.anonymityScore 
                    : 'Mixing...'}
                </span>
              </p>
            </div>
            
            {/* Connecting lines for coins */}
            <svg width="100%" height="100%" className="absolute top-0 left-0 z-0">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(51, 255, 106, 0.2)" />
                  <stop offset="50%" stopColor="rgba(51, 255, 106, 0.5)" />
                  <stop offset="100%" stopColor="rgba(51, 255, 106, 0.2)" />
                </linearGradient>
              </defs>
              
              {/* Input paths */}
              {coins.map((coin, index) => (
                <path
                  key={`path-in-${coin}`}
                  d={renderCoinPath(index)}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="3,2"
                  className="animate-pulse-slow"
                />
              ))}
              
              {/* Output paths */}
              {mixedCoins.map((coin, index) => (
                <path
                  key={`path-out-${coin}`}
                  d={renderCoinPath(index, true)}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="3,2"
                  className="animate-pulse-slow"
                />
              ))}
            </svg>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full bg-dark-200 p-4 rounded-lg">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center">
                <span className="text-xs font-mono">FROM</span>
              </div>
              <ArrowRight className="mx-2 text-light-400" />
              <div className="w-10 h-10 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                <span className="text-xs font-mono">MIX</span>
              </div>
              <ArrowRight className="mx-2 text-light-400" />
              <div className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center">
                <span className="text-xs font-mono">TO</span>
              </div>
            </div>
            
            {mixingComplete && (
              <Button variant="outline" onClick={resetMixingState}>
                New Mix
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MixingVisualization;