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
import {  useOutletContext, useSearchParams } from 'react-router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Pusher from 'pusher-js'

const DMPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getToken } = useAuth()
    const [ allDMs, setAllDMs ] = useState([])
    const [filteredDMs, setFilteredDMs] = useState([])
    const [ selectedDM, setSelectedDM ] = useState({})
    const [allDMsLoaded, setAllDMsLoaded] = useState(false) // to coordinate more useEffects
    const [tab, setTab] = useState('all')
    const { currentUser } = useOutletContext() 
    const pusherRef = useRef(null)
    const [searchParams] = useSearchParams() // for creating chats from other parts of the app
    const otherUserFromParams = searchParams.get('chattingWith')
    const listingFromParams = searchParams.get('aboutListing') // for marketplace-specific chats

    dayjs.extend(relativeTime) 
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }

    async function createNewChat(other_user_id, listing=false){
        const token = await getToken()

        // this returns the old chat if already exists!
        const newDM = await dmService.createNewDM({
            other_user_id: other_user_id, 
            listing_id: listing // marketplace listing, false by default
        }, token) 
       
        setSelectedDM(newDM)
        
        // edge case: dont add the same chat again 
        const updatedDMs = [newDM, ...allDMs ]
        let dmIds = []
        let filtered = []
        for (let dm of updatedDMs){
            if (dmIds.includes(dm._id)) continue
            filtered.push(dm)
            dmIds.push(dm._id)
        }
        setFilteredDMs(filtered)

        onClose() // close the modal 
    }

    async function filterMarketplace(){        
        setTab('marketplace')
        let filtered= [...allDMs]
        filtered = filtered.filter(dm => dm.isMarketplace)
        setFilteredDMs(filtered)
    }
    async function filterAll(){
        setTab('all')
        setFilteredDMs(allDMs)
    }    

    async function createNewMessage(message){
        const token = await getToken()
        const newMsg = { message: message, dm_id: selectedDM._id }        
        const updatedDM = await dmService.addMessageToDM(newMsg, token) // this returns the updated DM not a new Msg
        setSelectedDM(updatedDM)

        // put the updated DM at the top of allDMs!
        let allChats = [...allDMs]
        allChats = allChats.filter(chat => chat._id !== updatedDM._id) // filter out that the DM and then push to front
        setFilteredDMs([updatedDM, ...allChats ]) 
    }

    async function getDataForDMs(){
        const token = await getToken()
        const userDMs = await dmService.getDMsForCurrentUser(token)
        setAllDMs(userDMs)
        setFilteredDMs(userDMs)
        setAllDMsLoaded(true)
    }
    useEffect(() => {
        getDataForDMs()
    }, [])

    useEffect(() => {
        if (otherUserFromParams && allDMsLoaded){
            console.log('new chat via params!', otherUserFromParams, 'is marketplace listing?',  listingFromParams)
            createNewChat(otherUserFromParams, listingFromParams)
        }        
    }, [otherUserFromParams, allDMsLoaded]) // trying to prevent some overwrite condition when new chat from params


    useEffect(() => {
        if (!pusherRef.current) { // make sure pusher only 1 init
            pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_KEY, { cluster: 'ap1' });
        }
        const pusher = pusherRef.current
        const channel = pusher.subscribe(`chat-${selectedDM._id}`);
        channel.bind('new-message', (data) => {
            setSelectedDM(data)
        })
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
                        <Button className={`minimal-toggle-btn ${tab ==='all' && 'current-border'}`} onClick={filterAll}>
                            All                        
                        </Button>
                        <Button className={`minimal-toggle-btn ${tab ==='marketplace' && 'current-border'}`} onClick={filterMarketplace}>
                            Marketplace                        
                        </Button>         
                    </Flex>     
                    <DMsSummary allDMs={filteredDMs} currentUser={currentUser} setSelectedDM={setSelectedDM} />      
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