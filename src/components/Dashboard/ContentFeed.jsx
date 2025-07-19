// open question how to build the Content Feed
import { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody  } from '@chakra-ui/react'
import { useAuth } from '@clerk/clerk-react'
import './dashboard.css'

import * as postService  from '../../services/postService'
import PostSummary from './PostSummary'
import PostFull from './PostFull'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useDisclosure } from '@chakra-ui/react' // for modals

const ContentFeed = ( { theFeed, setContentFeed, currentUser }) => {

    const { getToken } = useAuth() // todo - trouble passing token from parent, re-doing here
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedPost, setSelectedPost] = useState({})

    // "time ago" date formatting
    dayjs.extend(relativeTime) 
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }

    function showFullPost(postId){
        const thePost = theFeed.find(post => post._id === postId)
        setSelectedPost(thePost)
        onOpen()
    }

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

        // sets the open modal and the background list of posts
        setSelectedPost(newPost)
        setContentFeed(newFeed)

        // off to the db
        const token = await getToken()
        const newPostDB = await postService.updatePost(token, newPost)
    }

    async function deletePost(postId){
        const newFeed = theFeed.filter( post =>  post._id !== postId )
        setContentFeed(newFeed)

        const token = await getToken()
        const deleted = postService.deletePost(token, postId)
        console.log(deleted)
    }

    return (
        <div className='content-feed-container'>
            {theFeed.map(  (post) => (
                <PostSummary 
                    post={post} 
                    timeAgoFormat={timeAgoFormat}  
                    updateLikes={updateLikes} 
                    showFullPost={showFullPost} 
                    deletePost={deletePost}
                />
            ))}

            <Modal isOpen={isOpen} onClose={onClose} size='override' >
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent className='post-full-modal' w={selectedPost.imageUrls?.length > 0 ? "1000px" : "640px"}>
                    <ModalCloseButton className='btn-close' />
                        <PostFull
                            post={selectedPost} 
                            timeAgoFormat={timeAgoFormat}  
                            updateLikes={updateLikes} 
                            currentUser={currentUser}
                            setContentFeed={setContentFeed}
                            setSelectedPost={setSelectedPost}
                            theFeed={theFeed}
                        />
                </ModalContent>
            </Modal>
            {theFeed.map(  (post, i) => (
                <Box className='post-card' key={i} mb={4} boxShadow="sm">
                    <div className='post-top-matter'>
                        <Flex direction="" align="center" gap={2}>
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
                                    {/* <Flex className='icon-stat-set' alignItems='center'> */}
                                    <Flex className='icon-stat-set' alignItems={{base:'center',sm:'flex-start',lg:'flex-end'}}>

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