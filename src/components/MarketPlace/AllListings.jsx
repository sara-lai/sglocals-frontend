import MarketPlaceCard from './MarketPlaceCard'
import MarketplaceFilters from './MarketplaceFilters'
import MarketplaceSample from './MarketplaceSample';

import { Flex, Box, SimpleGrid, Select } from '@chakra-ui/react';


const AllListings = ({ allListings }) => {

    return (
        <>
            <MarketplaceFilters />       
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={4}>
                {allListings.map(listing => {
                    <MarketPlaceCard listing={listing}/>
                })}
                {allListings.length === 0 &&
                    <MarketplaceSample numSamples={20} />
                }
            </SimpleGrid> 
        </>
    )
}

export default AllListings 

