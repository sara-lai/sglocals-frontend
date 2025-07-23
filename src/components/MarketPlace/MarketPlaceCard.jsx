import { useNavigate } from 'react-router';
import { Card,  Image, Flex, Box, Text, Button, Heading } from '@chakra-ui/react';
// import { BiLike, BiChat, BiShare, BsThreeDotsVertical } from '@chakra-ui/icons';
import './marketplace.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const MarketPlaceCard = ({ listing }) => {
  const navigate = useNavigate()
  
  // "time ago" date formatting
  dayjs.extend(relativeTime) 
  function timeAgoFormat(time){
      return dayjs(time).fromNow()
  }

  function formatSGD(price){
    return "S$" + price
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
      </Flex>
    </Card>
  )
}

export default MarketPlaceCard