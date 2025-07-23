import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { Image, Flex, Text, Box, Button } from '@chakra-ui/react';
import {  useDisclosure } from '@chakra-ui/react'
import { useAuth } from '@clerk/clerk-react'
import NewListing from './NewListing';
import MarketPlaceCard from './MarketPlaceCard';

import * as marketplaceService from '../../services/marketplaceService'

const YourListings = ({ yourListings }) => {
    const { isOpen, onOpen, onClose } = useDisclosure() // modals
    const { getToken } = useAuth();
    const navigate = useNavigate()

    async function createListing(newListingData){
        // one approach: redirect them to the newly created listing
        const token = await getToken()
        const createdListing = await marketplaceService.createNewListing(newListingData, token)
        console.log('created a listing', createdListing)
        navigate(`/listing/${createdListing._id}`)
    }

    return (
        <Box>
            {yourListings.length > 0 && 
                <>
                    <Button className='btn-default' mb={6} onClick={onOpen}>Create a listing</Button>
                    <Flex gap={4} mt={6}>
                        {yourListings.map(listing => (
                            <MarketPlaceCard listing={listing}/>
                        ))}                            
                    </Flex>     
                </>          
            }    
            {yourListings.length === 0 && 
                <Flex align='center' justify='center' mt={40} ml='-30%'>
                    <Flex direction='column' gap={2}>
                        <Image h='200px' src='/images/tmp-no-listings.png' />
                        <Button className='btn-default' onClick={onOpen}>Create a listing</Button>
                    </Flex>
                </Flex>
            }
            {/* new Listing is a modal window with the form */}
            <NewListing isOpen={isOpen} onClose={onClose} createListing={createListing} />
        </Box>
    )
}

export default YourListings
