import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

// Chakra v3 w/ Vite: https://www.chakra-ui.com/docs/get-started/frameworks/vite
//import { Provider } from "./components/ui/provider"

// Chakra v2 for now
import { ChakraProvider } from '@chakra-ui/react';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} 
      afterSignOutUrl='/'
      signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL}
      signInForceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL}
      signInFallbackRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL}
      signUpForceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL}
      signUpFallbackRedirectUrl={import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL}      
    >
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
