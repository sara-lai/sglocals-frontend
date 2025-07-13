// open question how to build the Content Feed
import { useState } from 'react'
import {  Avatar,  Box,  Flex, IconButton, HStack  } from '@chakra-ui/react'
import { FiHeart, FiMessageSquare, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import './dashboard.css'

const ContentFeed = ( { theFeed }) => {

    const [likes, setLikes] = useState(0)
    const [likeAction, setLikeAction] = useState('add')

    function updateLikes(postId){
        // search through the posts (theFeed variable)
        // find the one with the id
        // add or subtract the likes
        const thePost = theFeed.find(post => post._id === postId)
        thePost.likes += 1
        
        console.log(theFeed, postId)

        // if  (likeAction === 'add'){
        //     setLikes(prev => prev + 1)
        //     setLikeAction('minus')
        // } else {
        //     setLikes(prev => prev - 1)
        //     setLikeAction('add')
        // }
    }

    return (
        <div className='content-feed-container'>
            {theFeed.map(  (post, i) => (
                <Box className='post-card' key={i} mb={4} boxShadow="sm">
                    <div className='post-top-matter'>
                        <Flex direction="row" align="center" gap={1}>
                            <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileimg} name={post.user?.fullName?.[0]} />
                            <div className='post-info-set'>
                                <div className='avatar-name'>{post.user?.fullName}</div>
                                <Flex gap={2}>
                                    <p>{post.user?.neighbourhood}</p>
                                    <p>todo format {post.createdAt}</p>
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
                                        <IconButton icon={<FiHeart />} variant="ghost" size="lg" onClick={() => updateLikes(post._id)}/>
                                        {post.likes > 0 && <div className='post-stat'>{post.likes}</div>}
                                    </Flex>                            
                                    <Flex className='icon-stat-set' alignItems='center'>
                                        <IconButton icon={<FiMessageSquare />} variant="ghost" size="lg" />
                                        {post.comments.length > 0 && <div className='post-stat'>{post.comments.length}</div>}
                                    </Flex>
                                </Flex>
                                <Flex className='icon-stat-set' alignItems='center'>
                                    <IconButton icon={<FiRepeat />} variant="ghost" size="lg" />
                                </Flex>
                            </Flex>
                            
                    </div>
                </Box>
            ))}

        </div>
    )
}

export default ContentFeed