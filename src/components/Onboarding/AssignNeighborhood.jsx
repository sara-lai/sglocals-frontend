import { useState } from 'react'
import { Button, Select, FormControl, FormLabel } from '@chakra-ui/react'

import './onboarding.css'

const AssignNeighborhood = (props) => {

    // generic form handling
    const [formData, setFormData] = useState({
        neighbourhood: '',
    })
    const { neighbourhood } = formData

    function handleChange(event){
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (       
        <>
            <div>
                <div className='onboarding-title'>Welcome, let's figure out your neighbourhood.</div>
                <p>Kampong Lah connects you with 2-3 nearby neighbourhoods too</p>
            </div>
            <form onSubmit={props.handleSubmit} style={{ alignSelf: 'center' }}>
                <FormControl  w="400px"  alignSelf="center" >
                    <FormLabel >
                        Your Neighbourhood
                    </FormLabel>
                    <Select placeholder="select" bg="white" color="gray.800" borderRadius="md" name="neighbourhood" onChange={handleChange} value={neighbourhood}>
                        <option value="Alexandra">Alexandra</option>
                        <option value="Ang Mo Kio">Ang Mo Kio</option>
                        <option value="Bedok">Bedok</option>
                        <option value="Bishan">Bishan</option>
                        <option value="Bukit Batok">Bukit Batok</option>
                        <option value="Bukit Merah">Bukit Merah</option>
                        <option value="Bukit Panjang">Bukit Panjang</option>
                        <option value="Bukit Timah">Bukit Timah</option>
                        <option value="Choa Chu Kang">Choa Chu Kang</option>
                        <option value="Clementi">Clementi</option>
                        <option value="Geylang">Geylang</option>
                        <option value="Hougang">Hougang</option>
                        <option value="Jurong East">Jurong East</option>
                        <option value="Jurong West">Jurong West</option>
                        <option value="Kallang">Kallang</option>
                        <option value="Katong">Katong</option>
                        <option value="Kembangan">Kembangan</option>
                        <option value="Little India">Little India</option>
                        <option value="Marina Bay">Marina Bay</option>
                        <option value="Marine Parade">Marine Parade</option>
                        <option value="Novena">Novena</option>
                        <option value="Orchard">Orchard</option>
                        <option value="Pasir Ris">Pasir Ris</option>
                        <option value="Punggol">Punggol</option>
                        <option value="Queenstown">Queenstown</option>
                        <option value="River Valley">River Valley</option>
                        <option value="Sembawang">Sembawang</option>
                        <option value="Sengkang">Sengkang</option>
                        <option value="Sentosa">Sentosa</option>
                        <option value="Serangoon">Serangoon</option>
                        <option value="Siglap">Siglap</option>
                        <option value="Tampines">Tampines</option>
                        <option value="Tanglin">Tanglin</option>                        
                        <option value="Tanjong Pagar">Tanjong Pagar</option>
                        <option value="Telok Blangah">Telok Blangah</option>
                        <option value="Tengah">Tengah</option>
                        <option value="Tiong Bahru">Tiong Bahru</option>
                        <option value="Toa Payoh">Toa Payoh</option>
                        <option value="Woodlands">Woodlands</option>
                        <option value="Yishun">Yishun</option>
                    </Select>
                </FormControl>
                <Button type="submit" float='right' w='100px'  bg="#ff5e62" color="white" _hover={{ bg: '#ff8789' }} mt={6}>
                Can
                </Button>
            </form>
        </>
    )

}

export default AssignNeighborhood