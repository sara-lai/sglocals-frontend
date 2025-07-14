import { useState } from 'react'
import {  Button, Avatar,  Box,  Flex, IconButton, Divider, Input  } from '@chakra-ui/react'
import { FiHeart, FiRepeat } from "react-icons/fi" // Fi vs Fa??
import { FaImage, FaMapMarkerAlt, FaAt } from 'react-icons/fa'
import './dashboard.css'

const PostFull = ({ post, timeAgoFormat, updateLikes, currentUser }) => {

    const [file, setFile] = useState(null)

    return (
        <>
            <Box p={4}>
                <Flex direction="row" align="center" gap={1} mb={4}>
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

            <Box className='post-comment-section' p={4} pl={6}>
                {post.comments.length === 0 && 
                    <>
                        <p style={{ fontWeight: '600', marginBottom: '6px' }}>No Comments</p>
                        <p>Be the first to comment!</p>
                    </>
                }
                {post.comments.map((comment) => (
                    <p>comment component to do</p>
                ))}
            </Box>

             <Divider />

            <Box className='post-comment-form' p={4}>

                <Flex gap={4}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser?.profileimg} name={currentUser?.fullName?.[0]} />        
                    <Box w='100%'>
                        <Input placeholder="Add a comment..." />
                        <Flex justify='space-between' mt={4}>
                            <Flex gap={2} justify="start">
                                <IconButton className='action-icon' icon={<FaImage size={26} />} onClick={() => document.getElementById('image-upload').click()} />
                                <input hidden id="image-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                                <IconButton className='action-icon' icon={<FaMapMarkerAlt size={26} />} />
                                <IconButton className='action-icon' icon={<FaAt size={26} />}  />
                            </Flex>     
                            <Button className='btn-default'>Comment</Button>          
                        </Flex>            
                    </Box>
                </Flex>



            </Box>  
        </>
    )
}

export default PostFull