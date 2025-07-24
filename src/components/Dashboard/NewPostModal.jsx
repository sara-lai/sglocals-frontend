import {  useOutletContext } from 'react-router'
import {  Avatar, Modal,  ModalOverlay,  ModalContent,  ModalCloseButton,  Button,  Textarea,  Flex,  Image, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { FiMapPin, FiAtSign } from 'react-icons/fi'
import './dashboard.css'

import RepostSummary from './RepostSummary'

// attempting to make this usable for new posts, reposts, and side nav launch
// open question: set the content/setContent and imageUrls HERE or in the parent(s)?
const NewPostModal = ({ isOpen, onClose, handleSubmit, content, setContent, imageUrls, handleImageUpload, theRepost, showFullPost }) => {
    const { currentUser } = useOutletContext()

    imageUrls = imageUrls || []

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay bg="blackAlpha.500" />

            <ModalContent className='new-post-modal'>
                <Button className='btn btn-green' onClick={handleSubmit}>
                    Post
                </Button>                    
                <ModalCloseButton className='btn-close'/>
                
                <Flex direction="row" align="center" gap={2}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                    <div>
                        <div className='avatar-name'>{currentUser.fullName}</div>
                        <div className='avatar-nhood'>{currentUser.neighbourhood}</div>
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
                    {theRepost && 
                        <RepostSummary theRepost={theRepost} showFullPost={showFullPost} />
                    }                                     
                    <Flex gap={2} justify="start"></Flex>                        
                    <Flex gap={4} justify="start">
                        {/* if skipping images, just skip this row for now */}
                        {handleImageUpload && (
                            <>
                                <FontAwesomeIcon icon={faImages}  size="2xl" cursor="pointer"  onClick={handleImageUpload} />
                                <FiMapPin className='fi-icon-thicken' color="gray.700" size="1.8rem" />                           
                                <FiAtSign className='fi-icon-thicken' color="gray.700" size="1.8rem" />
                            </>
                        )}   
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>  
    )
}

export default NewPostModal