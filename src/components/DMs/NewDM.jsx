import { useState, useEffect } from "react"
import { Flex, Box, Heading } from "@chakra-ui/react"
import { useAuth } from '@clerk/clerk-react'
import *  as userService from '../../services/userService'
import UserSearch from "./UserSearch"

// Approach of this component: 
// the UserSearch feature was made own component to make Fuse search easier 
// This component basically just fetches data and passes it down

const NewDM = () => {
    const [usersData, setUsersData] = useState([])
    const { getToken } = useAuth()

    async function getAvailableUsers() {
        const token = await getToken()
        const users = await userService.getAvailableUsers(token)
        setUsersData(users)
    }

    useEffect(() => {
        getAvailableUsers()
    }, [])

    return (
        <Box>
            <Heading size='md' mb={3.5}>Create a chat</Heading>
            <UserSearch users={usersData} />
        </Box>
    )
}

export default NewDM