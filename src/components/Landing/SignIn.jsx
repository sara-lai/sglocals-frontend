import { SignIn } from '@clerk/clerk-react'

import './signup.css' 

export default function SignInPage() {
  return (
    <div>
      <div className='signup-box'>
        <SignIn />
      </div>
    </div>
  )
}