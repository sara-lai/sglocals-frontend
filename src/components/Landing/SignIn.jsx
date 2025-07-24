import { Image, Flex, Text, Box } from '@chakra-ui/react';

import { SignIn } from '@clerk/clerk-react'

import './signup.css' 

export default function SignInPage() {
  return (
    <Box className='ok' w='100%' h='100vh'>
      <Flex mt={20} justify='center'>
        <SignIn />
      </Flex>
     
      <Flex justify='start' ml='15%' mt={10}>
        <Flex direction='column' align='center' justify='end'>
          <Image src='/images/tmp-signin.png' maxW='280px' h='200px'/>
          <Text fontSize='1.3rem' fontWeight='500' letterSpacing='-.3px' mt={4}>Come in lah!</Text>
        </Flex>   
      </Flex>

    </Box>   
  )
}