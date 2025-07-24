import {  Button, useDisclosure, Flex, Avatar, Input, Box } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import * as postService from '../../services/postService'
import { uploadWidget } from '../../utils/cloudinaryUpload'
import '../Dashboard/dashboard.css'

import NewPostModal from '../Dashboard/NewPostModal'

const NewGroupPost = ({  currentUser, addTopOfFeed, group }) => {
    const { isOpen, onOpen, onClose } = useDisclosure() // this is some internal thing to Chakra
    const [content, setContent] = useState('')
    const [imageUrls, setImageUrls] = useState([])

    const { getToken } = useAuth();

    const handleSubmit = async () => {
        const token = await getToken()
        // call the postsService to create a post! 
        const postData = { 
            content: content, 
            imageUrls: imageUrls, 
            for_group: true,
            group_id: group._id
         }
        const newPost = await postService.createNewPostForGroup(postData, group._id, token)
        console.log('new post made', newPost)
        
        addTopOfFeed(newPost)
        
        // reset & close
        setContent('')
        setImageUrls([])
        onClose()
    }

    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList) => {
            console.log(secureUrlsList)
            setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }        

    return (
        <div className='new-post-container'>            
            <Flex mt={4} gap={2} className='default-border' align='center' p={4} onClick={onOpen}>
                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser?.profileImg} name={currentUser?.fullName?.[0]} />        
                <Box w='100%'>
                    <Input borderRadius='30px' pl={6} h="46px" background='#f0f2f5' value='Share something with the group ...'  />     
                </Box>           
            </Flex>
            <NewPostModal  isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} content={content} setContent={setContent}
                imageUrls={imageUrls} handleImageUpload={handleImageUpload}      
            />
        </div>
    )
}

export default NewGroupPost;