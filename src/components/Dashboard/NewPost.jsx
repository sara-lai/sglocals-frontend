import {  Avatar, Modal,  ModalOverlay,  ModalContent,  ModalCloseButton,  Button,  Textarea,  Flex,  IconButton,  useDisclosure, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import * as postService from '../../services/postService'
import { uploadWidget } from '../../utils/cloudinaryUpload'
import './dashboard.css'

import { FaImage, FaMapMarkerAlt, FaAt } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { FiMapPin, FiAtSign } from 'react-icons/fi'

const NewPost = ({ userInfo, addTopOfFeed }) => {
    
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
        
        addTopOfFeed(newPost.post) // .post ugh but makes work

        // reset & close
        setContent('')
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
            <Button className='add-btn' float="right" leftIcon={<AddIcon />} onClick={onOpen}>
                Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay bg="blackAlpha.500" />

                <ModalContent className='new-post-modal'>
                    <Button className='btn btn-green' onClick={handleSubmit}>
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
                        <Flex gap={2}>
                            {imageUrls.map((url) => (
                                <Image src={url} boxSize="100px" objectFit="cover" />
                            ))}
                        </Flex>
                        <Flex gap={2} justify="start"></Flex>                        
                        <Flex gap={4} justify="start">
                            <FontAwesomeIcon icon={faImages}  size="2xl" cursor="pointer"  onClick={handleImageUpload} />
                            <FiMapPin className='fi-icon-thicken' color="gray.700" size="1.8rem" />                           
                            <FiAtSign className='fi-icon-thicken' color="gray.700" size="1.8rem" />
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>  
        </div>
    )
}

export default NewPost;