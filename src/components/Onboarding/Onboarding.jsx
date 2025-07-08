import AssignNeighborhood from './AssignNeighborhood'
import { useNavigate } from 'react-router'
import * as userService from '../../services/userService'

import './onboarding.css'

const Onboarding = () => {

    const navigate = useNavigate()

    async function handleSubmit(event){
         event.preventDefault()
        try {
            // skip until implemented BE
            // const userProfile = await userService.createUserProfile()
            // console.log('created userProfile', userProfile)
            navigate('/dashboard')
        } catch(err) {
            console.log(err)
        }       
    }    

    return (
        <div className='onboarding-container'>
            <div className='logo-top-nav'>
              <img src='/images/flowers1.png' />
              <span>Kampong Lah</span>              
            </div>            
            <div className='onboarding-box'>
                <AssignNeighborhood handleSubmit={handleSubmit} />
                {/* <GetDisplayName />         */}

            </div>
            <img className='onboarding-img' src='/images/onboarding-turtle-ride.png' />
        </div>        
    )
}

export default Onboarding