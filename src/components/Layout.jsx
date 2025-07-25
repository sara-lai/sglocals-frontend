import { useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react'
import { Flex, Box, Text, Button, Input, InputGroup, InputLeftElement  } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
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
    const [query, setQuery] = useState('')
    const [searchType, setSearchType] = useState("Kampong Lah")
    const { pathname } = useLocation()
    
    async function loadCurrentUser(){
        const token = await getToken()
        const user = await userService.getCurrentUser(token)
        setCurrentUser(user)
    }
    useEffect( () => {
        loadCurrentUser()
    }, [] )

    // feature for dynamic "post" button on SideNav
    //  send signal to child component (via outlet context) to launch child's modal
    // todo - expand this to do something on every page
    const [createFromSidebar, setCreateFromSidebar] = useState(false)
    function handleCreateFromSidebar(){
        setCreateFromSidebar(true)
        if (pathname.startsWith('/groups/') || pathname.startsWith('/dashboard')) { // the viewGroup page & dashboard have special behavior
            return
        } else {
            navigate('/dashboard')
        }        
    }

    useEffect(() => {
        // adaptive search bar!
        if (pathname.startsWith('/dashboard')) {
            setSearchType('Kampong Lah')
        }
        if (pathname.startsWith('/marketplace')) {
            setSearchType('Marketplace')
        }   
        if (pathname.startsWith( '/listing')) {
            setSearchType('Marketplace')
        }            
        if (pathname.startsWith( '/groups')) {
            setSearchType('Groups')
        }     
        if (pathname.startsWith('/events')) {
            setSearchType('Events')
        }    
        if (pathname.startsWith('/dms')) {
            setSearchType('Neighbours')
        }   
        if (pathname.startsWith('/profile')) {
            setSearchType('Kampong Lah')
        }                    
    }, [pathname])

    return (
        <div className='app-wrapper'>
            <Flex  justify="space-between" align="center" gap={4}>
                <Link to="/dashboard">
                    <div className='logo-top-nav'>
                        <img src='/images/flowers1.png' />
                        <span>Kampong Lah</span>              
                    </div>   
                </Link>       
                <Box> 
                    <InputGroup className='global-search-bar' size="md" minW='440px' ml="-120px" mt={3} mb={2} >
                        <InputLeftElement pointerEvents="none" fontSize='1.5rem'>
                            <SearchIcon color="gray.700" />
                        </InputLeftElement>
                        <Input value={query} name='query' borderRadius='30px' borderColor="gray.300" onChange={(e) => setQuery(e.target.value) } 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setQuery('')
                                    navigate(`/search?type=${searchType}&query=${encodeURIComponent(query)}`) // otherwise spaces are a problem
                                }
                            }}                        
                        />
                        {!query && (
                            <>
                                {/* for dynamically change search display based on page */}
                                <Box position="absolute" top="50%" left="50px" transform="translateY(-50%)" color='#232f46' pointerEvents="none"> {/* pointerEvents=none means can click through to input */}
                                    Search <b>{searchType}</b>
                                </Box>
                            </>
                        )}                                            
                    </InputGroup>                     
                </Box>

                <div className='upper-right-profile-misc'>
                    <FontAwesomeIcon icon={faBell}  size="xl" cursor="pointer" />
                    <FontAwesomeIcon icon={faComments} size="xl" cursor="pointer"  onClick={() => navigate('/dms')} />
                    <ProfilePicMenu currentUser={currentUser} />  
                </div>
            </Flex>
            <Flex maxW="1600px" mx="auto" h="100vh" gap={4}>
                <Box flex="0 0 20%" p={4} pt={0}>
                    <Flex className='side-navbar' direction='column' gap={4}>
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
                                <Link to='/marketplace' className='nav-link'>I Buy U Buy</Link>
                            </Flex> 
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FiUsers className='fi-icon-thicken' color="gray.700" size="1.5rem" />
                                </Box>                                    
                                <Link to='/groups' className='nav-link'>Groups</Link>
                            </Flex> 
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FontAwesomeIcon icon={faCalendarCheck}  size="xl" cursor="pointer" />
                                </Box> 
                                <Link to='/events' className='nav-link'>Events</Link>
                            </Flex>  
                            <Flex gap={2}  alignItems='center'>
                                <Box w="2rem">
                                    <FontAwesomeIcon icon={faComments}  size="xl" cursor="pointer" />
                                </Box>
                                <Link to='/dms' className='nav-link'>Chats</Link>
                            </Flex> 
                            <Button className='btn btn-green' maxW='200px' mt={2} onClick={handleCreateFromSidebar}>
                                Post
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box flex="0 0 80%" overflowY="auto"  p={2} className="content-scroll" mb={20}> {/* mb because sometimes content cuts off bottom */}
                    <Outlet context={{ currentUser, setCurrentUser, createFromSidebar, setCreateFromSidebar  }} />
                </Box>
            </Flex>
        </div>


    )
}

export default Layout