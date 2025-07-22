import { Card,  Image, Text } from '@chakra-ui/react';
const MarketplaceSample = ({ numSamples }) => {

    const sampleArr = Array(numSamples).fill()
    return (
        <>
            {sampleArr.map( sample => (
                <Card minW='180px' maxW='220px'>
                    <Image src='/images/mp-sample.png' />
                    <Text>price</Text>
                    <Text> title</Text>
                    <Text>time & neighbourhood</Text>      
                </Card>    
            ))}    
        </>
    )
}

export default MarketplaceSample