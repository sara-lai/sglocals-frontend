import { Flex, Box, Avatar, Text } from "@chakra-ui/react"

const DMsSummary = ({ allDMs, currentUser, setSelectedDM }) => {

    function renderBoxForOtherUser (dm) {
        // summary:
        // the panel needs to show info about the "other user" from the chat, NOT the current user
        // other user can be user_id_1 or user_id_2
        let otherUser = null
        if (dm.user_id_1 === currentUser.user_id){
            otherUser = dm.user2
        } else {
            otherUser = dm.user1
        }

        // maybe some other day
        // // show a bit of last (or first?) message 
        // let lastMsg = null
        // if (dm.messages){
        //     lastMsg = dm.messages[dm.messages.length - 1]
        // }

        return (
            <>
                <Flex gap={3}>
                    <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={otherUser.profileImg} name={otherUser.fullName?.[0]} />
                    <Flex direction='column' >
                        <Text fontWeight='600' fontSize='1.1rem'>{otherUser.fullName}</Text>
                        <Text color='#576580' fontWeight='500'>{otherUser.neighbourhood}</Text>
                    </Flex>                
                </Flex>    
                {/* <Text>{lastMsg?.text}</Text>       */}
            </>  
        )
    }

    return (
        <> 
            {allDMs.map(dm => (
                <Box m={4} cursor='pointer' onClick={() => setSelectedDM(dm)}>
                    {renderBoxForOtherUser(dm)}
                </Box>
            ))}        
        </>
    )
}

export default DMsSummary