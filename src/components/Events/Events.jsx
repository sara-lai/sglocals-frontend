import EventCard from "./EventCard";
// import CreateEventsButton from './CreateEventsButton';
import EventForm from './EventForm/EventForm';
import { useState, useEffect, createContext } from "react";
import { Flex, Box, Text, Grid, Button  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { eventAPI } from '../../services/eventService'
import { useAuth } from '@clerk/clerk-react'
import './Events.css'

export const EventContext = createContext(null);

const Events = ({ events, seteventAdded, eventAdded, setEvents }) => {
const cards = 6;
const eventCards= [];
const { userId, getToken } = useAuth();

useEffect(() => {
    getEventList();
},[]);

useEffect(() => {
    console.log(eventAdded);
    getEventList(); 
},[eventAdded]);

const getEventList = async () => {
    const token = await getToken();
    let postRequest = 'GET';

    const getEvents = await eventAPI(postRequest, token);
    console.log(getEvents.users);
    setEvents(getEvents.users);
    
}

    return (
        <>
        <div className='flex'>   
            <EventForm seteventAdded={seteventAdded} />
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
                {events?.map((event, i) => (
                    <div className='eventcard' key={i} >
                        <EventContext.Provider value={event}>
                            <EventCard event={event} seteventAdded={seteventAdded} />
                        </EventContext.Provider>
                    </div>
                ))}
            </Grid>
        </div>


        </>

    );
};

export default Events;