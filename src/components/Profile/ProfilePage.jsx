import { useEffect, useState } from 'react'
import { Box, Flex, Button, Avatar, Heading, Text, Icon } from '@chakra-ui/react'
import {  useOutletContext, useNavigate, useParams } from 'react-router'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useAuth } from '@clerk/clerk-react'
import './profile.css'
import ContentFeed from '../Dashboard/ContentFeed'
import * as postService from '../../services/postService'
import * as userService from '../../services/userService'

const ProfilePage = () => {

    // clarification: currentUser is the LOGGED IN USER, selectedUser is the person who's profile you are visiting

    const { currentUser } = useOutletContext()    
    const bannerImgUrl = currentUser.bannerImg || '/images/sg-skyline-sunset3.jpg'
    const { getToken } = useAuth()
    const [userPosts, setUserPosts] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchProfilePageData(){
        const token = await getToken()

        const posts = await postService.getPostsForAnyUser(id, token)
        setUserPosts(posts)

        const userData = await userService.getAnyUser(id, token)
        setSelectedUser(userData)
    }

    useEffect(() => {       
        fetchProfilePageData()
    }, [])

    return (
        <div className='profile-page-wrapper'>
            <Box className='default-border' w='600px' pl={0} pr={0} >
                <Flex direction='column'>
                    <Box h='220px'
                        backgroundImage={bannerImgUrl}
                        backgroundSize="cover"
                        backgroundPosition="15% 15%"                
                    >
                    </Box>
                    <Flex direction='column' pl={6} pr={6}>
                        <Avatar className='avatar-profile-page' size="2xl" src={selectedUser.profileImg} name={selectedUser.fullName?.[0]} />
                        <Heading size='lg' mb={0}>{selectedUser.fullName}</Heading>
                        <Text mt={4} mb={4}>{selectedUser.bio}</Text>
                        <Flex align="center" gap={1}>
                            <Icon as={FaMapMarkerAlt} w={4} h={4} />
                            <Text>{selectedUser.neighbourhood}</Text>
                        </Flex>
                       {currentUser.user_id === id && <Button  w='110px' className='btn-default' mt={5} onClick={() => navigate('/profile/edit')}>
                            Edit Profile
                        </Button>}
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