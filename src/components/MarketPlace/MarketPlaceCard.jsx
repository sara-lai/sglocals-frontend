
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

// import { Avatar, Card, CardHeader, CardBody, CardFooter, IconButton, Image, Flex, Box, Text, Button, Heading } from '@chakra-ui/react';
// // import { BiLike, BiChat, BiShare, BsThreeDotsVertical } from '@chakra-ui/icons';
// import './marketplace.css';

// const MarketPlaceCard = () => {
  
  
//   return (
//     <Card maxW='md'>
//       <CardHeader>
//         <Flex spacing='4'>
//           <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
//             <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

//             <Box>
//               <Heading size='sm'>Segun Adebayo</Heading>
//               <Text>Creator, Chakra UI</Text>
//             </Box>
//             </Flex>
//               <IconButton
//                 variant='ghost'
//                 colorScheme='gray'
//                 aria-label='See menu'
//                 // icon={<BsThreeDotsVertical />}
//               />
//             </Flex>
//       </CardHeader>
//       <Image
//       objectFit='cover'
//       src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
//       alt='Chakra UI'
//       />
//       <CardBody>
//         <Text>
//           With Chakra UI, I wanted to sync the speed of development with the speed
//         </Text>
//       </CardBody>
    

//       <CardFooter justify='space-between'
//         flexWrap='wrap'
//         sx={{
//           '& > button': {
//             minW: '75px',
//           },
//         }}
//       >
//         <Button flex='1' variant='ghost' >
//           Like
//         </Button>
//         <Button flex='1' variant='ghost' >
//           Comment
//         </Button>
//         <Button flex='1' variant='ghost' >
//           Share
//         </Button>
//       </CardFooter>
//   </Card>
//   )
// }

// export default MarketPlaceCard