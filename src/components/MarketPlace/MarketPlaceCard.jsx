import { useNavigate, useParams, useOutletContext } from 'react-router';
import { Card,  Image, Flex, Box, Text, IconButton } from '@chakra-ui/react';
import { FiTrash } from "react-icons/fi"
import { useAuth } from '@clerk/clerk-react'
import './marketplace.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import * as marketplaceService from '../../services/marketplaceService'

const MarketPlaceCard = ({ listing }) => {
  const { getToken } = useAuth()
  const { currentUser } = useOutletContext()

  const navigate = useNavigate()
  // "time ago" date formatting
  dayjs.extend(relativeTime) 
  function timeAgoFormat(time){
      return dayjs(time).fromNow()
  }

  function formatSGD(price){
    return "S$" + price
  }

  const deleteListing = async () => {
          
    const token = await getToken()
    const deletedListing = await marketplaceService.deleteListing(token, listing._id)
    console.log('Listing deleted..', deletedListing)
    navigate('/marketplace') // redirect to marketplace after deletion
  }

  return (
    <Card minW='210px' maxW='230px' cursor='pointer' borderRadius='10px' onClick={() => navigate(`/listing/${listing._id}`)}>
      <Flex direction='column' justify='start'>
        <Box>
          <Image src={listing.imageUrls[0]} objectFit='cover' h='150px' w='100%' borderRadius='10px 10px 0 0' />      
        </Box>
        <Flex mt={2} direction='column' gap={1} p={4}>
          <Text fontWeight='500' letterSpacing='-.3px'>{formatSGD(listing.price)}</Text>
          <Text letterSpacing='-.2px' fontSize='1.1rem'> {listing.title}</Text>
          <Text mt={3} fontSize='.9rem' letterSpacing='-.3px' color='#576580'>
            {timeAgoFormat(listing.createdAt)}  ·  {listing.neighbourhood}
          </Text>
          
        </Flex>
        {listing.userId === currentUser.user_id && 
          <Flex classNamedirection="row" justify="right" gap={4} onClick={deleteListing}>
            <IconButton icon={<FiTrash />} variant="ghost" size="lg" />
          </Flex>
        }
      </Flex>
    </Card>
  )
}

export default MarketPlaceCard

