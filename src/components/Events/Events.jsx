import EventCard from "./EventCard";
// import CreateEventsButton from './CreateEventsButton';
import EventForm from './EventForm/EventForm';

// import { useState, useContext, useEffect } from "react";
import { Flex, Box, Text, Grid, Button  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'

import './Events.css'

const Events = () => {
const cards = 6;
const eventCards= [];
for (let i=0; i<cards; i++) {
   eventCards.push(<EventCard />);
}


    return (
        <>
        <div className='flex'> 
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" className='sidebar' >
                <div className='side-navbar'>
                    <div className='logo-side-nav'>
                        <img src='/images/flowers1.png' />
                        <span>Kampong Lah</span>              
                    </div>    
                    <div className='side-links'>
                        <p>Home</p>
                        <p>I Buy U Buy</p>
                        <p>Groups</p>
                        <p>Events</p>
                        <p>Chats</p>
                        <p>+ Post</p>
                    </div>
                    <Text>E.g.:</Text>
                    {/* <img  style={{ width: '200px'}} src='/images/nd-sidebar.png' /> */}
                </div>
            </Box>
            <EventForm/>

            <Grid templateColumns="repeat(2, 1fr)" gap="6">

                {eventCards}
            </Grid>
        </div>


        </>

    );
};

export default Events;