import { useState } from "react"
import { Box, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

const NewDM = () => {
    const [query, setQuery] = useState('')

    return (
        <Box>
            <Heading size='md' mb={3.5}>Create a chat</Heading>

            <InputGroup size="lg" mb={4} >
                <InputLeftElement pointerEvents="none" fontSize='1.5rem'>
                    <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input placeholder="Search for a user" value={query} onChange={ (e) => setQuery(e.target.value) } />
            </InputGroup>            
        </Box>
    )
}

export default NewDM