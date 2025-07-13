// open question how to build the Content Feed
import { useState } from 'react'
import {  Avatar,  Box,  Flex, IconButton, HStack  } from '@chakra-ui/react'
import { FiHeart, FiMessageSquare, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import { useAuth } from '@clerk/clerk-react'
import './dashboard.css'

import * as postService from '../../services/postService'

const ContentFeed = ( { theFeed, setContentFeed, currentUser }) => {

    const { getToken } = useAuth() // todo - trouble passing token from parent, re-doing here

    async function updateLikes(postId){
        // simplest , just a +1 to the post and skip serviceCall/BE skip subtracting etc
        const thePost = theFeed.find(post => post._id === postId)
        let numLikes = thePost.likes
        
        const userId = currentUser.user_id

        let newLikedBy = [...thePost.likedBy] // copy the likedBy array b/c of React law (dont mutate state)
        if (newLikedBy.includes(userId)){   // has the user already liked it?
            numLikes--
            newLikedBy = newLikedBy.filter(user =>  user !== userId)
            // or get idx in the array of users.... splice to remove that user
        } else {
            numLikes++
            newLikedBy.push(userId)
        }

        // assembling the new post
        const newPost = {...thePost, likes: numLikes, likedBy: newLikedBy }

        // goal: take newPost and "merge" newPost into theFeed        
        // copy the state though (React law), don't mutate 
        const newFeed = theFeed.map((post) => {
            if (post._id === postId){
                return newPost
            } else {
                return post
            }
        })

        // set this before DB (immediately update UI)
        setContentFeed(newFeed)

        // only update the 1 post .....  newPost.... if updating all the fields for post (newPost), then thats a PUT 
        const token = await getToken()
        const newPostDB = await postService.updatePost(token, newPost)
        console.log('saved newPostDB!', newPostDB)
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