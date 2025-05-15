import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Clock, Coins, Lock, ExternalLink } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">How AnonMixer Works</h1>
        <p className="text-light-400">
          Learn how our cryptocurrency mixing service enhances your transaction privacy.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="mr-2 text-primary-400" /> The Mixing Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-400">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Deposit</h3>
                <p className="text-light-400 text-sm">
                  You deposit your cryptocurrency into the mixing pool. Your funds are combined with those from other users.
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-400">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Mix</h3>
                <p className="text-light-400 text-sm">
                  The funds are split into random amounts and sent through multiple addresses in a series of transactions.
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-400">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Withdraw</h3>
                <p className="text-light-400 text-sm">
                  You receive different coins from the pool at your specified address, breaking the transaction trail.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Eye className="mr-2 text-primary-400" /> Privacy Features
          </h2>
          
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Lock className="w-3 h-3 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">No Transaction Records</h3>
                      <p className="text-sm text-light-400">
                        We don't store information linking deposits with withdrawals, ensuring complete privacy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Time-Delayed Transactions</h3>
                      <p className="text-sm text-light-400">
                        Optional time delays further obfuscate the connection between inputs and outputs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Coins className="w-3 h-3 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multiple Pool Mixing</h3>
                      <p className="text-sm text-light-400">
                        Higher privacy tiers mix through several distinct pools for enhanced anonymity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Shield className="w-3 h-3 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Randomly Split Amounts</h3>
                      <p className="text-sm text-light-400">
                        Funds are divided into irregular amounts to prevent pattern analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
          
          <Card>
            <CardHeader title="Anonymity Levels and Fees" />
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-100">
                      <th className="text-left py-3 px-4">Privacy Level</th>
                      <th className="text-left py-3 px-4">Fee (%)</th>
                      <th className="text-left py-3 px-4">Features</th>
                    </tr>
                  </thead>
                  <tbody className="text-light-300">
                    <tr className="border-b border-dark-100">
                      <td className="py-3 px-4 font-medium">Basic</td>
                      <td className="py-3 px-4">1.2%</td>
                      <td className="py-3 px-4">
                        Single-pass mixing through one pool
                      </td>
                    </tr>
                    <tr className="border-b border-dark-100">
                      <td className="py-3 px-4 font-medium">Enhanced</td>
                      <td className="py-3 px-4">2.5%</td>
                      <td className="py-3 px-4">
                        Dual-pass mixing through different pools
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Maximum</td>
                      <td className="py-3 px-4">4.0%</td>
                      <td className="py-3 px-4">
                        Multi-pass mixing with time delays
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </section>
        
        <section className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Enhance Your Privacy?</h2>
              <p className="text-light-300 mb-6 md:mb-0">
                Try our mixing service with our simple, user-friendly interface.
              </p>
            </div>
            <Link to="/mixer">
              <Button variant="primary" size="lg">
                Start Mixing Now
              </Button>
            </Link>
          </div>
        </section>
        
        <section>
          <div className="text-center py-4">
            <p className="text-light-400 text-sm mb-2">
              ⚠️ This is a demo application for educational purposes only ⚠️
            </p>
            <p className="text-light-400 text-xs">
              No real cryptocurrency is being mixed. Always research privacy tools thoroughly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;