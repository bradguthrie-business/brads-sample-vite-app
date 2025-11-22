import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { FollowProvider } from './context/FollowContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FollowProvider>
      <App />
    </FollowProvider>
  </StrictMode>
);
