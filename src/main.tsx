import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Filter out environmental/extension-injected errors that are unrelated to the app's functionality
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || '';
  if (message.includes('MetaMask') || message.includes('ethereum')) {
    event.preventDefault();
    console.warn('Suppressed environmental extension error:', message);
  }
});

createRoot(document.getElementById('root')!).render(<App />);
