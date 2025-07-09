import {  Avatar, Modal,  ModalOverlay,  ModalContent,  ModalCloseButton,  Button,  Textarea,  Flex,  IconButton,  useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaImage, FaMapMarkerAlt, FaAt } from 'react-icons/fa'

import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
//import { uploadImageToCloudinary, createPost } from '../services/postService';
import * as postService from '../../services/postService'

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
        <>
            <Button colorScheme="green" float="right" leftIcon={<AddIcon />} onClick={onOpen}>
            Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay bg="blackAlpha.200" />
                <ModalContent p={3} paddingTop={14}>
                    <Button position="absolute" top={2} right={2} colorScheme="green" onClick={handleSubmit}>Post</Button>
                    <ModalCloseButton position="absolute" top={2} left={2} />

                    <Flex direction="row" align="center" gap={2}>
                        <Avatar size="md" src={userInfo.profileImg} name={userInfo.fullName || 'User'} />
                        <div>
                            <p>{userInfo.fullName}</p>
                            <p>{userInfo.neighbourhood}</p>
                        </div>
                    </Flex>                    

                    <Flex direction="column" gap={4} m={4}>
                        <Textarea value={content}
                            placeholder="Write your post here..."
                            minH="200px"
                            resize="vertical"
                            variant="unstyled"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Flex gap={2} justify="start">
                            <IconButton icon={<FaImage />} colorScheme="teal" variant="outline"
                            onClick={() => document.getElementById('image-upload').click()}
                            />
                            <input id="image-upload" type="file" accept="image/*" hidden
                            onChange={(e) => setFile(e.target.files[0])}
                            />
                            <IconButton icon={<FaMapMarkerAlt />} colorScheme="teal" variant="outline" />
                            <IconButton icon={<FaAt />} colorScheme="teal" variant="outline" />
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>  
        </>
    )
}

export default NewPost;