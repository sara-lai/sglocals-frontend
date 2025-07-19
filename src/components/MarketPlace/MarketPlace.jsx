import { Menu, MenuButton, MenuList, Button, Flex, Icon, Box, Text, SimpleGrid } from '@chakra-ui/react';
import './marketplace.css';
import MarketPlaceCard from './MarketPlaceCard';

const MarketPlace = () => {
  
  
  
  return (
    <div>
      <div className='dashboard-container'> 
        <Flex maxW="1600px" mx="auto" minH="80vh" gap={4}>
          <Box flex="0 0 20%" bg="white" p={4} borderRadius="md" boxShadow="md">
            <div className='marketplace-container'>
              <div className='side-navbar'>
                <div className='logo-side-nav'>
                  <img src='/images/flowers1.png' />
                  <span>Kampong Lah</span>              
                </div>
                <div className='side-links'>
                  <p>Home</p>
                  <p>I Buy U Buy</p>
                  <p>Groups</p>
                  <p>Events</p>
                  <p>Chats</p>
                  <p>+ Post</p>
                </div>
              </div>
                <Text>E.g.:</Text>
            </div>
          </Box>      
        
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