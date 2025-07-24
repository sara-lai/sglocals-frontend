import {  useOutletContext } from 'react-router'
import {  Modal,  ModalOverlay,  ModalContent,  ModalCloseButton,  Button,  Textarea, Input, Flex,  Image, Box, Heading, Switch, Select, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { FiMapPin, FiAtSign } from 'react-icons/fi'
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { uploadWidget } from '../../utils/cloudinaryUpload'
import './marketplace.css'
import * as marketplaceService from '../../services/marketplaceService'

// attempting to make this usable for new posts, reposts, and side nav launch
// open question: set the content/setContent and imageUrls HERE or in the parent(s)?
const NewListing = ({ createListing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageUrls, setImageUrls] = useState([])
    const { currentUser } = useOutletContext()

    const categoryList = [
        'appliances', 'automotive', 'baby & kids', 'bicycles', 'clothing & accessories',  'crafts',
        'electronics', 'furniture', 'garage sales', 'garden', 'home decor', 'musical instruments',
        'other', 'pet supplies', 'sports & outdoors', 'tickets', 'tools', 'toys & games', 
    ]

    const optionDisplay = (val) => {
        let words = val.split(' ')
        words = words.map(word => word[0].toUpperCase() + word.slice(1)) // standard way to capitalize a phrase
        return words.join(' ')
    }
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '',
        price: '',
        isFree: false,
        isGig: false,
        category: '',
    })    

    const { title, description, price, isFree, isGig, category } = formData
    const handleChange = (event) => {
        //setFormData({ ...formData, [event.target.name]: event.target.value }) 
        // need something non standard if using checkbox:
        const { name, value, checked, type } = event.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
    }
    const handleSubmit = () => {
        let priceNumeric = Number(price.replace(/,/g, '')) // encountering errors with commas
        const formDataWithImages = {...formData, imageUrls: imageUrls, price: priceNumeric}
        createListing(formDataWithImages)
    }
    
    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList) => {
            console.log(secureUrlsList)
            setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }      

    return (
        <Button onClick={onOpen}>New Listing
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay bg="blackAlpha.500" />

            <ModalContent className='new-listing-modal'>
                <Button className='btn btn-green' onClick={handleSubmit}>
                    Create
                </Button>                    
                <ModalCloseButton className='btn-close'/>
    
                <Flex direction="column" gap={4} m={4}>

                    <Flex gap={2}>
                        {imageUrls.map((url) => (
                            <Box mt={6}>
                                <Image src={url} boxSize="60px" objectFit="cover" />
                            </Box>
                        ))}
                        {imageUrls.length === 0 &&                 
                            <Flex direction='column' gap={2} mb={2}>       
                                <FontAwesomeIcon icon={faImages}  size='4x' cursor="pointer" color='#232f46b5'  onClick={handleImageUpload} />
                                <Text size='sm'>Upload up to 10 images</Text>
                            </Flex>
                        }
                    </Flex>         
                    <Heading size='lg'>What are you selling?</Heading> 
                    <Input name='title' value={title} onChange={handleChange} 
                        h='56px' borderRadius='14px' 
                        placeholder='Item'
                    />
                    <Textarea name='description' value={description} onChange={handleChange} 
                        minH="260px" resize="vertical" className='default-border'
                        placeholder="Describe your item"
                    />
                    <Flex gap={4}>
                        <Flex align='center' gap={2}>
                            <Text fontSize='1.1rem' opacity='.6'>$</Text>
                            <Input  name='price' value={price} onChange={handleChange}
                                h='56px' borderRadius='14px' maxW='200px'
                                placeholder='Price'
                            />
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Switch size="lg" name="isFree" isChecked={isFree} onChange={handleChange} colorScheme="blue" />
                            <Box>Free</Box>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Switch size="lg" name="isGig" isChecked={isGig} onChange={handleChange} colorScheme="blue" />
                            <Box>Gig or Job</Box>
                        </Flex>     
                    </Flex>          
                    <Select  h='56px' fontWeight='600' bg="white" color="#232f46"  fontSize='.9rem'  borderRadius="md"
                        placeholder="Category" name='category' onChange={handleChange} value={category}>
                        {categoryList.map((neighbourhood) => (
                            <option key={neighbourhood} value={neighbourhood}>
                                {optionDisplay(neighbourhood)}
                            </option>
                        ))}
                    </Select>
                    <Flex bg='#f0f2f5' p={4} w="fit-content" borderRadius='14px' gap={2} align='center'>
                        <FiMapPin className='fi-icon-thicken' color="gray.700" size="1.8rem" />  
                        Pickup at {currentUser.neighbourhood}
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal> 
        </Button> 
    )
}

export default NewListing