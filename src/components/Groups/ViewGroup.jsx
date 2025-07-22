// can be your created group, or you can just be a member, or you can just be a guest (diff UI)
import {  useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '@clerk/clerk-react'
import { Box, Flex, Button, Heading, Text, Icon, IconButton, Image, Avatar, Input } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FiTrash } from "react-icons/fi"

// group conversations, re-using work for posts
import NewGroupPost from './NewGroupPost'
import ContentFeed from '../Dashboard/ContentFeed'

import '../Profile/profile.css' // tmp
import './groups.css'

import * as groupService from '../../services/groupService'

const ViewGroup = () => {
    const { currentUser } = useOutletContext()    
    const { id } = useParams()
    const { getToken } = useAuth()
    const [group, setGroup] = useState({})
    const [notice, setNotice] = useState(true)
    const [groupPosts, setGroupPosts] = useState([])

    function deleteGroup(){
        console.log('deleting todo')
    }

    async function joinGroup(){
        const token = await getToken()
        const updatedGroup = await groupService.joinGroup(id, token)
        setGroup(updatedGroup)
    }

    function isCurrentUserAdmin(){
        if (Object.keys(group).length === 0 ) return false // oh dear

        return group.admin_ids.includes(currentUser.user_id)
    }

    function isCurrentUserMember(){
         if (Object.keys(group).length === 0 ) return false

        return group.member_ids.includes(currentUser.user_id)
    }

    function addTopOfFeed(newPost){
        console.log('top of content feed', newPost)
        setGroupPosts([newPost, ...groupPosts])
    }

    async function fetchGroupData(){
        const token = await getToken()

        // get the group from params
        const group = await groupService.getGroup(id, token)
        setGroup(group)

        // fetch posts for group
        if (group.post_ids){
            const posts = await groupService.getGroupPosts(id, token)
            setGroupPosts(posts)  
        }
    }    
    useEffect(() => {       
        fetchGroupData()
    }, [])  
    
    return (
        <Box ml='14%' w='600px' mb={10}>
            <Box className='default-border' p={0} >
                <Flex direction='column'>
                    <Box h='300px'
                        backgroundImage={group.bannerImg}
                        backgroundSize="cover"
                        backgroundPosition="15% 15%"    
                        borderRadius='14px 14px 0 0'            
                    >
                    </Box>
                    <Flex direction='column' p={6}>
                        <Heading size='lg' mb={2}>{group.name}</Heading>
                        <Text mb={3} letterSpacing='-.3px' maxW='500px' pl={2} lineHeight='1.2rem'>{group.description}</Text>
                        <Flex align="center" gap={1} mb={6}>
                            <Icon as={FaMapMarkerAlt} w={4} h={4} />
                            <Text>{group.neighbourhood}</Text>
                        </Flex>
                        <Flex justify='space-between' align='center'>
                            {isCurrentUserMember() &&
                                <Button className='btn-default' onClick={() => console.log('todo launch UserSearch')}>Invite</Button>
                            }
                            {!isCurrentUserMember() &&
                                <Button className='btn-default' onClick={joinGroup}>Join</Button>
                            }                            
                            <Box>
                                <Flex align='center'>
                                    <Text fontWeight='500' fontSize='1rem' color='#576580' letterSpacing='-.5px' cursor='pointer'>
                                        {group.member_ids?.length} members
                                    </Text>
                                    {isCurrentUserAdmin() && ( 
                                        <Flex className='icon-stat-set' alignItems='center' onClick={() => deleteGroup(group._id) }>
                                            <IconButton icon={<FiTrash />} variant="ghost" size="lg" />
                                        </Flex>
                                    )}
                                </Flex>
                            </Box>                            
                        </Flex>                                          
                    </Flex>
                </Flex>
            </Box>

            {notice && 
                <Box mt={4} cursor='pointer' onClick={()=> setNotice(false)}>
                    <Image src='/images/tmp-group-guidelines.png' />
                </Box>
            }

            {/* re using dashboard post features ! */}
            {isCurrentUserMember() && 
                <NewGroupPost currentUser={currentUser} addTopOfFeed={addTopOfFeed} group={group} /> 
            }
            {groupPosts.length > 0 &&
                <Box mt={16}>
                    <ContentFeed theFeed={groupPosts} setContentFeed={setGroupPosts} currentUser={currentUser} addTopOfFeed={addTopOfFeed} />            
                </Box>
            }
            
            {groupPosts.length === 0 &&
                <Flex mt={10} justify='center'>
                    <Image w='360px' src='/images/tmp-group-convo-empty.png' />
                </Flex>      
            }            
        </Box>
    )
}

export default ViewGroup