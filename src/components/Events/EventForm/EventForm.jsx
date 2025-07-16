import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea, DrawerFooter, Stack, Box  } from '@chakra-ui/react'
import { useState, useContext, useEffect, useRef } from "react";
import { useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
// import './EventCard.css'

import UploadImage from './UploadImage';

const EventForm = () => {
        // const [size, setSize] = useState('')
        const { isOpen, onOpen, onClose } = useDisclosure();
        const firstField = useRef();
        const xlSizes = 'xl';

        const handleClick = (newSize) => {
            // setSize(newSize)
            onOpen()
        }

        return (
            <>

                <Button 
                    leftIcon={<AddIcon />} 
                    colorScheme='teal' 
                    onClick={() => handleClick(xlSizes)}
                    key={xlSizes}
                    m={4}
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
                        <Box>
                            <FormLabel htmlFor='eventname'>Event Name</FormLabel>
                            <Input
                            ref={firstField}
                            id='eventname'
                            placeholder='Please enter event name'
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='eventorganizer'>Event Organizer</FormLabel>
                            <Input
                            ref={firstField}
                            id='eventorganizer'
                            ></Input>
                        </Box>

                        <Box>
                            <FormLabel htmlFor='desc'>Description</FormLabel>
                            <Textarea id='desc' />
                        </Box>
                        <Box>
                            <UploadImage/>
                        </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme='blue'>Add</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
            
        )

};

export default EventForm;