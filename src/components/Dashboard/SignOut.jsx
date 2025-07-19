import { Flex, Text } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
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
    <Flex as="button" onClick={handleSignOut} gap={2} alignItems='center' mt={4} >
      {/* <FaSignOutAlt size={20} /> */}
      <FiLogOut className='fi-icon-thicken' color="gray.700" size="1.5rem" />
      <Text>Sign Out</Text>
    </Flex>
  )
}

export default SignOut