import { Route, Routes } from 'react-router'

import './App.css'

import Landing from './components/Landing/LandingPage'
import SignInPage from './components/Landing/SignIn'
import SignUpPage from './components/Landing/SignUp'
import AssignNeighborhood from './components/Onboarding/AssignNeighborhood'
import Dashboard from './components/Dashboard/Dashboard'
import Events from './components/Events/Events'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} /> 
      <Route path="/onboarding" element={<AssignNeighborhood />} />
      <Route path="/events" element={<Events />} />

      {/* one approach to protect routes, also ProtectedRoute component approach? , or move this to utils*/}
      <Route path="/dashboard" element={
        <>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn redirectUrl="/sign-in" />
          </SignedOut>
        </>
      }/>

      <Route path="*" element={<h2>Whoops, nothing here!</h2>} /> 
    </Routes>
  )
}

export default App
