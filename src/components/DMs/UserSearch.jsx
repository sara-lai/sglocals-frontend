import { useState } from "react"
import { Flex, Box, Heading, Input, InputGroup, InputLeftElement, Avatar, Text } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import Fuse from 'fuse.js'

const UserSearch = ({ users, createNewChat }) => {      
    const [query, setQuery] = useState('')
    const fuse = new Fuse(users, { keys: ['fullName'], threshold: 0.3 })

    // todo - a way to filter out users where already a chat
    // BUT in a way where this component cna be used by groups/events

    let results = [] // or set it to all users as the default!
    if (query) {
        results = fuse.search(query).map(({ item }) => item) // see Fuse docs ( the map destructures results)
    }
    
    return (
        <>
            <InputGroup size="lg" mb={4} >
                <InputLeftElement pointerEvents="none" fontSize='1.5rem'>
                    <SearchIcon color="gray.700" />
                </InputLeftElement>
                <Input placeholder="Search for a user" value={query} borderRadius='30px' borderColor="gray.300" onChange={ (e) => setQuery(e.target.value) } />
            </InputGroup> 

            <Flex direction='column' gap={3} h="400px" overflowY="auto" mt={6}>
                {results.map(user => (
                    <Box m={2} cursor='pointer' onClick={() => createNewChat(user.user_id)}>
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
        </>
    )
}

export default UserSearch