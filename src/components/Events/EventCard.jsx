import { Card, Image, Stack, CardBody, Heading ,Text, Button, CardFooter, GridItem } from '@chakra-ui/react'
// import { useState, useContext, useEffect } from "react";
import './EventCard.css'

const EventCard = () => {

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
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                    <Heading size='md'>The perfect latte</Heading>

                    <Text py='2'>
                        Caffè latte is a coffee beverage of Italian origin made with espresso
                        and steamed milk.
                    </Text>
                    </CardBody>

                    <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        Buy Latte
                    </Button>
                    </CardFooter>
                </Stack>
                </Card>   
            </GridItem>

        </>
        
    );
};

export default EventCard;