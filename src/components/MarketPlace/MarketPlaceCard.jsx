import { Card,  Image, Flex, Box, Text, Button, Heading } from '@chakra-ui/react';
// import { BiLike, BiChat, BiShare, BsThreeDotsVertical } from '@chakra-ui/icons';
import './marketplace.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const MarketPlaceCard = ({ listing }) => {

    // "time ago" date formatting
    dayjs.extend(relativeTime) 
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }
  
  return (
    <Card minW='180px' maxW='220px'>
      
      <Image src='/images/mp-sample.png' />      
      <Text>{listing.price}</Text>
      <Text> {listing.title}</Text>
      <Text>{timeAgoFormat(listing.createdAt)} - {listing.neighbourhood}</Text>
    </Card>
  )
}

export default MarketPlaceCard