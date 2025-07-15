import {  Avatar,  Box,  Flex, IconButton, Image  } from '@chakra-ui/react'
import { FiHeart, FiMessageSquare, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import './dashboard.css'

const PostSummary = ({ post, timeAgoFormat, updateLikes, showFullPost }) => {

    const postImg = post.imageUrls?.[0]  // testing tmp
    
    return (
        <Box className='post-card' mb={2.5} boxShadow="sm">
            <Flex direction="row" align="center" gap={1} p={4}>
                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileImg} name={post.user?.fullName?.[0]} />
                <div className='post-info-set'>
                    <div className='avatar-name'>{post.user?.fullName}</div>
                    <Flex gap={2}>
                        <p>{post.user?.neighbourhood}</p>
                        <p>{timeAgoFormat(post.createdAt)}</p>
                    </Flex>
                </div>
            </Flex> 
            <Box className='post-content' mb={4} pl={6} onClick={() => showFullPost(post._id)}>
                {post.content}
            </Box>
            <div className='post-summary-img'>
                {postImg && <Image src={postImg} width="100%" objectFit="cover" />}
            </div>
            <Flex className='post-action-row' justifyContent='space-between' p={4}>
                <Flex gap={2}>                         
                    <Flex className='icon-stat-set' alignItems='center' onClick={() => updateLikes(post._id)}>    
                        <IconButton icon={<FiHeart />} variant="ghost" size="lg"/>
                        {post.likes > 0 && <div className='post-stat'>{post.likes}</div>}
                    </Flex>                            
                    <Flex className='icon-stat-set' alignItems='center' onClick={() => showFullPost(post._id)}>
                        <IconButton icon={<FiMessageSquare />} variant="ghost" size="lg" />
                        {post.comments.length > 0 && <div className='post-stat'>{post.comments.length}</div>}
                    </Flex>
                </Flex>
                <Flex className='icon-stat-set' alignItems='center'>
                    <IconButton icon={<FiRepeat />} variant="ghost" size="lg" />
                </Flex>
            </Flex>                    
        </Box>
    )

}

export default PostSummary