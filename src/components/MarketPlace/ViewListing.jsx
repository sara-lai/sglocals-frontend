import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router';
import { Image, Flex, Text, Box, Button, Heading, Icon, Avatar, SimpleGrid, Input } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '@clerk/clerk-react'
import './marketplace.css';
import '../Dashboard/dashboard.css' 
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MarketPlaceCard from './MarketPlaceCard';

import * as marketplaceService from '../../services/marketplaceService'

import ImageCarousel from '../../utils/ImageCarousel'

const ViewListing = () => {
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams() // get the listing id from params
    const { currentUser } = useOutletContext()
    const [listing, setListing] = useState({})
    const [allListings, setAllListings] = useState([]) // this is to show more underneath

    dayjs.extend(relativeTime)
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }

    function launchNewChat(){
        navigate(`/dms?chattingWith=${listing.userId}&aboutListing=${listing._id}`)
    }

    async function fetchListing(){
        const token = await getToken()
        const listingData = await marketplaceService.getListing(id, token)
        console.log('fetched the listing', listingData)
        setListing(listingData)

        // also fetch All listings for display more
        const listingsData = await marketplaceService.getListingsForAll(token)
        console.log('fetched all listings', listingsData)
        setAllListings(listingsData)        
    }
    useEffect(() => {
        fetchListing()
    }, [id]) // the id is needed so it will re-run everything if click on new item from within this page

    return (
        <Box>                 
            <Flex align="center" as="button" gap={2} mb={4} onClick={() => navigate('/marketplace') }>
                <Icon as={ArrowBackIcon} w={6} h={6} />
                <Text fontSize="md">All Listings</Text>
            </Flex>

            <Flex>
                <Box maxW='600px'>                 
                    {listing && listing.imageUrls?.length > 0 && 
                        <ImageCarousel imageUrls={listing.imageUrls} containOrCover='contain' />
                    }
                </Box>  
                <Flex direction='column' className='default-border' h='100%' w='350px' position="sticky" top={0} ml={4} p={5} gap={2} > 
                    <Box position='absolute' top='4' right='4' onClick={()=> console.log('todo favouriting feature')}>
                        <FontAwesomeIcon icon={faBookmark}  size="xl" cursor="pointer"/>
                    </Box>
                    <Heading size='md' maxW='260px'>{listing.title}</Heading>
                    <Text color='#576580' fontWeight='600'>${listing.price}</Text>
                    
                    {/* user info of listing creator */}
                    <Flex direction="row" align="center" gap={1} mt={2} mb={4} cursor='pointer' onClick={() => navigate("/profile/" +  listing.userId)} >
                        <Avatar sx={{ w: '3rem', h: '3rem' }} ml={2} src={listing.user?.profileImg} name={listing.user?.fullName?.[0]} />
                        <div className='post-info-set'>
                            <div className='avatar-name'>{listing.user?.fullName}</div>
                            <Flex gap={2}>
                                <p>{listing.user?.neighbourhood}</p>
                            </Flex>
                        </div>
                    </Flex>
                    <Text mb={2}>{listing.description}</Text>
                    <Text fontSize='.9rem'>{timeAgoFormat(listing.createdAt)}</Text>
                    
                    <Box className='default-border' mt={6}>
                        <Flex gap={2}>
                            <FontAwesomeIcon icon={faComments}  size="xl" cursor="pointer" />
                            <Text fontWeight='600' fontSize='.95rem'>Message {listing.user?.fullName}</Text>
                        </Flex>
                        <Flex mt={4} gap={1} align='center'>
                            <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser?.profileImg} name={currentUser?.fullName?.[0]} />                                
                            <Box w='100%' onClick={launchNewChat}>
                                <Input borderRadius='30px' pl={6} h="46px" background='#f0f2f5' value='Still have or not?'  />     
                            </Box>    
                        </Flex>
                    </Box>                                
                </Flex>
            </Flex>

            <Box mt={20}>
                <Heading size='md'>More listings in your neighbourhood</Heading>
                <Box mt={10}>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4} px={4}>
                        {allListings.map(listing => (
                            <MarketPlaceCard listing={listing}/>
                        ))}
                    </SimpleGrid>
                </Box>                        
            </Box>
            
        </Box>
    )
}

export default ViewListing