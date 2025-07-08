import { useState } from 'react'
import AssignNeighborhood from './AssignNeighborhood'
import GetDisplayName from './GetDisplayName'
import { useNavigate } from 'react-router'
import * as userService from '../../services/userService'

import './onboarding.css'

const Onboarding = () => {

    const navigate = useNavigate()
    const [onboardingData, setOnboardingData] = useState({})

    // open question how  to manage "steps" & complete onboarding
    const steps = ['assignNeighborhood', 'getDisplayName']
    const [stepIdx, setStepIdx] = useState(0) // index to refer to the steps
    
    async function updateOnboarding(data){
        setOnboardingData({ ...onboardingData, ...data })

        if (stepIdx + 1 >= steps.length){  // this means done! 
            completeOnboarding()
            return
        }
        setStepIdx(prev => prev + 1)
    }

    async function completeOnboarding(){
        console.log("onboarding complete!")
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
                { steps[stepIdx] === 'assignNeighborhood' && <AssignNeighborhood updateOnboarding={updateOnboarding} />}
                { steps[stepIdx] === 'getDisplayName' && <GetDisplayName updateOnboarding={updateOnboarding} />}
            </div>
            <img className='onboarding-img' src='/images/onboarding-turtle-ride.png' />
        </div>        
    )
}

export default Onboarding