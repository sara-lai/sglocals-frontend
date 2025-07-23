import {  useOutletContext } from 'react-router'
import { Menu, MenuButton, MenuList, Button, Flex, Icon, Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '@clerk/clerk-react'
import AllListings from './AllListings';
import YourListings from './YourListings';
import SavedListings from './SavedListings'

import * as marketplaceService from '../../services/marketplaceService'

import './marketplace.css';

const MarketPlace = () => {
  const { getToken } = useAuth();
  const [itemList, setItemList] = useState([]);
  const [addItem, setAddItem] = useState();
  const [tab, setTab] = useState('all')

  const [filteredListings, setFilteredListings] = useState([])
  const [allListings, setAllListings] = useState([]) // need reference to all listings for filtering each time
  const [yourListings, setYourListings] = useState([])
  const [savedListings, setSavedListings] = useState([])

  async function fetchDataForMarketplace(){
    const token = await getToken()

    // get all listings (later scope to neighbourhood)
    const listingsData = await marketplaceService.getListingsForAll(token)
    setAllListings(listingsData)
    setFilteredListings(listingsData) // start will all data

    // get your listings
    const yourListingsData = await marketplaceService.getListingsForCurrentUser(token)
    setYourListings(yourListingsData)

    // get saved listings 
    const savedListingsData = await marketplaceService.getSavedListings(token)
    setSavedListings(savedListingsData)    
  }

  useEffect(() => {
    fetchDataForMarketplace()
  }, [])

  return (
      <div className='marketplace-container'> 
        <Flex gap={10}>
          <Text className={tab === 'all' ? 'active tab' : 'tab'} onClick={()=> setTab('all')}>All Listings</Text>
          <Text className={tab === 'yours' ? 'active tab' : 'tab'} onClick={()=> setTab('yours')}>Your Listings</Text>
          <Text className={tab === 'saved' ? 'active tab' : 'tab'} onClick={()=> setTab('saved')}>Saved Listings</Text>
        </Flex>
        <Box mt={6}>
          {tab === 'all' &&  <AllListings allListings={allListings} filteredListings={filteredListings} setFilteredListings={setFilteredListings} />}
          {tab === 'yours' &&  <YourListings yourListings={yourListings} />}
          {tab === 'saved' &&  <SavedListings savedListings={savedListings} />}
        </Box>
    
    </div>

)}

export default MarketPlace