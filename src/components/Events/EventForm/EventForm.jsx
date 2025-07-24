import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, DrawerFooter, Stack, Box  } from '@chakra-ui/react'
import { useState, useContext, useEffect, useRef } from "react";
import { useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { uploadWidget } from '../../../utils/cloudinaryUpload'
import { eventAPI } from '../../../services/eventService'
import { useAuth } from '@clerk/clerk-react'
import MyApp from '../EventDate'





// import './EventCard.css'

import UploadImage from './UploadImage';
import * as userService from '../../../services/userService'

const EventForm = (props) => {
        const [fileList, setFileList] = useState('');
        const [imageUrls, setImageUrls] = useState();
        // const [size, setSize] = useState('')
        const { isOpen, onOpen, onClose } = useDisclosure();
        const firstField = useRef();
        const { userId, getToken } = useAuth();
        
        const xlSizes = 'xl';

        const handleClick = () => {
            onOpen();
        }

        const addEventFunction = async () => {
            const token = await getToken();
            // const user = await userService.getCurrentUser(token)
            let postRequest = 'POST';

            const eventName = document.getElementById("eventname"); 
            const eventOrganizer = document.getElementById("eventorganizer");
            const eventDescription = document.getElementById("eventDescription");
            const eventStart = document.getElementById("eventstart");
            const eventEnd = document.getElementById("eventend");
            console.log(eventStart.value);
            const requestObj = {
                name: eventName.value,  
                organizer: eventOrganizer.value,
                description: eventDescription.value,
                image: imageUrls,
                createdby: userId,
                eventstart: eventStart.value,
                eventend: eventStart.value,
                users: [userId]
            }
            const callApi = await eventAPI(postRequest, token, requestObj);
            props.seteventAdded(prev => prev + 1);
            console.log(requestObj);

            onClose();
        }
    


        return (
            <>

                <Button 
                    leftIcon={<AddIcon />} 
                    colorScheme='teal' 
                    onClick={() => handleClick(xlSizes)}
                    key={xlSizes}
                    m={4}
                    className='btn btn-green'
                    >
                    Add Event
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    initialFocusRef={firstField}
                    onClose={onClose}
                    size={xlSizes}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new event
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                        <Box required>
                            <FormLabel htmlFor='eventname'>Event Name</FormLabel>
                            <Input
                            ref={firstField}
                            id='eventname'
                            placeholder='Please enter event name'
                            required
                            />
                        </Box>


                        <Box>
                            <FormLabel htmlFor='eventorganizer'>Event Organizer</FormLabel>
                            <Input
                            ref={firstField}
                            id='eventorganizer'
                            placeholder='Please enter event organizer'
                            required
                            ></Input>
                        </Box>


                        <Box>
                            <FormLabel htmlFor='desc'>Description</FormLabel>
                            <Textarea 
                            id='eventDescription'
                            required 
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='desc'>Event Start</FormLabel>
                            <Input 
                            placeholder='Select Date and Time' 
                            size='md' 
                            type='datetime-local' 
                            id='eventstart'
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='desc'>Event End</FormLabel>
                            <Input 
                            placeholder='Select Date and Time' 
                            size='md' 
                            type='datetime-local' 
                            id='eventend'
                            />
                        </Box>
                        <Box>
                            <UploadImage setFileList={setFileList} fileList={fileList} imageUrls={imageUrls} setImageUrls={setImageUrls}/>
                        </Box>

                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={addEventFunction} >Add</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
            
        )

};

export default EventForm;