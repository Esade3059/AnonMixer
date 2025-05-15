import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Twitter } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const { connected, walletAddress, disconnect, connect } = useWallet();

  useEffect(() => {
    if (connected && !localStorage.getItem('demoNoticeShown')) {
      setShowDemoNotice(true);
      localStorage.setItem('demoNoticeShown', 'true');
    }
  }, [connected]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-30 bg-dark-400/80 backdrop-blur-md border-b border-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://i.imgur.com/L3zelt9.jpeg" alt="AnonMixer" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-light-100">AnonMixer</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://x.com/TheAnonMixer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-light-300 hover:text-light-100 transition-colors"
            >
              <Twitter size={20} />
              <span>Follow us</span>
            </a>
            {connected ? (
              <>
                <div className="px-3 py-1.5 rounded-lg bg-dark-300 text-light-400 font-mono text-sm">
                  {walletAddress}
                </div>
                <Button onClick={disconnect} variant="outline" size="sm">
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={connect} variant="primary" size="sm">
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-light-300 hover:text-light-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-300 p-4 border-b border-dark-200">
          <div className="flex flex-col space-y-3">
            <a
              href="https://x.com/TheAnonMixer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-light-300 hover:text-light-100 transition-colors"
            >
              <Twitter size={20} />
              <span>Follow us</span>
            </a>
            {connected ? (
              <>
                <div className="px-3 py-2 rounded-lg bg-dark-200 text-light-400 font-mono text-sm overflow-hidden text-ellipsis">
                  {walletAddress}
                </div>
                <Button onClick={disconnect} variant="outline" fullWidth>
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={connect} variant="primary" fullWidth>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Demo Notice Modal */}
      {showDemoNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-300 p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Welcome to AnonMixer!</h3>
            <p className="mb-4">
              We've credited your wallet with $100 worth of various cryptocurrencies to test our mixing service.
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowDemoNotice(false)}
            >
              Start Mixing
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;