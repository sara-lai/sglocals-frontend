import { Menu, MenuButton, MenuList, Button, Flex, Avatar, Icon, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'

import SignOut from "./SignOut"

const ProfilePicMenu = ({ currentUser }) => {

    return (
        <Menu>
            <MenuButton>
                <Flex align="center" gap={1}>
                    <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                    <Icon as={ChevronDownIcon} w={4} h={4} />
                </Flex>
            </MenuButton>
            <MenuList minWidth="300px" p={4}>
                 <Flex direction="column" align="center" gap={2}>
                    <Avatar size="md" src={currentUser.profileImg} name={currentUser.fullName?.[0]} />
                    <div className='avatar-name'>{currentUser.fullName}</div>
                    <div className='avatar-nhood'>{currentUser.neighbourhood}</div>
                    <Button mt={2}>View Profile</Button>
                </Flex>
                <Box><SignOut /></Box>
            </MenuList>
        </Menu>        
    )
}

export default ProfilePicMenu