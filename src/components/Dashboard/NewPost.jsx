import {  Avatar, Modal,  ModalOverlay,  ModalContent,  ModalCloseButton,  Button,  Textarea,  Flex,  IconButton,  useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaImage, FaMapMarkerAlt, FaAt } from 'react-icons/fa'

import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
//import { uploadImageToCloudinary, createPost } from '../services/postService';
import * as postService from '../../services/postService'

import './dashboard.css'

const NewPost = ({ userInfo }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)

    const { getToken } = useAuth();

    const handleSubmit = async () => {
        const token = await getToken()
        // call the postsService to create a post! 
        const newPost = await postService.createNewPost(content, token)
        console.log('tried to create post?', newPost )
    }

    return (
        <div className='new-post-container'>
            <Button colorScheme="green" float="right" leftIcon={<AddIcon />} onClick={onOpen}>
                Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay bg="blackAlpha.400" />

                <ModalContent className='new-post-modal'>
                    <Button className='btn' colorScheme="green" onClick={handleSubmit}>
                        Post
                    </Button>                    
                    <ModalCloseButton className='btn-close'/>
                    
                    <Flex direction="row" align="center" gap={2}>
                        <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={userInfo.profileImg} name={userInfo.fullName?.[0]} />
                        <div>
                            <div className='avatar-name'>{userInfo.fullName}</div>
                            <div className='avatar-nhood'>{userInfo.neighbourhood}</div>
                        </div>
                    </Flex>                    

                    <Flex direction="column" gap={4} m={4}>
                        <Textarea value={content} minH="180px" resize="vertical" variant="unstyled"
                            placeholder="Share what's on your mind."
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Flex gap={2} justify="start">
                            <IconButton icon={<FaImage size={26} />} onClick={() => document.getElementById('image-upload').click()} />
                            <input hidden id="image-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            <IconButton icon={<FaMapMarkerAlt size={26} />} />
                            <IconButton icon={<FaAt size={26} />}  />
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>  
        </div>
    )
}

export default NewPost;