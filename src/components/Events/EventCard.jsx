import { Card, Image, Stack, CardBody, Heading ,Text, Button, CardFooter, GridItem } from '@chakra-ui/react'
// import { useState, useContext, useEffect } from "react";
import './EventCard.css'
import { useAuth } from '@clerk/clerk-react'
import { eventAPI } from '../../services/eventService'

const EventCard = (props) => {
    const { userId, getToken } = useAuth();

    const deleteEventFunction = async () => {
        const token = await getToken();
        const requestObj = []
        // const user = await userService.getCurrentUser(token)
        let postRequest = 'DELETE';
        const eventId= props.event._id

        const callApi = await eventAPI(postRequest, token, requestObj, eventId);
        props.seteventAdded(prev => prev + 1);

        console.log('Hellow');
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
                    {props.event.createdby == userId ? (
                            <Button variant='solid' colorScheme='red' onClick={deleteEventFunction} >
                                Delete
                            </Button>
                        ) : null }
                    
                    </CardFooter>
                </Stack>
                </Card>   
            </GridItem>

        </>
        
    );
};

export default EventCard;