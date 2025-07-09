import { Menu, MenuButton, MenuList, Button, Flex, Avatar, Icon, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'

import SignOut from "./SignOut"

const ProfilePicMenu = ({ userInfo }) => {

    console.log('what is the userInfo', userInfo)
    return (
        <Menu>
            <MenuButton>
                <Flex align="center" gap={1}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={userInfo.profileImg} name={userInfo.fullName?.[0]} />
                    <Icon as={ChevronDownIcon} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList minWidth="300px" p={4}>
                 <Flex direction="column" align="center" gap={2}>
                    <Avatar size="md" src={userInfo.profileImg} name={userInfo.fullName?.[0]} />
                    <div className='avatar-name'>{userInfo.fullName}</div>
                    <div className='avatar-nhood'>{userInfo.neighbourhood}</div>
                    <Button mt={2}>View Profile</Button>
                </Flex>
                <Box><SignOut /></Box>
            </MenuList>
        </Menu>        
    )
}

export default ProfilePicMenu