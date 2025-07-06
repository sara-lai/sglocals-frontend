import { useNavigate } from 'react-router'
import { Button, Select, FormControl, FormLabel } from '@chakra-ui/react'

import './onboarding.css'

const AssignNeighborhood = () => {

    const navigate = useNavigate()

    // todo - cant let anyone navigate to dashboard

    function handleSubmit(){
        // todo - api call to create a userProfile
        navigate('/dashboard')
    }

    return (
        <div className='onboarding-container'>
            <div className='logo-top-nav'>
              <img src='/images/flowers1.png' />
              <span>Kampong Lah</span>              
            </div>            
            <div className='onboarding-box'>
                <div className='onboarding-title'>Welcome, let's figure out your neighbourhood.</div>
                <form onSubmit={handleSubmit} style={{ alignSelf: 'center' }}>
                    <FormControl  w="400px"  alignSelf="center" >
                    <FormLabel >
                        Your Neighbourhood
                    </FormLabel>
                    <Select placeholder="select" bg="white" color="gray.800" borderRadius="md">
                        <option value="Alexandra">Alexandra</option>                        
                        <option value="Ang Mo Kio">Ang Mo Kio</option>
                        <option value="Bedok">Bedok</option>
                        <option value="Bishan">Bishan</option>
                        <option value="Bukit Batok">Bukit Batok</option>
                        <option value="Bukit Merah">Bukit Merah</option>
                        <option value="Bukit Panjang">Bukit Panjang</option>
                        <option value="Choa Chu Kang">Choa Chu Kang</option>
                        <option value="Clementi">Clementi</option>
                        <option value="Geylang">Geylang</option>
                        <option value="Hougang">Hougang</option>
                        <option value="Jurong East">Jurong East</option>
                        <option value="Jurong West">Jurong West</option>
                        <option value="Kallang">Kallang</option>
                        <option value="Pasir Ris">Pasir Ris</option>
                        <option value="Punggol">Punggol</option>
                        <option value="Queenstown">Queenstown</option>
                        <option value="Sembawang">Sembawang</option>
                        <option value="Sengkang">Sengkang</option>
                        <option value="Serangoon">Serangoon</option>
                        <option value="Tampines">Tampines</option>
                        <option value="Toa Payoh">Toa Payoh</option>
                        <option value="Woodlands">Woodlands</option>
                        <option value="Yishun">Yishun</option>
                    </Select>
                    </FormControl>
                    <Button type="submit" float='right' w='100px'  bg="#ff5e62" color="white" _hover={{ bg: '#ff8789' }} mt={6}>
                    Can
                    </Button>
                </form>
            </div>
            <img className='onboarding-img' src='/images/onboarding-turtle-ride.png' />
        </div>
    )

}

export default AssignNeighborhood