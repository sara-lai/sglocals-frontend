// can be YOUR created/admin group or a different group
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '@clerk/clerk-react'

import * as groupService from '../../services/groupService'

const ViewGroup = () => {
    const { id } = useParams()
    const { getToken } = useAuth()
    const [group, setGroup] = useState({})

    async function fetchGroup(){
        const token = await getToken()
        const group = await groupService.getGroup(id, token)
        setGroup(group)
    }    
    useEffect(() => {       
        fetchGroup()
    }, [])  
    
    return (
        <>
            
        </>
    )
}

export default ViewGroup