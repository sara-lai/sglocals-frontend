import { useState } from 'react';
import { Flex, Box, Select, Button, Text } from '@chakra-ui/react';

const MarketplaceFilters = () => {

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

    // generic controlled form stuff 
    const [formData, setFormData] = useState({
        category: '',
        neighbourhood: '',        
    })
    const { neighbourhood, category } = formData
    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Flex gap={4} mb={8}>
            <Select  w='240px' fontWeight='600' bg="white" color="#232f46"  fontSize='.9rem'  borderRadius="md" name="category" 
                placeholder="Categories" onChange={handleChange} value={category}>
                {categoryList.map((neighbourhood) => (
                    <option key={neighbourhood} value={neighbourhood}>
                        {optionDisplay(neighbourhood)}
                    </option>
                ))}
            </Select>   

            <Select  w='240px' fontWeight='600' bg="white" color="#232f46" fontSize='.9rem' borderRadius="md" 
                placeholder="Neighbourhoods" name="neighbourhood" onChange={handleChange} value={neighbourhood}>
                {neighbourhoodList.map((neighbourhood) => (
                    <option key={neighbourhood} value={neighbourhood}>
                        {optionDisplay(neighbourhood)}
                    </option>
                ))}
            </Select>  

            <Button className='minimal-toggle-btn' h='40px !important'>Free</Button>
            <Button className='minimal-toggle-btn' h='40px !important'>Gigs & Jobs</Button>
        </Flex>           
    )
}

export default MarketplaceFilters