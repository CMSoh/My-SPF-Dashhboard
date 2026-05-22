import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe Global error hook to capture cross-origin script issues/Disqus blockers gracefully
if (typeof window !== 'undefined') {
  // Override window.onerror before anything else
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msg = String(message || '');
    const src = String(source || '');
    if (
      msg.includes('Script error.') || 
      msg.includes('disqus') || 
      src.includes('disqus') || 
      !source
    ) {
      console.warn('[Suppressed External Script Error]:', msg, 'from:', src);
      return true; // Prevents the fire of default browser/overlay handlers
    }
    if (originalOnError) {
      return originalOnError.apply(this, [message, source, lineno, colno, error]);
    }
    return false;
  };

  // Capture event capture-phase errors and block subsequent listeners
  window.addEventListener('error', (event) => {
    const message = String(event.message || '');
    const source = String(event.filename || event.error?.stack || '');
    
    if (
      message.includes('Script error.') || 
      message.includes('disqus') || 
      source.includes('disqus') ||
      !event.filename
    ) {
      console.warn('[Interceded and Stopped Third-Party Script Error]:', message);
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (msg.includes('Script error.') || msg.includes('disqus')) {
      console.warn('[Interceded and Stopped Third-Party Promise Rejection]:', msg);
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);

  // Filter console.error to keep the background clean of unresolved external assets
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const argStr = args.map(arg => String(arg || '')).join(' ');
    if (argStr.includes('Script error.') || argStr.includes('disqus') || argStr.includes('Disqus')) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

