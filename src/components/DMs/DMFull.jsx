import { Box, Flex, Text, Avatar, Button, Input, Divider } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { useState } from "react"

const DMFull = ({ selectedDM, createNewMessage, currentUser }) => {
    const [message, setMessage] = useState('')

    // need to determine which user is 1 or 2 (current vs other)
    let otherUser = null
    let other_user_id = null
    if (selectedDM.user_id_1 === currentUser.user_id){
        otherUser = selectedDM.user2
        other_user_id = selectedDM.user_id_2
    } else {
        otherUser = selectedDM.user1
        other_user_id = selectedDM.user_id_1
    }

    function handleSubmit (event) {
        event.preventDefault()
        createNewMessage(message)
        setMessage('')
    }

    return (
        <Flex  flex='1' direction='column' justify='space-between'>
            <Box m={2} cursor='pointer' onClick={() => navigate('/profile/' + other_user_id)}>
                <Flex gap={2} p={2}>
                    <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={otherUser.profileImg} name={otherUser.fullName?.[0]} />
                    <Flex direction='column' >
                        <Text fontWeight='600' fontSize='1.1rem'>{otherUser.fullName}</Text>
                        <Text color='#576580' fontWeight='500'>{otherUser.neighbourhood}</Text>
                    </Flex>
                </Flex>
                <Divider /> 
            </Box>

            <Box h="100%" p={4}>
                <Flex direction='column' gap={4}>
                    {selectedDM.messages.map(msg => (
                        <Flex gap={2} p={2}>
                            <Avatar sx={{ w: '3.3rem', h: '3.3rem' }} src={msg.user.profileImg} name={msg.user.fullName?.[0]} />
                            <Flex direction='column' >
                                <Text fontWeight='600' fontSize='1rem'>{msg.user.fullName}</Text>
                                <Text>{msg.text}</Text>
                            </Flex>
                        </Flex>                            
                    ))}

                
                </Flex>
            </Box>

            <Box>
                <Divider />    
                <Flex w='100%' p={6} pb={4} gap={2} align='center'>            
                    <FontAwesomeIcon icon={faImages}  size="2xl" cursor="pointer"  onClick={() => console.log('todo')} />
                    <Input  value={message} borderRadius='30px' borderColor="gray.300" h="46px" ml={4}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"  />                   
                    <Button className='btn-default' onClick={handleSubmit}>Send</Button>          
                </Flex>
            </Box>
        </Flex>
    )
}

export default DMFull