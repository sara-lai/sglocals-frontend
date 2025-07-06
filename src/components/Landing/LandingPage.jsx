import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'

import SignUpPage from './SignUp'
import './landing.css'

const LandingPage = (props) => {

  const { isSignedIn } = useUser()
  const navigate = useNavigate()

    return (
      <div className='landing-wrapper'>
          <div className='top-nav'>
            {isSignedIn && <button onClick={() => navigate('/dashboard')}>dashboard</button>}
           </div>
        <div className='landing-box'>
            <h1>I Buy U Buy </h1>
            <h1>Aunties & Uncles</h1>
            <h1>NeighbourLah</h1>
            <SignUpPage />
        </div>
      </div>        
    )

}

export default LandingPage