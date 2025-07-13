import { useEffect, useState } from 'react'
import { Flex, Box, Text  } from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react'
import './dashboard.css'
import '../Onboarding/onboarding.css'
import ProfilePicMenu from './ProfilePicMenu'
import NewPost from './NewPost'
import ContentFeed from './ContentFeed'

import * as userService from '../../services/userService'
import * as postService from '../../services/postService'

const Dashboard = () => {

     const { getToken } = useAuth()
     const [currentUser, setCurrentUser] = useState({})
     const [contentFeed, setContentFeed] = useState([])

    async function loadDataForDashboard() {
        const token = await getToken()

        // current user related
        const user = await userService.getCurrentUser(token)
        console.log('the current user on dashboard', user)
        setCurrentUser(user)

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
            <div className='upper-right-profile-misc'>               
                <ProfilePicMenu currentUser={currentUser} />  
            </div>
            <Flex maxW="1600px" mx="auto" minH="80vh" gap={4}>
                <Box flex="0 0 20%" bg="white" p={4} borderRadius="md" boxShadow="md">
                <div className='side-navbar'>
                    <div className='logo-side-nav'>
                        <img src='/images/flowers1.png' />
                        <span>Kampong Lah</span>              
                    </div>    
                    <div className='side-links'>
                        <p>Home</p>
                        <p>I Buy U Buy</p>
                        <p>Groups</p>
                        <p>Events</p>
                        <p>Chats</p>
                        <p>+ Post</p>
                    </div>
                    <Text>E.g.:</Text>
                    <img  style={{ width: '200px'}} src='/images/nd-sidebar.png' />
                </div>
                </Box>
                <Box flex="0 0 80%" bg="white" p={4} >
                    <Flex maxW="1000px"  minH="80vh" gap={4}>
                        <Box flex="0 0 70%"  bg="white" p={4}  borderRadius="md" > 
                            <img style={{ maxHeight: '80px'}} src='/images/nd-search-bar.png' />

                            <NewPost userInfo={currentUser} addTopOfFeed={addTopOfFeed} />

                            <ContentFeed theFeed={contentFeed} setContentFeed={setContentFeed} currentUser={currentUser} />

                        </Box>
                        <Box className="side-content" flex="0 0 30%"  bg="white" p={4} borderRadius="md" boxShadow="md">
                            <Text>Misc Side panel</Text>
                            <img src='/images/nd-content2.png' />
                        </Box>
                    </Flex>
                </Box>
            </Flex>


        </div>
    )
}

export default Dashboard