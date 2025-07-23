import { Image, Flex, Text, Box, Button } from '@chakra-ui/react';

const SavedListings = ({ savedListings }) => {
    return (
        <Box>
            {savedListings.length === 0 && 
                <Flex align='center' justify='center' mt={40} ml='-30%'>
                    <Flex direction='column' gap={2} textAlign='center'>
                        <Image h='200px' src='/images/tmp-no-listings.png' />
                        <Text>Browse listings to save favourites</Text>
                    </Flex>
                </Flex>
            }
        </Box>
    )
}

export default SavedListings
