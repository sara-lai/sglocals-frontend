import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

// Chakra v3 w/ Vite: https://www.chakra-ui.com/docs/get-started/frameworks/vite
import { Provider } from "./components/ui/provider"

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
