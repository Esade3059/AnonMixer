import React from 'react';
import { ArrowRight, Droplets, Users, Timer, ShieldCheck } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../ui/Card';
import { useMixer } from '../../context/MixerContext';
import { formatCurrency } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PoolStats: React.FC = () => {
  const { pools } = useMixer();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {pools.map(pool => (
        <Card key={pool.id} className="h-full">
          <CardHeader 
            title={pool.name} 
            subtitle={`Pool Statistics`}
            action={
              <Link to="/mixer">
                <Button size="sm" variant="outline" rightIcon={<ArrowRight size={16} />}>
                  Mix
                </Button>
              </Link>
            }
          />
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 bg-dark-200 p-3 rounded-lg">
                <Droplets className="text-primary-400" size={18} />
                <div>
                  <p className="text-xs text-light-400">Liquidity</p>
                  <p className="font-medium">{formatCurrency(pool.liquidity, pool.currency.substring(0, 3).toUpperCase())}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-dark-200 p-3 rounded-lg">
                <Users className="text-primary-400" size={18} />
                <div>
                  <p className="text-xs text-light-400">Participants</p>
                  <p className="font-medium">{pool.participantsCount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-dark-200 p-3 rounded-lg">
                <ShieldCheck className="text-primary-400" size={18} />
                <div>
                  <p className="text-xs text-light-400">Anonymity Score</p>
                  <p className="font-medium">{pool.anonymityScore}/100</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-dark-200 p-3 rounded-lg">
                <Timer className="text-primary-400" size={18} />
                <div>
                  <p className="text-xs text-light-400">Processing Time</p>
                  <p className="font-medium">{pool.processingTime.min}-{pool.processingTime.max} min</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-dark-200 rounded-lg">
              <div className="flex justify-between">
                <span className="text-light-400">Fee</span>
                <span className="font-medium text-primary-300">{pool.fee}%</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-light-400">Limits</span>
                <span className="font-medium">
                  {pool.minAmount} - {pool.maxAmount} {pool.currency.substring(0, 3).toUpperCase()}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PoolStats;