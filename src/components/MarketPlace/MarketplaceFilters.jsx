import { useState } from 'react';
import { Flex, Box, Select, Button, Text } from '@chakra-ui/react';

const MarketplaceFilters = ({ selectCategory, selectNeighbourhood, selectFree, selectGig }) => {

    const categoryList = [
        'all categories', 'appliances', 'automotive', 'baby & kids', 'bicycles', 'clothing & accessories',  'crafts',
        'electronics', 'furniture', 'garage sales', 'garden', 'home decor', 'musical instruments',
        'other', 'pet supplies', 'sports & outdoors', 'tickets', 'tools', 'toys & games', 
    ]

    // should cooridnate with onboarding neighbourhoods
    const neighbourhoodList = [
        'all neighbourhoods', 'alexandra', 'ang mo kio', 'bedok', 'bishan', 'bukit batok', 'bukit merah', 'bukit panjang',
        'bukit timah', 'choa chu kang', 'clementi', 'geylang', 'hougang', 'jurong east', 'jurong west',
        'kallang', 'katong', 'kembangan', 'little india', 'marina bay', 'marine parade', 'novena',
        'orchard', 'pasir ris', 'punggol', 'queenstown', 'river valley', 'sembawang', 'sengkang',
        'sentosa', 'serangoon', 'siglap', 'tampines', 'tanglin', 'tanjong pagar', 'telok blangah',
        'tengah', 'tiong bahru', 'toa payoh', 'woodlands', 'yishun'
    ]

    function optionDisplay(val){
        let words = val.split(' ')
        words = words.map(word => word[0].toUpperCase() + word.slice(1)) // standard way to capitalize a phrase
        return words.join(' ')
    }

    // saving filter values  maybe for display
    const [category, setCategory]  = useState('')
    const [neighbourhood, setNeighbourhood] = useState('')
    const [isFree, setIsFree] = useState(false)
    const [isGig, setIsGig] = useState(false)   

    function handleCategories(event){
        const val = event.target.value
        setCategory(val)
        selectCategory(val) // send off to parent to do filtering
    }
    function handleNeighbourhoods(event){
        const val = event.target.value
        setNeighbourhood(val)      
        selectNeighbourhood(val)  
    }
    function handleIsFree(event){
        setIsFree(!isFree)      
        selectFree(!isFree)
        setIsGig(false)          
    }
    function handleIsGig(event){
        setIsGig(!isGig)      
        selectGig(!isGig) 
        setIsFree(false)         
    }

    return (
        <Flex gap={4} mb={8} mt={-2}>
            <Select  w='240px' fontWeight='600' bg="white" color="#232f46"  fontSize='.9rem'  borderRadius="md" cursor='pointer'
                placeholder="Categories" name="category" onChange={handleCategories} value={category}>
                {categoryList.map((neighbourhood) => (
                    <option key={neighbourhood} value={neighbourhood}>
                        {optionDisplay(neighbourhood)}
                    </option>
                ))}
            </Select>   

            <Select  w='240px' fontWeight='600' bg="white" color="#232f46" fontSize='.9rem' borderRadius="md" cursor='pointer'
                placeholder="Neighbourhoods" name="neighbourhood" onChange={handleNeighbourhoods} value={neighbourhood}>
                {neighbourhoodList.map((neighbourhood) => (
                    <option key={neighbourhood} value={neighbourhood}>
                        {optionDisplay(neighbourhood)}
                    </option>
                ))}
            </Select>  

            <Button className={`minimal-toggle-btn ${isFree && 'current-border'}`} h='40px !important' onClick={handleIsFree}>Free</Button>
            <Button className={`minimal-toggle-btn ${isGig && 'current-border'}`}  h='40px !important' onClick={handleIsGig}>Gigs & Jobs</Button>
        </Flex>           
    )
}

export default MarketplaceFilters