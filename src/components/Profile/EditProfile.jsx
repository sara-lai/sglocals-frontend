// bug note - if navigating to profile/edit directly, currentUser may not be done loading, need some way to re-render
import { useState } from 'react'
import {  useOutletContext, useNavigate } from 'react-router'
import { Box, Flex, Button, Avatar, Textarea, Input, FormLabel, Text, Icon, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FaImage } from 'react-icons/fa'
import { useAuth } from '@clerk/clerk-react'
import * as userService from '../../services/userService'
import { uploadWidget } from '../../utils/cloudinaryUpload'
import './profile.css'

const EditProfile = () => {
    const { getToken } = useAuth()
    const { currentUser, setCurrentUser } = useOutletContext() 
    const navigate = useNavigate()
    const bannerImgUrl = currentUser.profileBannerImg 

    // generic form handling   
    const [formData, setFormData] = useState({
        bio: currentUser?.bio || '',  // default vals from the DB
        hometown: currentUser?.hometown ||  '',
        profileImg: currentUser?.profileImg || '',
        profileBannerImg: currentUser?.profileBannerImg || '/images/sg-skyline-sunset3.jpg',
    })    
    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()        
    
        const newUserProfile = { 
            ...currentUser,  // copy, react law
            bio: formData.bio, 
            hometown: formData.hometown,
            profileImg: formData.profileImg,
            profileBannerImg: formData.profileBannerImg
        } 
        
        // send to BE with clerk token
        const token = await getToken()
        const userProfile = await userService.updateUserProfile(newUserProfile, token)

        console.log('updated userProfile', userProfile)
        
        setCurrentUser(newUserProfile)
        navigate('/profile/' + currentUser.user_id)
    }    

    const handleImageUpload = () => { 
        uploadWidget((secureUrl) => {
            console.log(secureUrl)
            // todo - need to track if the secureUrl is part of the profile img or the banner img.... 
            // testing only for profileimg             
            setFormData({ ...formData, profileImg: secureUrl })
        })
    }    

    return (
        <div className='profile-page-wrapper'>
            <Flex align="center" as="button" gap={2} mb={4} onClick={() => navigate('/profile/' + currentUser.user_id) }>
                <Icon as={ArrowBackIcon} w={6} h={6} />
                <Text fontSize="md">Profile</Text>
            </Flex>

            <Box className='default-border' w='600px' pl={0} pr={0} >
                <Flex direction='column'>
                    <Box h='220px' position="relative" backgroundImage={formData.profileBannerImg} backgroundSize="cover" backgroundPosition="15% 15%" >
                        <Flex className='upload-banner-img-box' gap={2} align="center">
                            <IconButton icon={<FaImage />} size="sm" variant="ghost" color="black" />
                            <Text fontSize="sm">Upload cover photo</Text>   
                        </Flex>                     
                    </Box>
                    <Box pl={6}>
                        <Box position='relative' maxW='130px' _hover={{ cursor: 'pointer' }} onClick={handleImageUpload} >
                            <Avatar className='avatar-profile-page' size="2xl" src={formData.profileImg} name={currentUser.fullName?.[0]} />
                            <Box>
                                <IconButton icon={<FaImage />} size="md" color="black" position="absolute"  bottom="4px" right="8px" borderRadius="full" />                            
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