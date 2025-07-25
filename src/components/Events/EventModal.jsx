import { Button, Textarea, FormLabel, Input, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, FormControl, ModalFooter } from '@chakra-ui/react'
import React, { useState, useContext, useEffect, useRef } from "react";
import { useDisclosure } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { eventAPI } from '../../services/eventService'
import { EventContext } from './Events'
import { useAuth } from '@clerk/clerk-react'

function EventModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const Event = useContext(EventContext);
  const { getToken } = useAuth();

      useEffect(() => {
        console.log(Event);
    },[]);

    const updateEventFunction = async () => {
      const token = await getToken();      
      let postRequest = 'POST';  
      const eventId= props.event._id;
      const eventName = document.getElementById("eventname"); 
      const eventOrganizer = document.getElementById("eventorganizer");
      const eventDescription = document.getElementById("eventDescription");
      const eventStart = document.getElementById("eventstart");
      const eventEnd = document.getElementById("eventend");
      let payload = {
        "name": eventName.value,  
        "organizer": eventOrganizer.value,
        "description": eventDescription.value,
        "eventstart": eventStart.value,
        "eventend": eventEnd.value
      }
      console.log(`EventModal: ${payload}`)

      const updateType = 'push';
          await eventAPI(postRequest, token, payload, eventId, updateType);
      props.seteventAdded(prev => prev + 1);
      onClose();
    }

  return (
    <>
      <EditIcon onClick={onOpen}></EditIcon>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal
        EventModalRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>{Event.description || "details"}</ModalHeader> */}
          <ModalCloseButton onClick={onClose}/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Name</FormLabel>
              <Input 
              ref={initialRef} 
              placeholder='Event Name' 
              id='eventname'
              defaultValue={props.event.name}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event Organizer</FormLabel>
              <Input 
              placeholder='Organizer' 
              id='eventorganizer'
              defaultValue={props.event.organizer}              
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event Description</FormLabel>
              <Textarea 
              placeholder='Description'
              id='eventDescription'
              defaultValue={props.event.description}              
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event Start</FormLabel>
              <Input 
              placeholder='Select Date and Time'
              id='eventstart'
              defaultValue={props.event.eventstart}              
              />
            </FormControl>


            <FormControl mt={4}>
              <FormLabel>Event Start</FormLabel>
              <Input 
              placeholder='Select Date and Time'
              id='eventend'
              defaultValue={props.event.eventend}              
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={updateEventFunction}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventModal;