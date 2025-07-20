import { ButtonGroup, Card, Image, Stack, CardBody, Heading ,Text, Button, CardFooter, GridItem } from '@chakra-ui/react'
// import { useState, useContext, useEffect } from "react";
import './EventCard.css'
import { useAuth } from '@clerk/clerk-react'
import { eventAPI } from '../../services/eventService'

const EventCard = (props) => {
    const { userId, getToken } = useAuth();

    const deleteEventFunction = async () => {
        const token = await getToken();
        let paylaod = {}
        let postRequest = 'DELETE';
        const eventId= props.event._id

        const callApi = await eventAPI(postRequest, token, paylaod, eventId);
        props.seteventAdded(prev => prev + 1);

        console.log('Hellow');
    }
    const participateFunction = async (event) => {
        const token = await getToken();      
        let postRequest = 'POST';  
        const eventId= props.event._id;
        let payload = {
            "users": [userId]
        }
        let updateType = '';
        if (event.target.innerText === "Interested?") {
            updateType = 'push';
            event.target.style.backgroundColor = 'blue';
            await eventAPI(postRequest, token, payload, eventId, updateType);
            event.target.innerText = "Joining!"
        } else {
            updateType = 'pull'
            await eventAPI(postRequest, token, payload, eventId, updateType);
            event.target.style.backgroundColor = 'white';
            event.target.innerText = "Interested?"            
        }
        
    }

    const addFavFunction = async (event) => {

        let aaa = favContext.requestType = 'POST';
        const callApi = await airTableAPI(props.displayedWord, aaa);
        event.target.innerText = "Added";

        event.target.disabled = true;
    }
    
    return (
        <>
        
            <GridItem colSpan={1}>
                <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                className='event-card'
                >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={props.event.image}
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                    <Heading size='md'>{props.event.name}</Heading>

                    <Text py='2'>
                        {props.event.description}
                    </Text>

                    </CardBody>

                    <CardFooter>
                    <Stack direction='row' spacing={2} align='center'>
                        <Button colorScheme='teal' variant='outline'  onClick={participateFunction} >
                            Interested?  
                        </Button>
                        {props.event.createdby == userId ? (
                                <Button variant='solid' colorScheme='red' onClick={deleteEventFunction} >
                                    Delete
                                </Button>
                            ) : null }
                        
                    </Stack>

                    </CardFooter>
                </Stack>
                </Card>   
            </GridItem>

        </>
        
    );
};

export default EventCard;