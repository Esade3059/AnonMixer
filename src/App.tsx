import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MixerPage from './pages/MixerPage';
import TransactionHistory from './pages/TransactionHistory';
import WalletPage from './pages/WalletPage';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="mixer" element={<MixerPage />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;