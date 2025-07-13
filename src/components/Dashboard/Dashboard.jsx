import {  useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import { Flex, Box, Text  } from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react'
import './dashboard.css'
import '../Onboarding/onboarding.css'
import NewPost from './NewPost'
import ContentFeed from './ContentFeed'

import * as postService from '../../services/postService'

const Dashboard = () => {
    const { currentUser } = useOutletContext()    
     const { getToken } = useAuth()
     const [contentFeed, setContentFeed] = useState([])

    async function loadDataForDashboard() {
        const token = await getToken()

        // content feed related- -  will take a bunch of time - have to figure out what to put contnet feed
        const posts = await postService.getPostsForNeighbourhood(token)
        console.log('retreived posts', posts)
        setContentFeed(posts)

    }
    useEffect( () => {
        loadDataForDashboard()
    }, [] )

    function addTopOfFeed(newPost){
        // todo need to set at top of feed
        // sort by date instead?
        setContentFeed([newPost, ...contentFeed])
    }

    return (
        <div className='dashboard-container'> 
            <Flex maxW="1000px"  minH="80vh" gap={4}>
                <Box flex="0 0 70%"  bg="white" p={4}  borderRadius="md" > 
                    <img style={{ maxHeight: '80px'}} src='/images/nd-search-bar.png' />

                    <NewPost userInfo={currentUser} addTopOfFeed={addTopOfFeed} />

                    <ContentFeed theFeed={contentFeed} />

                </Box>
                <Box className="side-content" flex="0 0 30%"  bg="white" p={4} borderRadius="md" boxShadow="md">
                    <Text>Misc Side panel</Text>
                    <img src='/images/nd-content2.png' />
                </Box>
            </Flex> 
        </div>
    )
}

export default Dashboard