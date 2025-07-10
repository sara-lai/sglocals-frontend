// open question how to build the Content Feed
import {  Avatar,  Box,  Flex, IconButton, HStack  } from '@chakra-ui/react'
import { FiHeart, FiMessageSquare, FiShare } from "react-icons/fi" // Fi vs Fa??
import './dashboard.css'

const ContentFeed = ( { theFeed }) => {
    return (
        <div className='content-feed-container'>
            {theFeed.map(  (post, i) => (
                <Box className='post-card' key={i} mb={4} boxShadow="sm">
                    <div className='post-top-matter'>
                        <Flex direction="row" align="center" gap={2}>
                            <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileimg} name={post.user?.fullName?.[0]} />
                            <div className='post-info-set'>
                                <div className='avatar-name'>{post.user?.fullName}</div>
                                <Flex gap={2}>
                                    <p>{post.user?.neighbourhood}</p>
                                    <p>{post.createdAt}</p>
                                </Flex>
                            </div>
                        </Flex>  
                    </div>                                   
                    <div className='post-content'>
                        {post.content}
                    </div>
                    <div className='post-action-row'>

                            <Flex justifyContent='space-between'>
                                <Flex gap={2}>                         
                                    <Flex className='icon-stat-set' alignItems='center'>
                                        <IconButton icon={<FiHeart />} variant="ghost" size="lg" />
                                        <div className='post-stat'>
                                            1
                                        </div>
                                    </Flex>                            
                                    <Flex className='icon-stat-set' alignItems='center'>
                                        <IconButton icon={<FiMessageSquare />} variant="ghost" size="lg" />
                                        <div className='post-stat'>
                                            3
                                        </div>
                                    </Flex>
                                </Flex>
                                <Flex className='icon-stat-set' alignItems='center'>
                                    <IconButton icon={<FiShare />} variant="ghost" size="lg" />
                                </Flex>
                            </Flex>

                    </div>
                </Box>
            ))}

        </div>
    )
}

export default ContentFeed