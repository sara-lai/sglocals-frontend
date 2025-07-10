import { useState } from 'react'
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react'
import './onboarding.css'

const GetDisplayName = (props) => {

    // generic form handling
    const [formData, setFormData] = useState({
        fullName: '',
    })
    const { fullName } = formData

    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.updateOnboarding(formData)
    }

    return (
        <>
            <div>
                <div className='onboarding-title'>Your name that others know you by.</div>
                <p>We have a <u>real name policy</u> at Kampong Lah. Just the name you're best known by or prefer.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ alignSelf: 'center' }}>
                <FormControl  w="400px"  alignSelf="center" >
                    <FormLabel >
                        Full name (same as Display Name)
                    </FormLabel>
                    <Input
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    bg="white"
                    color="gray.800"
                    borderRadius="md"
                    borderColor="#ff5e62"
                    _hover={{ borderColor: '#ff8789' }}
                    _focus={{ borderColor: '#ff5e62', boxShadow: '0 0 0 1px #ff5e62' }}
                    />
                </FormControl>
                <Button type="submit" float='right' w='100px'  bg="#ff5e62" color="white" _hover={{ bg: '#ff8789' }} mt={6}>
                Can
                </Button>
            </form>
        </>        

    )
}

export default GetDisplayName