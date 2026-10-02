import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Filter out environmental/extension-injected errors that are unrelated to the app's functionality
const isWeb3Error = (msg: string) => 
  msg.includes('MetaMask') || 
  msg.includes('ethereum') || 
  msg.includes('web3') || 
  msg.includes('provider');

window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || String(event.reason);
  if (isWeb3Error(message)) {
    event.preventDefault();
    console.warn('Suppressed environmental extension rejection:', message);
  }
});

window.onerror = (message, source, lineno, colno, error) => {
  const msg = String(message);
  if (isWeb3Error(msg)) {
    console.warn('Suppressed environmental extension error:', msg);
    return true; // prevent error from bubbling
  }
  return false;
};

createRoot(document.getElementById('root')!).render(<App />);
