import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WalletProvider } from './context/WalletContext';
import { MixerProvider } from './context/MixerContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <MixerProvider>
          <App />
        </MixerProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);