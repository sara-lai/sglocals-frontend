import { Menu, MenuButton, MenuList, MenuItem, Flex, Avatar, Icon, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'

import SignOut from "./SignOut"

const ProfilePicMenu = ({ userInfo }) => {

    console.log('what is the userInfo', userInfo)
    return (
        <Menu>
            <MenuButton>
                <Flex align="center" gap={1}>
                    <Avatar size="sm" src={userInfo.profileImg} name={userInfo.fullName || 'User'} />
                    <Icon as={ChevronDownIcon} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList>
                 <Flex direction="column" align="center" gap={2}>
                    <Avatar size="md" src={userInfo.profileImg} name={userInfo.fullName || 'User'} />
                    <p>{userInfo.fullName}</p>
                    <p>{userInfo.neighbourhood}</p>
                </Flex>
                <MenuItem>View Profile</MenuItem>
                <Box><SignOut /></Box>
            </MenuList>
        </Menu>        
    )
}

export default ProfilePicMenu