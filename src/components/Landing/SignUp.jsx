import { dark } from '@clerk/themes'
import { SignUp } from '@clerk/clerk-react';
import './signup.css'

const SignUpPage = () => {
    return (
        <div className='signup-box'>
            <SignUp
                appearance={{ baseTheme: dark }}            
                routing="path" 
                path="/" 
                afterSignUpUrl={'/onboarding'} 
            />
      </div>
    )
}

export default SignUpPage
