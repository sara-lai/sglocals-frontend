
import { Route, Routes } from 'react-router'

import './App.css'

import Landing from './components/Landing/LandingPage'
import SignInPage from './components/Landing/SignIn'
import SignUpPage from './components/Landing/SignUp'
import Onboarding from './components/Onboarding/Onboarding'
import Dashboard from './components/Dashboard/Dashboard'
import Layout from './components/Layout'
import ProfilePage from './components/Profile/ProfilePage'
import EditProfile from './components/Profile/EditProfile'
import ViewListing from './components/MarketPlace/ViewListing'
import Events from './components/Events/EventTab'
import DMPage from './components/DMs/DMPage'
import GroupsPage from './components/Groups/AllGroupsPage'
import ViewGroup from './components/Groups/ViewGroup'
import SearchPage from './components/Search/SearchPage'
import MarketPlace from './components/MarketPlace/MarketPlace'

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Mark } from '@chakra-ui/react'


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} /> 
      <Route path="/onboarding" element={<Onboarding />} />
    
      <Route element={<Layout />}>
        <Route path="/events" element={<Events />} />      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/listing/:id" element={<ViewListing />} />
        <Route path="/dms" element={<DMPage />} />
        <Route path= "/groups" element={<GroupsPage />} />
        <Route path= "/groups/:id" element={<ViewGroup />} />
        <Route path= "/search" element={<SearchPage />} />
      </Route>

      {/* one approach to protect routes, also ProtectedRoute component approach? , or move this to utils*/}
      {/*  <Route path="/dashboard" element={
        <>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn redirectUrl="/sign-in" />
          </SignedOut>
          <MarketPlace />
        </>
      }/> */}

      <Route path="*" element={<h2>Whoops, nothing here!</h2>} /> 
    </Routes>
  )
}

export default App