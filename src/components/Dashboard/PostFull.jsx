import {  Avatar,  Box,  Flex, IconButton, Divider  } from '@chakra-ui/react'
import { FiHeart, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import './dashboard.css'

const PostFull = ({ post, timeAgoFormat, updateLikes, currentUser }) => {

    return (
        <>
            <Box p={4}>
                <Flex direction="row" align="center" gap={1}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileimg} name={post.user?.fullName?.[0]} />
                    <div className='post-info-set'>
                        <div className='avatar-name'>{post.user?.fullName}</div>
                        <Flex gap={2}>
                            <p>{post.user?.neighbourhood}</p>
                            <p>{timeAgoFormat(post.createdAt)}</p>
                        </Flex>
                    </div>
                </Flex>                              
                <div className='post-content'>
                    {post.content}
                </div>
                <Flex className='post-action-row' justifyContent='space-between'>               
                    <Flex className='icon-stat-set' alignItems='center' onClick={() => updateLikes(post._id)}>    
                        <IconButton icon={<FiHeart />} variant="ghost" size="lg" />
                        {post.likes > 0 && <div className='post-stat'>{post.likes}</div>}
                    </Flex>                            
                    <Flex className='icon-stat-set' alignItems='center'>
                        <IconButton icon={<FiRepeat />} variant="ghost" size="lg" />
                    </Flex>
                </Flex>
            </Box>

            <Divider />

            <Box className='post-comment-section' p={4}>
                {post.comments.length === 0 && 
                    <>
                        <p>No Comments</p>
                        <p>Be the first to comment.</p>
                    </>
                }
                {post.comments.map((comment) => (
                    <p>comment component to do</p>
                ))}
            </Box>

             <Divider />

            <Box className='post-comment-form' p={4}>
                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser?.profileimg} name={currentUser?.fullName?.[0]} />                
            </Box>  
        </>
    )
}

export default PostFull