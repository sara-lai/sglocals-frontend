import { useNavigate } from 'react-router'
import { useAuth } from '@clerk/clerk-react'
import { Button } from '@chakra-ui/react'

const SignOut = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }
  return (
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}

export default SignOut