import { Box, Flex, Text, Avatar, Button, Input } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'

const DMFull = ({ selectedDM, currentUser }) => {

    // need to determine which user is 1 or 2 (current vs other)
    console.log('selectedDm', selectedDM)
    let otherUser = null
    let other_user_id = null
    if (selectedDM.user_id_1 === currentUser.user_id){
        otherUser = selectedDM.user2
        other_user_id = selectedDM.user_id_2
    } else {
        otherUser = selectedDM.user1
        other_user_id = selectedDM.user_id_1
    }

    let content = 'todo'

    return (
        <Flex  flex='1' direction='column' justify='space-between'>
            <Box m={2} cursor='pointer' onClick={() => navigate('/profile/' + other_user_id)}>
                <Flex gap={2}>
                    <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={otherUser.profileImg} name={otherUser.fullName?.[0]} />
                    <Flex direction='column' >
                        <Text fontWeight='600' fontSize='1.1rem'>{otherUser.fullName}</Text>
                        <Text color='#576580' fontWeight='500'>{otherUser.neighbourhood}</Text>
                    </Flex>
                </Flex>
            </Box>

            <Box>
                {/* map the messages */}
            </Box>

            <Flex w='100%' p={8} pb={4} gap={4}>
                <FontAwesomeIcon icon={faImages}  size="2xl" cursor="pointer"  onClick={console.log('todo')} />
                <Input placeholder="Message"  value={content} onChange={console.log('todo')} />                   
                <Button className='btn-default' onClick={console.log('todo')}>Send</Button>          
            </Flex>
        </Flex>
    )
}

export default DMFull