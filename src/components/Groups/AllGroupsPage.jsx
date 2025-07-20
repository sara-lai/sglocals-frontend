import { useState } from 'react'
import { Heading, Flex, Box, Button, Input, Text } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure  } from '@chakra-ui/react'
//import NewGroupModal from "./NewGroupModal"
import '../Dashboard/dashboard.css' // modal stylings
import './groups.css'

const GroupsPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formData, setFormData] = useState({ groupName: '', groupDescription: ''})    
    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {    
        // todo
        // service class to create group 
        // navigate to your new group page
    }
    
    // todo load both "nearby groups" and "your groups"
    //useEffect()

    return (
        <Box ml="10%">
            <Heading mb={6}>Groups</Heading>
            <Flex maxW="1000px" h="100%">
                <Box flex="0 0 60%" >
                    <Heading size='md'>Groups near you</Heading>
                </Box>
                <Box flex="0 0 40%" h="100%" overflowY="auto" position="sticky" top={0} ml={4}>
                    <Flex align='center' gap={14}>
                        <Heading size='md'>Your groups</Heading>     
                        <Button className='btn-default' onClick={onOpen}>Create</Button>
                     </Flex>
                </Box>               
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size='override' isCentered>
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent w='600px' minH='400px' p={4}>
                    <ModalCloseButton className='modal-btn-close' />
                        <Text m={4} textAlign='center'>Let's get started on your group</Text>
                        <Flex direction='column' gap={8}>
                            <Box>
                                <Heading size='md' mb={2}>Group name</Heading>    
                                <Input p={4} h="60px" borderRadius='16px' name="groupName" value={formData.groupName} onChange={handleChange} />
                            </Box>      
                            <Box>
                                <Heading size='md' mb={2}>Group Description</Heading>
                                <Input p={4} h="60px" borderRadius='16px' name="groupDescription" value={formData.groupDescription} onChange={handleChange} />
                            </Box>
                            <Flex justify="flex-end">
                                <Button type="submit" h="46px" className="btn-default btn-lg" onClick={handleSubmit} >Create</Button>
                            </Flex> 
                        </Flex>
                </ModalContent>
            </Modal>      
        </Box>
    )
}

export default GroupsPage

