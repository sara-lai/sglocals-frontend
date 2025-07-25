import { Box, Highlight, ButtonGroup, Card, Image, Stack, CardBody, Heading ,Text, Button, CardFooter, GridItem } from '@chakra-ui/react'
// import { useState, useContext, useEffect } from "react";
import { useState, useEffect } from "react";
import './EventCard.css'
import { useAuth } from '@clerk/clerk-react'
import { FaRegHeart } from "react-icons/fa";
import { eventAPI } from '../../services/eventService'
import EventModal from './EventModal'

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
    const participatingEventFunction = async (event) => {
        const token = await getToken();      
        let postRequest = 'POST';  
        const eventId= props.event._id;
        let payload = {
            "users": [userId]
        }
        let updateType = '';
        ;

        if (event.target.innerText === "Interested?") {
            updateType = 'push';
           
            await eventAPI(postRequest, token, payload, eventId, updateType);
            event.target.innerText = "Participating!"
        } else {
            updateType = 'pull'
            await eventAPI(postRequest, token, payload, eventId, updateType);
            
            event.target.innerText = "Interested?"            
        }
        props.seteventAdded(prev => prev + 1);
    }

    const addFavFunction = async (event) => {

        let aaa = favContext.requestType = 'POST';
        const callApi = await airTableAPI(props.displayedWord, aaa);
        event.target.innerText = "Added";

        event.target.disabled = true;
    }

    // useEffect(() => {
    //     props.getEventList;
    // },[]);

    
    return (
        <>
        
            <GridItem colSpan={1}>
                <Card
                direction={{ base: 'column', sm: 'column' }}
                overflow='hidden'
                variant='outline'
                className='event-card'
                width="120%"
                
                >
                <Box width="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
                    <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={props.event.image}
                    alt='image'
                    />
                </Box>           


                <Stack>

                    <CardBody>
                     {props.event.createdby == userId ? (
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <EventModal event= {props.event} seteventAdded={props.seteventAdded}></EventModal> 
                    </div>) :
                    null
                    }
                                     
                    <Heading size='md'> [{props.event.name}]</Heading>

                    <Text py='2'>
                        {props.event.description}
                    </Text>

                    <Text py='2'>
                        Start: {props.event.eventstart}
                    </Text>
                    <Text py='2'>
                        End: {props.event.eventstart}
                    </Text>

                    </CardBody>

                    <CardFooter>
                    <Stack direction='row' spacing={2} align='center'>
                        {props.event.users.includes(userId) ? (
                        <Button bgColor="blue.200" className='part' colorScheme='black' variant='outline'  onClick={participatingEventFunction} >
                            
                            Participating!  
                        </Button>
                        ) : <Button className='part' colorScheme='teal' variant='outline' onClick={participatingEventFunction} >
                            Interested?  
                        </Button>}

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