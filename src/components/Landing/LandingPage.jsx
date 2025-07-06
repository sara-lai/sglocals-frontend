import './landing.css'

import SignUpPage from './SignUp'

const LandingPage = (props) => {

    return (
      <div className='landing-wrapper'>
        <div className='landing-box'>
            <h1>I Buy U Buy </h1>
            <h1>Aunties & Uncles</h1>
            <h1>SG Neighbhours</h1>
            <SignUpPage />
        </div>
      </div>        
    )

}

export default LandingPage