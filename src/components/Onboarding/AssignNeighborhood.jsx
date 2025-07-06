import { useNavigate } from 'react-router'
import { Button } from '@chakra-ui/react'

import './onboarding.css'

const AssignNeighborhood = () => {

    const navigate = useNavigate()

    // todo - cant let anyone navigate to dashboard

    return (
        <div className='onboarding-container'>
            <h1>Let's Figure out your neighbourhood</h1>
            <div>[some form]</div>
            <Button onClick={() => navigate('/dashboard')}>done</Button>
            <img className='onboarding-img' src='/images/onboarding-turtle-ride.png' />
        </div>
    )

}

export default AssignNeighborhood