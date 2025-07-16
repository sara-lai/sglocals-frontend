import { useState } from 'react'
import {  Button, Avatar,  Box,  Flex, IconButton, Divider, Input, Image  } from '@chakra-ui/react'
import { FiHeart, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import { useAuth } from '@clerk/clerk-react'
import { FaImage, FaMapMarkerAlt, FaAt } from 'react-icons/fa'

import * as postService from '../../services/postService'

import './dashboard.css'

const PostFull = ({ post, timeAgoFormat, updateLikes, currentUser, setContentFeed, theFeed, setSelectedPost }) => {

    const { getToken } = useAuth()
    const [file, setFile] = useState(null)
    const [content, setContent] = useState('')
    const isImagePost = post.imageUrls.length > 0

    async function addCommentToPost() {
        // todo - figure out likes on commenting - should it only re-render the selected post ? eg dont update whole contentFeed
        // copy post ; add comment to post & the ui; send off to DB

        const newPost = structuredClone(post)
        const newComment = {
            text: content,
            user: {
                fullName: currentUser.fullName,
                neighbourhood: currentUser.neighbourhood,
                profileImg: currentUser.profileImg
            },     
            createdAt: Date.now()
        }
        newPost.comments.push(newComment)

        // copying from likes logic,
        const newFeed = theFeed.map((post2) => {
            if (post._id === post2._id){
                return newPost
            } else {
                return post2 // do need StructuredClone here too?
            }
        })

        // two prop callbacks!! sets the open modal and the background list of posts
        setSelectedPost(newPost)
        setContentFeed(newFeed)

        setContent('') // clear comment 

        // send off to back end
        const token = await getToken()
        const newPostDB = await postService.updatePost(token, newPost)  
    }

    return (
   
        <Flex w="100%">
            {isImagePost && (
                <Box w="550px" bg='black' display='flex' alignItems='center' justifyContent='center'>
                    <Image src={post.imageUrls?.[0]} width="100%" objectFit="cover" />
                </Box>
            )}
            <Box w={isImagePost ? "440px" : "100%"} flexGrow={1}>
                <Box p={4}>
                    <Flex direction="row" align="center" gap={1} mb={4}>
                        <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileImg} name={post.user?.fullName?.[0]} />
                        <div className='post-info-set'>
                            <div className='avatar-name'>{post.user?.fullName}</div>
                            <Flex gap={2}>
                                <p>{post.user?.neighbourhood}</p>
                                <p>{timeAgoFormat(post.createdAt)}</p>
                            </Flex>
                        </div>
                    </Flex>                              
                    <Box className='post-content' mb={2}>
                        {post.content}
                    </Box>
                    <Flex className='post-action-row' justifyContent='space-between'>               
                        <Flex className='icon-stat-set' alignItems='center' onClick={() => updateLikes(post._id)}>    
                            <IconButton icon={<FiHeart />} variant="ghost" size="sm" />
                            {post.likes > 0 && <div className='post-stat'>{post.likes}</div>}
                        </Flex>                            
                        <Flex className='icon-stat-set' alignItems='center'>
                            <IconButton icon={<FiRepeat />} variant="ghost" size="sm" />
                        </Flex>
                    </Flex>
                </Box>

                <Divider />


                <Box className='post-comment-section' p={4} pl={6}>
                    {post.comments.length === 0 && 
                        <>
                            <p style={{ fontWeight: '600', marginBottom: '6px' }}>No Comments</p>
                            <p>Be the first to comment!</p>
                        </>
                    }
                    {post.comments.length > 0 && <p>Comments ({post.comments.length})</p>}
                    {post.comments.map((comment) => (
                        <Box pt={4} pb={4}>
                            <Flex gap={2}>
                                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={comment.user.profileImg} name={comment.user.fullName?.[0]} />
                                <Box>
                                    <Flex gap={2}>
                                        <p style={{ fontWeight: '600' }}>{comment.user.fullName}</p>
                                        <p>{timeAgoFormat(comment.createdAt)}</p>
                                        <p>{comment.user.neighbourhood}</p>
                                    </Flex>
                                    <p style={{ fontSize: '1.1rem'}}>{comment.text}</p>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box className='post-comment-form' p={4}>

                    <Flex gap={2}>
                        <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser?.profileImg} name={currentUser?.fullName?.[0]} />        
                        <Box w='100%'>
                            <Input placeholder="Add a comment..." 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Flex justify='space-between' mt={4}>
                                <Flex gap={2} justify="start">
                                    <IconButton className='action-icon' icon={<FaImage size={26} />} onClick={() => document.getElementById('image-upload').click()} />
                                    <input hidden id="image-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                                    <IconButton className='action-icon' icon={<FaMapMarkerAlt size={26} />} />
                                    <IconButton className='action-icon' icon={<FaAt size={26} />}  />
                                </Flex>     
                                <Button className='btn-default' onClick={addCommentToPost}>Comment</Button>          
                            </Flex>            
                        </Box>
                    </Flex>

                </Box> 
            </Box>
        </Flex>

    )
}

export default PostFull