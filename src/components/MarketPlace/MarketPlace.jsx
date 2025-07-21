import MarketPlaceCard from './MarketPlaceCard';
import { Menu, MenuButton, MenuList, Button, Flex, Icon, Box, Text, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '@clerk/clerk-react'
import * as marketplaceService from '../../services/marketplaceService'

import './marketplace.css';


const MarketPlace = () => {
  
  const { userId, getToken } = useAuth();
  const [itemList, setItemList] = useState([]);
  const [addItem, setAddItem] = useState();

  
  return (
    <div>
      <div className='dashboard-container'> 
        <Flex maxW="1600px" mx="auto" minH="80vh" gap={4}>
          
        
            <Box flex="0 0 80%" bg="white" p={4} >
              <Flex maxW="1000px"  minH="80vh" gap={4}>
                <Box flex="0 0 70%"  bg="white" p={4}  borderRadius="md" > 
                  <img style={{ maxHeight: '80px'}} src='/images/nd-search-bar.png' />
                  <div className='marketplace-header'>
                    <h1>Welcome</h1>
                  </div>
                  <Box flex="0 0 70%"  bg="white" p={4}  borderRadius="md">
                    <Flex direction="row" align="center" justify="space-between" mb={4}>
                      <div className='marketplace-content' p='10px'>
                        <h2>A place where IbuyUbuy!</h2>
                        <button className='marketplace-post'>Post</button>
                      </div>
                    </Flex>
                  </Box>
                  <Flex maxW="800px" direction='column' align='center' justify='center' gap={2} p={2}>
                    <SimpleGrid columns={[2, null, 3]} spacing={4}>
                      <MarketPlaceCard/>
                      <MarketPlaceCard/>
                      <MarketPlaceCard/>

                      <MarketPlaceCard/>
                      <MarketPlaceCard/>
                      <MarketPlaceCard/>

                      <MarketPlaceCard/>
                      <MarketPlaceCard/>
                      <MarketPlaceCard/>
                    </SimpleGrid>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
      </div>
    </div>


)}

export default MarketPlace