import { Box, Divider, Flex, Heading, Image, Icon, Text, ButtonGroup, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure  } from '@chakra-ui/react'
import { FaPen } from 'react-icons/fa'
import './dms.css'
import NewDM from './NewDM'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@clerk/clerk-react'
import *  as dmService from '../../services/dmService'
import DMFull from './DMFull'
import DMsSummary from './DMsSummary'
import { useState, useEffect } from 'react'
import {  useOutletContext } from 'react-router'

const DMPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getToken } = useAuth()
    const [ allDMs, setAllDMs ] = useState([])
    const [ selectedDM, setSelectedDM ] = useState({})
    const { currentUser } = useOutletContext() 

    async function createNewChat(other_user_id){
        const token = await getToken()
        const newDM = await dmService.createNewDM({other_user_id: other_user_id }, token) // I think this is all thats needed from FE for a new chat (back end handles rest)
       
        // display new data in two places
        setSelectedDM(newDM)
        setAllDMs([...allDMs, newDM])

        onClose() // close the modal 
    }

    async function getDataForDMs(){
        const token = await getToken()
        const userDMs = await dmService.getDMsForCurrentUser(token)
        setAllDMs(userDMs)
    }
    useEffect(() => {
        getDataForDMs()
    }, [])

    return (
        <Box className='dm-container' maxW='900px' mb={20}>
            <Flex justify='space-between' mb={2} align='center' h='80px'>
                <Heading size='lg'> Chats </Heading> 
                <Flex className='dms-new-msg' align="center" as="button" gap={2} onClick={onOpen}>
                    {/* <Icon as={FaPen} w={4} h={4} /> */}
                    <FontAwesomeIcon icon={faPenToSquare}  size="xl" cursor="pointer" />
                    <Text fontSize="md">New message</Text>
                </Flex>             
            </Flex>
            <Flex className='default-border' maxW='900px' h='700px' p={0}>
                <Box w='340px'>
                    <Flex p={4}  gap={2}>
                        <Button className='minimal-toggle-btn current-border'>
                            All                        
                        </Button>
                        <Button className='minimal-toggle-btn'>
                            Marketplace                        
                        </Button>         
                    </Flex>     
                    <DMsSummary allDMs={allDMs} currentUser={currentUser} />      
                </Box>
                <Divider orientation='vertical' />  
                    {
                        Object.keys(selectedDM).length === 0 ? 
                            <Flex flex='1' justify='center' align='center'><Image maxW='300px'  src='/images/tmp-inbox.png' /></Flex> : 
                            <DMFull selectedDM={selectedDM} currentUser={currentUser} />
                    }
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size='override' isCentered>
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent className='post-full-modal' w='400px' p={4}>
                    <ModalCloseButton className='btn-close' />
                        <NewDM createNewChat={createNewChat}/>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default DMPage