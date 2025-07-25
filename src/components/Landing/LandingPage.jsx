import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { Button } from '@chakra-ui/react'

import SignUpPage from './SignUp'
import './Landing.css'

const LandingPage = (props) => {

  const { isSignedIn } = useUser()
  const navigate = useNavigate()

    return (
      <div className='landing-wrapper'>
          <div className='top-nav'>
            <div className='logo-top-nav'>
              <img src='/images/flowers1.png' />
              <span>Kampong Lah</span>              
            </div>
            <div className='button-row'>
                <p>Organizations & Agencies</p>
                <p>SG Businesses</p>
                <Button onClick={() => navigate('/sign-in')}>Log in</Button>
                <Button bg="gray.800" color="white" onClick={() => navigate('/sign-up')}>Sign up</Button>
            </div>
            {isSignedIn && <Button onClick={() => navigate('/dashboard')}>dashboard</Button>}
           </div>
        <div className='landing-box'>
            <SignUpPage />
        </div>
      </div>        
    )

}

export default LandingPage