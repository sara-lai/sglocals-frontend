import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react'
import { Flex, Box, Text, Button  } from '@chakra-ui/react';
import { Outlet, Link } from "react-router"
import { useAuth } from '@clerk/clerk-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComments, faHandshake, faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { FiHome, FiUsers } from 'react-icons/fi'

import './Dashboard/dashboard.css' // temporary

import ProfilePicMenu from './Profile/ProfilePicMenu'
import * as userService from '../services/userService'

const Layout = () => {
    const { getToken } = useAuth()
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate()

    async function loadCurrentUser(){
        const token = await getToken()
        const user = await userService.getCurrentUser(token)
        setCurrentUser(user)
    }
    useEffect( () => {
        loadCurrentUser()
    }, [] )

    return (
        <div className='app-wrapper'>
            <div className='upper-right-profile-misc'>
                 <FontAwesomeIcon icon={faBell}  size="xl" cursor="pointer" />
                 <FontAwesomeIcon icon={faComments} size="xl" cursor="pointer"  onClick={() => navigate('/dms')} />
                <ProfilePicMenu currentUser={currentUser} />  
            </div>
            <Flex maxW="1600px" mx="auto" h="100vh" gap={4}>
                <Box flex="0 0 20%" p={4}>
                    <Flex className='side-navbar' direction='column' gap={4}>
                        <Link to="/dashboard">
                            <div className='logo-side-nav'>
                                <img src='/images/flowers1.png' />
                                <span>Kampong Lah</span>              
                            </div>   
                        </Link> 
                        <Flex direction='column' gap={7} mt={6}>
                            <Flex gap={2} alignItems='center'>
                                <Box w="2rem">
                                    <FiHome className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                </Box>
                                <Link to='/dashboard' className='nav-link'>Home</Link>
                            </Flex>
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FontAwesomeIcon icon={faHandshake}  size="xl" cursor="pointer" />
                                </Box>                                    
                                <Link to='/dashboard' className='nav-link'>I Buy U Buy</Link>
                            </Flex> 
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FiUsers className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                </Box>                                    
                                <Link to='/dashboard' className='nav-link'>Groups</Link>
                            </Flex> 
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FontAwesomeIcon icon={faCalendarCheck}  size="xl" cursor="pointer" />
                                </Box> 
                                <Link to='/dashboard' className='nav-link'>Events</Link>
                            </Flex>  
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FontAwesomeIcon icon={faComments}  size="xl" cursor="pointer" />
                                </Box>
                                <Link to='/dms' className='nav-link'>Chats</Link>
                            </Flex> 
                            <Button className='btn btn-green' maxW='200px' mt={2}>
                                Post
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box flex="0 0 80%" overflowY="auto"  p={4} className="content-scroll">
                    <Outlet context={{ currentUser, setCurrentUser }} />
                </Box>
            </Flex>
        </div>


    )
}

export default Layout