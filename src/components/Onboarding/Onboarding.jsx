import { useState, useEffect } from 'react'
import AssignNeighborhood from './AssignNeighborhood'
import GetDisplayName from './GetDisplayName'
import { useNavigate } from 'react-router'
import { useAuth } from '@clerk/clerk-react'
import * as userService from '../../services/userService'

import './onboarding.css'

const Onboarding = () => {

    const navigate = useNavigate()
    const { getToken } = useAuth()
    const [onboardingData, setOnboardingData] = useState({})

    // open question how  to manage "steps" & complete onboarding
    const steps = ['assignNeighborhood', 'getDisplayName']
    const [stepIdx, setStepIdx] = useState(0) // index to refer to the steps

    async function skipIfCompleted(){
        // may be a better way 
        
        // if no token shouldnt be here
        const token = await getToken()
        console.log('this is the token', token)
        if (!token){
            navigate('/')
        }
        // if no onboarding complete
        const user = await userService.getCurrentUser(token)
        console.log('got the current user from db', user)
        if (user.user?.onboardingComplete){
            navigate('/dashboard')
        }
    }

    useEffect(() => {
        skipIfCompleted()
    }, [])
    
    async function updateOnboarding(data){
          
        const updatedDated = { ...onboardingData, ...data }  // need a ref to pass to completeOnboarding, state var stale scope issue thing
        setOnboardingData(updatedDated)

        if (stepIdx + 1 >= steps.length){  // this means done! 
            completeOnboarding(updatedDated)
            return
        }
        setStepIdx(prev => prev + 1)
    }

    async function completeOnboarding(data){
        const token = await getToken()
        try {
            // skip until implemented BE
            const userProfile = await userService.createUserProfile(data, token) // make sure this actually gets latest data
            console.log('created userProfile', userProfile)
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