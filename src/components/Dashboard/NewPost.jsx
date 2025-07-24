import {  useOutletContext } from 'react-router'
import {  Button, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import * as postService from '../../services/postService'
import { uploadWidget } from '../../utils/cloudinaryUpload'
import './dashboard.css'

import NewPostModal from './NewPostModal'

const NewPost = ({ addTopOfFeed }) => {
    const { createFromSidebar, setCreateFromSidebar } = useOutletContext()       
    const { isOpen, onOpen, onClose } = useDisclosure() // this is some internal thing to Chakra
    const [content, setContent] = useState('')
    const [imageUrls, setImageUrls] = useState([])

    const { getToken } = useAuth();

    const handleSubmit = async () => {
        const token = await getToken()
        // call the postsService to create a post! 

        const postData = { content: content, imageUrls: imageUrls }
        const newPost = await postService.createNewPost(postData, token)
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
    
    // to open modal from layout sidebar nav
    useEffect(() => {
        if (createFromSidebar){
            onOpen()
            setCreateFromSidebar(false)  // reset or will keep triggering
        }
    }, [createFromSidebar])    

    return (
        <div className='new-post-container'>
            <Button className='add-btn' float="right" leftIcon={<AddIcon />} onClick={onOpen}>
                Post
            </Button>
            <NewPostModal  isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} content={content} setContent={setContent}
                imageUrls={imageUrls} handleImageUpload={handleImageUpload}      
            />
        </div>
    )
}

export default NewPost;