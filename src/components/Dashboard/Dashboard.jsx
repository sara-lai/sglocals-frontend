import { Flex, Box, Text  } from '@chakra-ui/react';
import SignOut from "./SignOut"
import './dashboard.css'
import '../Onboarding/onboarding.css'

const Dashboard = () => {

    return (
        <div className='dashboard-container'> 
            <div className='upper-right-profile-misc'>
                <span>Edit profile</span>
                <SignOut />                
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
                        <Box className="content-feed" flex="0 0 70%"  bg="white" p={4}  borderRadius="md" boxShadow="md">
                             <Text>Search Bar</Text>      
                            <img style={{ maxHeight: '80px'}} src='/images/nd-search-bar.png' />
                             <Text>New Post +</Text>        
                            <img style={{ maxHeight: '80px'}} src='/images/nd-new-post.png' />  
                            <Text>Content Feed</Text>                                                                
                            <img src='/images/nd-content1.png' />
                        </Box>
                        <Box className="side-content" flex="0 0 30%"  bg="white" borderRadius="md" boxShadow="md"  p={4}>
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