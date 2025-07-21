import { useState, useEffect } from 'react'
import {  useOutletContext, useNavigate } from 'react-router'
import {  Avatar,  Box,  Flex, IconButton, Image, useDisclosure  } from '@chakra-ui/react'
import { FiHeart, FiMessageSquare, FiRepeat, FiTrash } from "react-icons/fi" // Fi vs Fa??
import './dashboard.css'
import { useAuth } from '@clerk/clerk-react'
import NewPostModal from './NewPostModal'
import * as postService from '../../services/postService'

const PostSummary = ({ post, timeAgoFormat, updateLikes, showFullPost, deletePost, addTopOfFeed }) => {
    // console.log('postSummary here!!', post)
    // todo noticed bug! seems to re-render all postSummaries just typing in form for the Repost (not a problem for regular post)

    const postImg = post.imageUrls?.[0]  // testing tmp
    const { currentUser } = useOutletContext()
    const  navigate = useNavigate()
    const { getToken } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure() // for repost
    const [content, setContent] = useState('') // for repost 
    const [repost, setRepost] = useState({})

    // todo for reposts:
    // make UI for the re-post section, click through to post
    // design note? feature duplicates NewPost somewhat.... maybe a NewRePost thing instead?

    async function handleSubmit(){
        // this is creating a brand new post BUT with a repost attached
        const token = await getToken()
        const postData = { content: content, repost_id: post._id, repost_type: 'post'  }
        const newPost = await postService.createNewPost(postData, token)

        addTopOfFeed(newPost)

        setContent('')  // reset & close
        onClose()        
    }

    async function fetchRepost() {
        if (!post.repost_id) return 
        const token = await getToken()
        const repostData = await postService.getPostForRepost(post.repost_id, token)       
        setRepost(repostData)
    }
    useEffect(() => {
        fetchRepost()
    }, [post]) // unpredictbale buggy without this re-fetch after reposts occurs!!

    function showRepostSummary(theRepost){
        // using theRepost b/c this is used for new repost and to show existing
        return (
            <Box className='default-border' onClick={() => showFullPost(theRepost._id)}>
                <Flex direction="row" align="center" gap={1}  cursor='pointer' >
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={theRepost.user?.profileImg} name={theRepost.user?.fullName?.[0]} />
                    <div className='post-info-set'>
                        <div className='avatar-name'>{theRepost.user?.fullName}</div>
                        <Flex gap={2}>
                            <p>{theRepost.user?.neighbourhood}</p>
                            <p>{timeAgoFormat(theRepost.createdAt)}</p>
                        </Flex>                                                                   
                    </div>
                </Flex>
                <Box className='post-content' mb={1} mt={4} pl={6}>
                    {theRepost.content}
                </Box>                                              
            </Box>   
        )                
    }

    return (
        <Box className='post-card' mb={2.5} boxShadow="sm">
            <Flex direction="row" align="center" gap={1} p={4}  cursor='pointer' onClick={() => navigate("/profile/" +  post.user_id)} >
                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={post.user?.profileImg} name={post.user?.fullName?.[0]} />
                <div className='post-info-set'>
                    <div className='avatar-name'>{post.user?.fullName}</div>
                    <Flex gap={2}>
                        <p>{post.user?.neighbourhood}</p>
                        <p>{timeAgoFormat(post.createdAt)}</p>
                    </Flex>
                </div>
            </Flex> 
            <Box className='post-content' mb={1} pl={6} onClick={() => showFullPost(post._id)}>
                {post.content}
            </Box>
            {post.repost_id && <Box p={4}>
                {showRepostSummary(repost)}        
            </Box>}
            <div className='post-summary-img'>
                {postImg && <Image src={postImg} mt={4} width="100%" maxH="440px" objectFit="cover" _hover={{ cursor: 'pointer' }}  onClick={() => showFullPost(post._id)} />}
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
                <Flex gap={2}>
                    {post.user_id === currentUser.user_id && ( 
                        <Flex className='icon-stat-set' alignItems='center' onClick={() => deletePost(post._id) }>
                            <IconButton icon={<FiTrash />} variant="ghost" size="lg" />
                        </Flex>
                    )}
                    <Flex className='icon-stat-set' alignItems='center' onClick={onOpen}>
                        <IconButton icon={<FiRepeat />} variant="ghost" size="lg" />
                    </Flex>                    
                </Flex>          
            </Flex>   
            <NewPostModal isOpen={isOpen} onClose={onClose} content={content} setContent={setContent} 
                handleSubmit={handleSubmit} theRepost={post}  timeAgoFormat={timeAgoFormat}
                 showRepostSummary={showRepostSummary}
            />                 
        </Box>
    )
}

export default PostSummary