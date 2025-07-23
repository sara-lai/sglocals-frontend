import MarketPlaceCard from './MarketPlaceCard'
import MarketplaceFilters from './MarketplaceFilters'

import { Flex, Box, SimpleGrid, Image, Text } from '@chakra-ui/react';

const AllListings = ({ allListings, filteredListings, setFilteredListings }) => {

    // filter functions
    function selectCategory(category){
        // steps: copy allListings, then filter filteredListings, then set setFilteredListings
        const fullSet = [...allListings] // does structuredClone matter here?
        let subSet = fullSet.filter(item => item.category === category)
        if (category === 'all categories'){
            subSet = fullSet
        }
        setFilteredListings(subSet)
    }    
    function selectNeighbourhood(neighhourhood){
        const fullSet = [...allListings] 
        let subSet = fullSet.filter(item => item.neighbourhood === neighhourhood)
        if (neighhourhood === 'all neighbourhoods'){     
            subSet = fullSet   
        }
        setFilteredListings(subSet)
    }
    function selectFree(isFree){
        const fullSet = [...allListings]
        const subSet = fullSet.filter(item => item.isFree === isFree)
        setFilteredListings(subSet)
    }
    function selectGig(isGig){
        const fullSet = [...allListings]
        const subSet = fullSet.filter(item => item.isGig === isGig)
        setFilteredListings(subSet)
    }            

    return (
        <>
            <Box position="sticky" top={0} zIndex={10} bg="white">
                <MarketplaceFilters 
                    selectCategory={selectCategory} 
                    selectNeighbourhood={selectNeighbourhood}
                    selectFree={selectFree}
                    selectGig={selectGig}
                />       
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4} px={4}>
                {filteredListings.map(listing => (
                    <MarketPlaceCard listing={listing}/>
                ))}
            </SimpleGrid> 
                {filteredListings.length === 0 &&
                    <Flex align='center' justify='center' mt={20} ml='-30%'>
                        <Flex direction='column' gap={2} textAlign='center'>
                            <Image src='/images/tmp-keep-searching.png' maxH='300px'/>
                            <Text fontWeight='600' fontSize='1.2rem'>Keep Searching</Text>
                            <Text>Not much here currently</Text>
                        </Flex>
                    </Flex>                    
                }            
        </>
    )
}

export default AllListings 

