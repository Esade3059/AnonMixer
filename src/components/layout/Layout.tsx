import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ParticleBackground from '../ui/ParticleBackground';
import { useWallet } from '../../context/WalletContext';
import ConnectWalletPrompt from '../wallet/ConnectWalletPrompt';

const Layout: React.FC = () => {
  const { connected } = useWallet();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark-300 via-dark-400 to-dark-300 text-light-300">
      <ParticleBackground />
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-12 max-w-7xl mx-auto w-full">
          {connected ? <Outlet /> : <ConnectWalletPrompt />}
        </main>
      </div>
      <footer className="text-center py-4 text-light-300/60 text-sm border-t border-dark-100">
        <div className="flex items-center justify-center gap-4">
          <p>© 2025 AnonMixer</p>
          <a
            href="https://x.com/TheAnonMixer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-300/60 hover:text-light-100 transition-colors"
          >
            Follow us on X
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;