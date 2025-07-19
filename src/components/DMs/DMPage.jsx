import { Box, Divider, Flex, Heading, Image, Text, Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure  } from '@chakra-ui/react'
import './dms.css'
import NewDM from './NewDM'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@clerk/clerk-react'
import *  as dmService from '../../services/dmService'
import DMFull from './DMFull'
import DMsSummary from './DMsSummary'
import { useState, useEffect, useRef } from 'react'
import {  useOutletContext } from 'react-router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Pusher from 'pusher-js'

const DMPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getToken } = useAuth()
    const [ allDMs, setAllDMs ] = useState([])
    const [ selectedDM, setSelectedDM ] = useState({})
    const { currentUser } = useOutletContext() 
    const pusherRef = useRef(null)

    dayjs.extend(relativeTime) 
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }

    async function createNewChat(other_user_id){
        const token = await getToken()
        const newDM = await dmService.createNewDM({other_user_id: other_user_id }, token) // I think this is all thats needed from FE for a new chat (back end handles rest)
       
        // display new data in two places
        setSelectedDM(newDM)
        setAllDMs([newDM, ...allDMs ])

        onClose() // close the modal 
    }

    async function createNewMessage(message){
        const token = await getToken()
        const newMsg = { message: message, dm_id: selectedDM._id }        
        const newDM = await dmService.addMessageToDM(newMsg, token) // this returns a NEW DM not a new Msg
        console.log('is this newDM from DB', newDM)
        setSelectedDM(newDM)
      
        // todo - hmmm i should put this in state var first to update immediately.... have to construct full object in meantime....
    }

    async function getDataForDMs(){
        const token = await getToken()
        const userDMs = await dmService.getDMsForCurrentUser(token)
        setAllDMs(userDMs)
    }
    useEffect(() => {
        getDataForDMs()
    }, [])

    useEffect(() => {
        // fixed bug: showing abnormally high concurrent connections
        // this section used GPT guidance / plus pusher docs (post signup)
        console.log('useeffect for pusher')
        if (!pusherRef.current) { // restrict pusher from init a bunch
            console.log('init of new pusher')
            pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_KEY, { cluster: 'ap1' });
        }
        const pusher = pusherRef.current
        const channel = pusher.subscribe(`chat-${selectedDM._id}`);
        channel.bind('new-message', (data) => {
            setSelectedDM(data)
        })
        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [selectedDM._id])    

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
                <Box w='340px' className='content-scroll'>
                    <Flex p={4}  gap={2} position=''>
                        <Button className='minimal-toggle-btn current-border'>
                            All                        
                        </Button>
                        <Button className='minimal-toggle-btn'>
                            Marketplace                        
                        </Button>         
                    </Flex>     
                    <DMsSummary allDMs={allDMs} currentUser={currentUser} setSelectedDM={setSelectedDM} />      
                </Box>
                <Divider orientation='vertical' />  
                    {
                        Object.keys(selectedDM).length === 0 ? 
                            <Flex flex='1' justify='center' align='center'><Image maxW='300px'  src='/images/tmp-inbox.png' /></Flex> : 
                            <DMFull 
                                selectedDM={selectedDM}  currentUser={currentUser}  
                                createNewMessage={createNewMessage}                                 
                                timeAgoFormat={timeAgoFormat} 
                            />
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