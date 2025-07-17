import { Box, Divider, Flex, Heading, Image, Icon, Text } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure  } from '@chakra-ui/react'
import { FaPen } from 'react-icons/fa'
import './dms.css'
import NewDM from './NewDM'

const DMPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box className='dm-container' maxW='900px'>
            <Flex justify='space-between' mb={4} align='center' h='80px'>
                <Heading size='lg'> Chats </Heading> 
                <Flex className='dms-new-msg' align="center" as="button" gap={2} onClick={onOpen}>
                    <Icon as={FaPen} w={4} h={4} />
                    <Text fontSize="md">New message</Text>
                </Flex>             
            </Flex>
            <Flex className='default-border' maxW='900px' h='90vh' p={0}>
                <Box w='340px'></Box>
                <Divider orientation='vertical' />
                <Flex flex='1' justify='center' align='center'>
                    <Image maxW='300px'  src='/images/tmp-placeholder-no-messages.png' />
                </Flex>
            </Flex>


            <Modal isOpen={isOpen} onClose={onClose} size='override' isCentered>
                <ModalOverlay bg="blackAlpha.600" />
                <ModalContent className='post-full-modal' w='400px' h='500px' p={4}>
                    <ModalCloseButton className='btn-close' />
                        <NewDM />
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default DMPage