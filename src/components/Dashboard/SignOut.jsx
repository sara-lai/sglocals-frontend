import { useNavigate } from 'react-router'
import { useAuth } from '@clerk/clerk-react'

const SignOut = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }
  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}

export default SignOut