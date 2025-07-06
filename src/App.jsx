import { Route, Routes } from 'react-router'

import './App.css'

import Landing from './components/Landing/LandingPage'
import AssignNeighborhood from './components/Onboarding/AssignNeighborhood'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<AssignNeighborhood />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h2>Whoops, nothing here!</h2>} /> 
    </Routes>
  )
}

export default App
