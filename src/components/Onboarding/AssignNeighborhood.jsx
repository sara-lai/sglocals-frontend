import { useNavigate } from 'react-router'

import './onboarding.css'

const AssignNeighborhood = () => {

    const navigate = useNavigate()

    // todo - cant let anyone navigate to dashboard

    return (
        <div className='onboarding-container'>
            <h1>Let's Figure out your neighborhood</h1>
            <div>[some form]</div>
            <button onClick={() => navigate('/dashboard')}>done</button>
        </div>
    )

}

export default AssignNeighborhood