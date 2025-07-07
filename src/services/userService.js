import { useAuth } from '@clerk/clerk-react';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

// assumptions
// a POST to /users is for creating userProfile (or similar) ; userId & email come from Clerk session on express
// a GET to /users is not for all users, it is for a userProfile (or similar) based on the Clerk session on express (probably no reason to get all users) 

const createProfile = async (profileData) => {
    const { getToken } = useAuth()
    const token = await getToken()

    try {
        const response = await fetch(BASE_URL, { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({
                'neighbourhood': profileData.neighbourhood, // more fields to come
            })          
        })
        if (!response.ok){
                throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
 }

const getUserProfile = async () => {
    const { getToken } = useAuth()
    const token = await getToken()    

    try {
        const response = await fetch(BASE_URL, {
             headers: {  Authorization: `Bearer ${token}` }
        })
        if (!response.ok){
                throw new Error(`HTTP problem ${response.status}`);
        }        
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
        throw new Error(err)        
    }
}

const getNeighboursOfUser = async() => {
    // lol to figure out later
}

const updateProfile = async (profileData) => {
    // todo 
}

export {
  createProfile,
  getProfile,
  updateProfile,
  getNeighboursOfUser
}