
import { Navigate, useNavigate, useOutletContext } from 'react-router'
import { Menu, MenuButton, MenuList, Button, Flex, Icon, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '@clerk/clerk-react'
import MarketPlaceCard from './MarketPlaceCard';
import AllListings from './AllListings';
import NewListing from './NewListing';
import YourListings from './YourListings';
import SavedListings from './SavedListings'
import * as marketplaceService from '../../services/marketplaceService'

import './marketplace.css';


const MarketPlace = () => {
  
  const { currentUser } = useOutletContext()
  const { userId, getToken } = useAuth();
  const [itemList, setItemList] = useState([]);
  const [addItem, setAddItem] = useState();
  const [tab, setTab] = useState('all')
  const [allListings, setAllListings] = useState([])
  
  // Fetch data for marketplace when component mounts
  const fetchDataForMarketplace = async () => {
      
    const token = await getToken()
    const listingsData = await marketplaceService.getListingsForAll(token)
    console.log('lets see the listingsData',listingsData )
    setAllListings(listingsData)
  }

  useEffect(() => {
    fetchDataForMarketplace();
  }, [])

    const navigate = useNavigate()

    const createListing = async (newListingData) => {
      // one approach: redirect them to the newly created listing
      const token = await getToken()
      const createdListing = await marketplaceService.createNewListing(newListingData, token)
      console.log('created a listing', createdListing)
      navigate(`/listing/${createdListing._id}`)
    }
  

  return (
      <div className='marketplace-container'> 
        <Flex gap={10}>
          <Text className={tab === 'all' ? 'active tab' : 'tab'} onClick={()=> setTab('all')}>All Listings</Text>
          <Text className={tab === 'yours' ? 'active tab' : 'tab'} onClick={()=> setTab('yours')}>Your Listings</Text>
          <Text className={tab === 'saved' ? 'active tab' : 'tab'} onClick={()=> setTab('saved')}>Saved Listings</Text>
          
          <NewListing createListing={createListing} />
        </Flex>
        <Box className='hu' mt={4}>
        
          {tab === 'all' &&  <AllListings allListings={allListings} />}
          {/* {tab === 'yours' &&  <YourListings />}
          {tab === 'saved' &&  <SavedListings />} */}
        </Box>
        
    </div>


)}

export default MarketPlace