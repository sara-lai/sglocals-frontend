import Events from './Events';
import MyEvents from './MyEvents';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

const EventTab = () => {


    return (
        <>
            <Tabs>
            <TabList>
                <Tab>All Events</Tab>
                <Tab>My Events</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Events/>
                </TabPanel>
                <TabPanel>
                    <MyEvents/>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </>
    );
};

export default EventTab;