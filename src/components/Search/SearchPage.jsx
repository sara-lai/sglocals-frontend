// brainstoriming: 
// gets 'itemType' (group, neighbour, post, marketplace, event) & 'query' from search bar
// copy/combine the data fetching/useEffects from the other component
// copy/combine the 'summary' UI pieces for each type here

import { useState, useEffect } from "react"
import { Flex, Box, Heading, Input, InputGroup, InputLeftElement, Avatar, Text } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import { useAuth } from '@clerk/clerk-react'
import Fuse from 'fuse.js'

import PostSummary from '../Dashboard/PostSummary'

const SearchPage = ({ itemType, query }) => {
    const { getToken } = useAuth()
    const [allUsers, setAllUsers] = useState([])
    const [allGroups, setAllGroups] = useState([])
    const [allPosts, setAllPosts] = useState([]) // excludes posts from groups
    const [allEvents, setAllEvents] = useState([]) 
    const [allListings, setAllListings] = useState([])

async function fetchAllDataForSearch(){
    const token = await getToken()

    // neighbours
    const users = await userService.getAvailableUsers(token)
    setAllUsers(users)

    // groups
    const nearbyGroups = await groupService.getNearbyGroups(token)
    setAllGroups(nearbyGroups)

    // posts 
    const posts = await postService.getPostsForNeighbourhood(token)
    setAllPosts(posts)
}

    useEffect(() => {
        fetchAllDataForSearch() 
    })

    return (
        <Flex justify='start' align='center' h='100%'>
            <Text ml='35%'>I truly ran out of time :(</Text>
        </Flex>
    )
}

export default SearchPage 