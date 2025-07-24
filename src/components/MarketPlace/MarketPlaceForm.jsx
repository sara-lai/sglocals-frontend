import {  useOutletContext } from 'react-router'
import { Menu, MenuButton, MenuList, Button, Flex, Icon, Box, Text, Modal,ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, FormControl, ModalFooter, FormLabel, Select } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '@clerk/clerk-react'
import { useDisclosure } from '@chakra-ui/react'
import { createNewListing } from '../../services/marketplaceService'

const MarketPlaceForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getToken } = useAuth();

  const categoryList = [
        'appliances', 'automotive', 'baby & kids', 'bicycles', 'clothing & accessories',  'crafts',
        'electronics', 'furniture', 'garage sales', 'garden', 'home decor', 'musical instruments',
        'other', 'pet supplies', 'sports & outdoors', 'tickets', 'tools', 'toys & games', 
    ]
  
  const [formData, setFormData] = useState({ 
      title: '', 
      description: '',
      price: '',
      isFree: false,
      isGig: false,
      category: '',
  })

  const optionDisplay = (val) => {
      let words = val.split(' ')
      words = words.map(word => word[0].toUpperCase() + word.slice(1)) // standard way to capitalize a phrase
      return words.join(' ')
  }
  const handleChange = (event) => {
        //setFormData({ ...formData, [event.target.name]: event.target.value }) 
        // need something non standard if using checkbox:
        const { name, value, checked, type } = event.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
    }
  
  const postItem = async () => {
    try {
      const token = await getToken();
      const payload = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await createNewListing(payload, token);
      console.log("New Listing Created:", response);
      onClose(); // close modal on success
    } catch (err) {
      console.error("Failed to post item:", err);
    }
  };

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen}>New Listing</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
                placeholder="Name"
                name="name"
                value={formData.title}
                onChange={handleChange}
                ref={initialRef}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input 
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
              <Input 
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
              />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
              <Select 
              placeholder='Category' 
              id='category'
              name='category' 
              value={formData.category}
              onChange={handleChange} 
              />
              {categoryList.map((neighbourhood) => (
                <option key={neighbourhood} value={neighbourhood}>
                    {optionDisplay(neighbourhood)}
                </option>
            ))}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={postItem}>
              Post Item
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MarketPlaceForm;