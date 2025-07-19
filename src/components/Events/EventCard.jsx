import { Card, Image, Stack, CardBody, Heading ,Text, Button, CardFooter, GridItem } from '@chakra-ui/react'
// import { useState, useContext, useEffect } from "react";
import './EventCard.css'

const EventCard = (props) => {

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
                    {/* <Button variant='solid' colorScheme='blue'>
                        Buy Latte
                    </Button> */}
                    </CardFooter>
                </Stack>
                </Card>   
            </GridItem>

        </>
        
    );
};

export default EventCard;