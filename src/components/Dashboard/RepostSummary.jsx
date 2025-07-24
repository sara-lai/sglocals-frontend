import {  Avatar,  Box,  Flex, Image } from '@chakra-ui/react'
import './dashboard.css'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const RepostSummary = ({ theRepost, showFullPost }) => {
    // own component because this is getting re-used in various parts of app

    dayjs.extend(relativeTime) 
    function timeAgoFormat(time){
        return dayjs(time).fromNow()
    }

    return (
        <Box className='default-border' onClick={() => showFullPost && showFullPost(theRepost._id)}> {/* making showFullPost optional */}
            <Flex direction="row" align="center" gap={1}  cursor='pointer' >
                <Avatar sx={{ w: '2.5rem', h: '2.5rem' }} ml={2} src={theRepost.user?.profileImg} name={theRepost.user?.fullName?.[0]} />
                <div className='post-info-set'>
                    <div className='avatar-name'>{theRepost.user?.fullName}</div>
                    <Flex gap={2}>
                        <p>{theRepost.user?.neighbourhood}</p>
                        <p>{timeAgoFormat(theRepost.createdAt)}</p>
                    </Flex>                                                                   
                </div>
            </Flex>
            <Flex className='post-content' mb={1} mt={4} pl={6} align='center'>
                {(theRepost.imageUrls && theRepost.imageUrls.length > 0) && 
                    <Image src={theRepost.imageUrls[0]} h='60px' w='60px' mr={4} />
                }
                {theRepost.content}
            </Flex>                                              
        </Box>   
    )
}

export default RepostSummary