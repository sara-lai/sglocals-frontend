import { useState, useEffect } from "react"
import { Flex, Box, Heading, Input, InputGroup, InputLeftElement, Avatar, Text } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useAuth } from '@clerk/clerk-react'
import *  as userService from '../../services/userService'
import Fuse from 'fuse.js'

const NewDM = () => {
    const [query, setQuery] = useState('')
    const [userResults, setUserResults] = useState([])
    const [userData, setUserData] = useState([])
    const { getToken } = useAuth()

    async function getAvailableUsers() {
        const token = await getToken()
        const availUsers = await userService.getAvailableUsers(token)
        setUserData(users)
    }

    useEffect(() => {
        getAvailableUsers()
    }, [])

    return (
        <Box>
            <Heading size='md' mb={3.5}>Create a chat</Heading>

            <InputGroup size="lg" mb={4} >
                <InputLeftElement pointerEvents="none" fontSize='1.5rem'>
                    <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input placeholder="Search for a user" value={query} onChange={ (e) => setQuery(e.target.value) } />
            </InputGroup> 

            <Flex direction='column' gap={3} h="400px" overflowY="auto" mt={6}>
                {userResults.map(user => (
                    <Box m={2} cursor='pointer'>
                        <Flex gap={2}>
                            <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={user.profileImg} name={user.fullName?.[0]} />
                            <Flex direction='column' >
                                <Text fontWeight='600' fontSize='1.1rem'>{user.fullName}</Text>
                                <Text color='#576580' fontWeight='500'>{user.neighbourhood}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                ) )}
             </Flex>
        </Box>
    )
}

export default NewDM