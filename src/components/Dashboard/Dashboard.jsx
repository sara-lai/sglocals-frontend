import {  useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import { Flex, Box, Text, Link  } from '@chakra-ui/react';
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
            <Flex maxW="1000px" h="100%">
                <Box flex="0 0 70%" > 
                    <NewPost userInfo={currentUser} addTopOfFeed={addTopOfFeed} />

                    <ContentFeed theFeed={contentFeed} setContentFeed={setContentFeed} currentUser={currentUser} />

                </Box>
                <Box className="side-content" flex="0 0 30%" h="100%" overflowY="auto" position="sticky" top={0} ml={4}>                    
                    <Box className='default-border' p={0} mt={2} ml={2} maxW="256px">
                        <Link href='https://www.demo-sgknowledge.com/' _hover={{ textDecoration: 'none', color: 'black' }}>
                            <img src='/images/sample-sponsor1.png' className='sponsor-img' />
                            <Text textAlign='center' mt={4} mb={2} textDecoration="none" fontWeight='200'>
                                Win a staycation at:
                            </Text>
                            <img src='/images/sample-sponsor2.png' className='sponsor-img'/>
                        </Link>
                    </Box>
                    <img src='/images/sample-sponsor-3.png' />
                </Box>
            </Flex> 
        </div>
    )
}

export default Dashboard