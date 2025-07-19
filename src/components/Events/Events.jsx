import EventCard from "./EventCard";
// import CreateEventsButton from './CreateEventsButton';
import EventForm from './EventForm/EventForm';
import { useState, useEffect } from "react";
import { Flex, Box, Text, Grid, Button  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { eventAPI } from '../../services/eventService'
import { useAuth } from '@clerk/clerk-react'

import './Events.css'

const Events = () => {
const cards = 6;
const eventCards= [];
const { userId, getToken } = useAuth();
const [events, setEvents] = useState([]);
const [eventAdded, seteventAdded] = useState();

for (let i=0; i<cards; i++) {
   eventCards.push(<EventCard key={i}/>);
}

// Set in a FavCard usestate for each favorite word
useEffect(() => {
    getEventList();
},[]);

useEffect(() => {
    
},[events]);

useEffect(() => {
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
            <EventForm seteventAdded={seteventAdded}/>
            <Grid templateColumns="repeat(2, 1fr)" gap="6">

            {events?.map((event, i) => (
                <div className='eventcard' key={i} >
                {/* <EventCard eachEvent={eachEvent} /> */}
                <EventCard event={event} />
                </div>
            ))} 
            </Grid>
        </div>


        </>

    );
};

export default Events;