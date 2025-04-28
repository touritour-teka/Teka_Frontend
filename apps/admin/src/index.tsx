import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from '@teka/design-system';
import { OverlayProvider } from '@toss/use-overlay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <GlobalStyle />
        <App />
      </OverlayProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
