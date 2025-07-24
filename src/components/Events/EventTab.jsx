import Events from './Events';
import MyEvents from './MyEvents';
import ParticipatingEvents from './ParticipatingEvents';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/clerk-react'
import { eventAPI } from '../../services/eventService'

const EventTab = () => {
    const { userId, getToken } = useAuth();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEventList();
    },[]);


    const getEventList = async () => {
        const token = await getToken();
        let postRequest = 'GET';

        const getEvents = await eventAPI(postRequest, token);
        console.log(getEvents.users);
        setEvents(getEvents.users);
        console.log("clicked")
    }
    return (
        <>
            <Tabs>
            <TabList>
                <Tab>All Events</Tab>
                <Tab>Your Events</Tab>
                <Tab onClick={getEventList}>Participating Events</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Events/>
                </TabPanel>
                <TabPanel>
                    <MyEvents/>
                </TabPanel>
                <TabPanel>
                    <ParticipatingEvents onClick={getEventList} />
                </TabPanel>
            </TabPanels>
            </Tabs>
        </>
    );
};

export default EventTab;