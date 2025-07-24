import { useState, useEffect } from 'react'
import { Heading, Flex, Box, Button, Input, Text, Image } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure  } from '@chakra-ui/react'
//import NewGroupModal from "./NewGroupModal"
import '../Dashboard/dashboard.css' // modal stylings
import './groups.css'
import { useAuth } from '@clerk/clerk-react'
import * as groupService from '../../services/groupService'
import { useNavigate } from 'react-router'

const GroupsPage = () => {    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const [nearbyGroups, setNearbyGroups] = useState([])
    const [currentUserGroups, setCurrentUserGroups] = useState([])

    // generic form handling
    const [formData, setFormData] = useState({ name: '', description: ''})    
    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {    
        const token = await getToken()

        // add fun default banner imgs!
        let bannerImgs = []
        for (let i = 1; i <= 7; i++){
            bannerImgs.push(`/images/default-group-img${i}.png`)
        }
        let randomIdx = Math.floor(Math.random() * 7)
        const banner = bannerImgs[randomIdx]
        formData.bannerImg = banner

        const newGroup = await groupService.createNewGroup(formData, token)
        console.log(newGroup)         
        onClose()
        navigate('/groups/' + newGroup._id)
    }
    
    // todo load both "nearby groups" and "your groups"
    async function loadGroupData(){
        const token = await getToken()

        // nearby groups data        
        const nearbyGroups = await groupService.getNearbyGroups(token)
        setNearbyGroups(nearbyGroups)

        // current user groups data 
        const currentUserGroups = await groupService.getGroupsForCurrentUser(token)
        setCurrentUserGroups(currentUserGroups)
    }
    useEffect(() => {
        loadGroupData()
    },[])

    return (
        <Box ml="10%">
            <Heading mb={6}>Groups</Heading>
            <Flex maxW="1000px" h="100%">
                <Box flex="0 0 60%" >
                    <Heading size='md' mb={6}>Groups near you</Heading>
                    {nearbyGroups.map(group => (
                        <Flex w='560px' mb={4} cursor='pointer' onClick={() => navigate('/groups/' + group._id)}>
                            <Box h='120px' w='120px'
                                backgroundImage={group.bannerImg || '/images/default-group-img5.png'}
                                backgroundPosition="center"
                                backgroundSize='130%'                                  
                            >                               
                            </Box>
                            <Flex flex='1' direction='column' justify='space-between' p={6}>
                                <Text fontWeight='600' fontSize='1.1rem'>{group.name}</Text>
                                <Flex justify='space-between'>
                                    <Button className='btn-default'>Join</Button>
                                    <Text fontWeight='500' fontSize='1rem' color='#576580' letterSpacing='-.5px'>
                                        {group.member_ids.length} members
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Box>
                <Box flex="0 0 40%" h="100%" overflowY="auto" position="sticky" top={0} ml={4}>
                    <Flex align='center' gap={14} mb={6}>
                        <Heading size='md'>Your groups</Heading>     
                        <Button className='btn-default' onClick={onOpen}>Create</Button>
                    </Flex>
                    {currentUserGroups.length === 0 &&
                        <Image mt={12} maxH='160px' src='/images/tmp-nothing-here.png' />
                    }   
                    {currentUserGroups.map(group => (
                        <Flex w='280px' mb={4} align='center' cursor='pointer' onClick={() => navigate('/groups/' + group._id)}>
                            <Box h='60px' w='60px'
                                backgroundImage={group.bannerImg || '/images/default-group-img5.png'}
                                backgroundPosition="center"
                                backgroundSize='130%'
                                backgroundRepeat='no-repeat'                                  
                            >                               
                            </Box>
                            <Flex flex='1' direction='column' justify='space-between' p={6}>
                                <Text fontWeight='600' fontSize='.9rem'>{group.name}</Text>
                                <Text fontWeight='500' fontSize='.8rem' color='#576580' letterSpacing='-.5px'>
                                    {group.member_ids.length} members
                                </Text>                                
                            </Flex>
                        </Flex>
                    ))}
                </Box>               
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size='override' isCentered>
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent w='600px' minH='400px' p={4}>
                    <ModalCloseButton className='modal-btn-close' />
                        <Text fontSize='1.1rem' m={4} textAlign='center'>Let's get started on your group</Text>
                        <Flex direction='column' gap={8}>
                            <Box>
                                <Heading size='md' mb={2}>Group name</Heading>    
                                <Input p={4} h="60px" borderRadius='16px' name="name" value={formData.name} onChange={handleChange} />
                            </Box>      
                            <Box>
                                <Heading size='md' mb={2}>Group Description</Heading>
                                <Input p={4} h="60px" borderRadius='16px' name="description" value={formData.description} onChange={handleChange} />
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

