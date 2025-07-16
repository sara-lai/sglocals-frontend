import { useNavigate } from 'react-router'
import { Menu, MenuButton, MenuList, Button, Flex, Avatar, Icon, Box, Divider, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import SignOut from "./SignOut"
import './dashboard.css'

const ProfilePicMenu = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <Menu closeOnSelect={true}>
            <MenuButton>
                <Flex align="center" gap={1}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                    <Icon as={ChevronDownIcon} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList minWidth="300px" p={4}>
                <Flex direction="column" align="center" gap={2} mb={6}>
                    <Avatar size="md" src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                    <div className='avatar-name'>{currentUser.fullName}</div>
                    <div className='avatar-nhood'>{currentUser.neighbourhood}</div>
                    <MenuItem as={Button} className='btn-default' w='140px' mt={2} onClick={() => navigate('/profile/' + currentUser.user_id) }>View Profile</MenuItem>
                </Flex>
                <Divider />
                <Box><SignOut /></Box>
            </MenuList>
        </Menu>        
    )
}

export default ProfilePicMenu