import { useEffect, useState } from 'react'
import { Flex, Box, Text  } from '@chakra-ui/react';
import { Outlet, Link } from "react-router"
import { useAuth } from '@clerk/clerk-react'

import './Dashboard/dashboard.css' // temporary

import ProfilePicMenu from './Dashboard/ProfilePicMenu'
import * as userService from '../services/userService'

const Layout = () => {
    const { getToken } = useAuth()
    const [currentUser, setCurrentUser] = useState({})

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
                <ProfilePicMenu currentUser={currentUser} />  
            </div>
            <Flex maxW="1600px" mx="auto" h="100vh" gap={4}>
                <Box flex="0 0 20%" p={4}>
                    <div className='side-navbar'>
                        <div className='logo-side-nav'>
                            <img src='/images/flowers1.png' />
                            <span>Kampong Lah</span>              
                        </div>    
                        <div className='side-links'>
                            <Link to='/dashboard' className='nav-link'>Home</Link>
                            <p>I Buy U Buy</p>
                            <p>Groups</p>
                            <p>Events</p>
                            <p>Chats</p>
                            <p>+ Post</p>
                        </div>
                        <Text>E.g.:</Text>
                        <img  style={{ width: '200px'}} src='/images/nd-sidebar.png' />
                    </div>
                </Box>
                <Box flex="0 0 80%" overflowY="auto"  p={4} className="content-scroll">
                    <Outlet context={{ currentUser }} />
                </Box>
            </Flex>
        </div>


    )
}

export default Layout