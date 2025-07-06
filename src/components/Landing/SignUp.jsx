import { SignUp } from '@clerk/clerk-react'

import './signup.css' // todo - customise clerk css 

const SignUpPage = () => {
    return (
        <div className='signup-box'>
            <SignUp />
      </div>
    )
}

export default SignUpPage
