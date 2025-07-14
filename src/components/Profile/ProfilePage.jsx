import { useEffect, useState } from 'react'
import { Box, Flex, Button, Avatar, Heading, Text, Icon } from '@chakra-ui/react'
import {  useOutletContext } from 'react-router'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useAuth } from '@clerk/clerk-react'
import './profile.css'
import ContentFeed from '../Dashboard/ContentFeed'
import * as postService from '../../services/postService'

const ProfilePage = () => {
    const { currentUser } = useOutletContext()    
    const bannerImgUrl = currentUser.bannerImg || '/images/sg-skyline-sunset3.jpg'
    const { getToken } = useAuth()
    const [userPosts, setUserPosts] = useState([])

    // profile page is also place where user can see all their stuff, posts, groups, etc
    async function fetchProfilePageData(){
        const token = await getToken()
        const posts = await postService.getPostsForCurrentUser(token)
        setUserPosts(posts)
    }

    useEffect(() => {
        fetchProfilePageData()
    }, [])

    return (
        <div className='profile-page-wrapper'>
            <Box className='default-border' w='600px' pl={0} pr={0} >
                <Flex direction='column'>
                    <Box className='blah'
                        h='220px'
                        backgroundImage={bannerImgUrl}
                        backgroundSize="cover"
                        backgroundPosition="15% 15%"                
                    >
                    </Box>
                    <Flex direction='column' pl={6}>
                        <Avatar className='avatar-profile-page' size="2xl" src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                        <Heading size='lg' mb={0}>{currentUser.fullName}</Heading>
                        <Text>{currentUser.bio}</Text>
                        <Flex align="center" gap={1}>
                            <Icon as={FaMapMarkerAlt} w={4} h={4} />
                            <Text>{currentUser.neighbourhood}</Text>
                        </Flex>
                        <Button  w='110px' className='btn-default' mt={5}>Edit Profile</Button>
                    </Flex>
                </Flex>
            </Box>
            <Box mt={10} ml={-5}  maxWidth='640px'>
                <Heading ml={6} size='md'>Posts</Heading>
                <ContentFeed theFeed={userPosts} setContentFeed={setUserPosts} currentUser={currentUser} />
            </Box>

        </div>
    )
}

export default ProfilePage