import React from 'react';

import { Link } from 'react-router';
// import { Home, Heart, Settings, Menu, X } from 'lucide-react'; Use Chakra if icons available

// const SideNav = ({ isOpen, onToggle }) => {
const SideNav = () => {
  
  return (
    <Flex maxW="1600px" mx="auto" minH="80vh" gap={4}>
      <Box flex="0 0 20%" bg="white" p={4} borderRadius="md" boxShadow="md">
      <div className='side-navbar'>
          <div className='logo-side-nav'>
            <img src='/images/flowers1.png' />
            <span>Kampong Lah</span>              
          </div>    
          <div className='side-links'>
            <ul>
          <li>
            <Link
              to='/'
              className='chakra css'
            >
              {/* Home Icon */}
              {/* ICON if required<Home className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/IbuyUbuy'
              className='chakra css'
            >
              {/* Favourites Icon */}
              {/* ICON if required <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              IbuyUbuy
            </Link>
          </li>
          <li>
            <Link
              to='/groups'
              className='chakra css'
            >
              {/* Favourites Icon */}
              {/* ICON if required <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              Groups
            </Link>
          </li>
          <li>
            <Link
              to='/events'
              className='chakra css'
            >
              {/* Favourites Icon */}
              {/* ICON if required <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              Events
            </Link>
          </li>
          <li>
            <Link
              to='/Chats'
              className='chakra css'
            >
              {/* Favourites Icon */}
              {/* ICON if required <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              Chats
            </Link>
          </li>
          <li>
            <Link
              to='/Post'
              className='chakra css'
            >
              {/* Favourites Icon */}
              {/* ICON if required <Heart className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0' /> */}
              Post
            </Link>
          </li>
        </ul>
          </div>
          <Text>E.g.:</Text>
          <img  style={{ width: '200px'}} src='/images/nd-sidebar.png' />
      </div>
      </Box>
    </Flex>
    )
}


export default SideNav;


