import { useState } from 'react'
import {  useOutletContext, useNavigate } from 'react-router'
import { Box, Flex, Button, Avatar, Textarea, Input, FormLabel, Text, Icon, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FaImage } from 'react-icons/fa'
import { useAuth } from '@clerk/clerk-react'
import './profile.css'

import * as userService from '../../services/userService'

const EditProfile = () => {
    const { getToken } = useAuth()
    const { currentUser, setCurrentUser } = useOutletContext() 
    const navigate = useNavigate()
    const bannerImgUrl = currentUser.bannerImg || '/images/sg-skyline-sunset3.jpg'

    // generic form handling   
    const [formData, setFormData] = useState({
        bio: currentUser?.bio || '',  // default vals from the DB
        hometown: currentUser?.hometown ||  ''
    })    
    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()        
    
        const newUserProfile = { ...currentUser, bio: formData.bio, hometown: formData.hometown }  // copy data (react law)
        
        // send to BE with clerk token
        const token = await getToken()
        const userProfile = await userService.updateUserProfile(newUserProfile, token)

        console.log('updated userProfile', userProfile)
        
        setCurrentUser(newUserProfile)
        navigate('/profile')
    }    

    return (
        <div className='profile-page-wrapper'>
            <Flex align="center" as="button" gap={2} mb={4} onClick={() => navigate('/profile') }>
                <Icon as={ArrowBackIcon} w={6} h={6} />
                <Text fontSize="md">Profile</Text>
            </Flex>

            <Box className='default-border' w='600px' pl={0} pr={0} >
                <Flex direction='column'>
                    <Box h='220px' position="relative" backgroundImage={bannerImgUrl} backgroundSize="cover" backgroundPosition="15% 15%" >
                        <Flex className='upload-banner-img-box' gap={2} align="center">
                            <IconButton icon={<FaImage />} size="sm" variant="ghost" color="black" />
                            <Text fontSize="sm">Upload cover photo</Text>   
                        </Flex>                     
                    </Box>
                    <Box pl={6}>
                        <Box as="button" position='relative' maxW='130px' onClick={console.log('todo')}>
                            <Avatar className='avatar-profile-page' size="2xl" src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                            <Box>
                                <Icon icon={<FaImage />} size="md" color="black" position="absolute"  bottom="4px" right="8px" borderRadius="full" />                            
                            </Box>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Flex direction="column" gap={10} p={6}>
                                <Box>
                                    <FormLabel htmlFor='bio'>Bio</FormLabel>
                                    <Textarea minH="180px" pt={4} name="bio" value={formData.bio} onChange={handleChange}
                                        placeholder="Tell your neighbours a bit about yourself"
                                    />
                                </Box>
                                <Box>
                                    <FormLabel htmlFor='hometown'>Hometown (if not Singapore)</FormLabel>
                                    <Input p={4} h="60px" name="hometown" value={formData.hometown} onChange={handleChange}
                                        placeholder=".e.g. Adelaide"
                                    />
                                </Box>  
                                <Box>
                                    <i>To change name or neighbourhood, please <Text as="span" textDecoration="underline"  _hover={{ cursor: 'pointer' }}>contact support</Text></i>
                                </Box> 
                                <Flex justify="flex-end">
                                    <Button type="submit" h="46px" className="btn-default btn-lg" >Save</Button>
                                </Flex>                         
                            </Flex>
                        </form>
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}

export default EditProfile