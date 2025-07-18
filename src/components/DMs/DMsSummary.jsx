import { Flex, Box, Avatar, Text } from "@chakra-ui/react"

const DMsSummary = ({ allDMs, currentUser }) => {

    // trickiness: have to determine if "other user" is user1 or user2 (can be either)
    // could turn allDMs into array of otherUsers for easy display
    let otherUsers = []
    for (let dm of allDMs){
        if (dm.user_id_1 === currentUser.user_id){
            otherUsers.push(dm.user2)   // put OTHER user in array if current user is user1
        } else {
            otherUsers.push(dm.user1)
        }
    }

    return (
        <> 
            {otherUsers.map( user => (
                <>
                   <Box m={2} cursor='pointer'>
                        <Flex gap={2}>
                            <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={user.profileImg} name={user.fullName?.[0]} />
                            <Flex direction='column' >
                                <Text fontWeight='600' fontSize='1.1rem'>{user.fullName}</Text>
                                <Text color='#576580' fontWeight='500'>{user.neighbourhood}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </>
            ))}        
        </>
    )
}

export default DMsSummary