const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

const createUserProfile = async (profileData, token) => {
    try {
        const response = await fetch(BASE_URL, { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({
                'neighbourhood': profileData.neighbourhood,
                'fullName': profileData.fullName,
                'onboardingComplete': true,
            })          
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
 }

 // a GET to /users is not for all users, it is mainly for the user prodfile data (probably no reason to get all users unless duplicating Clerk's admin dashboards) 
const getCurrentUser = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/current', {
             headers: {  Authorization: `Bearer ${token}` }
        })
        if (!response.ok){
                throw new Error(`HTTP problem ${response.status}`);
        }        
        const data = await response.json()
        return data.user
    } catch(err) {
        console.log(err)
        throw new Error(err)        
    }
}

const getAnyUser = async (userId, token) => {
    try {
        const response = await fetch(BASE_URL + '/' + userId, {
             headers: {  Authorization: `Bearer ${token}` }
        })
        if (!response.ok){
                throw new Error(`HTTP problem ${response.status}`);
        }        
        const data = await response.json()
        return data.user
    } catch(err) {
        console.log(err)
        throw new Error(err)        
    }
}


const updateUserProfile = async (userProfileData, token) => {
    try {
        const response = await fetch(BASE_URL, { 
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(userProfileData)          
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }    
}

export {
    createUserProfile,
    getCurrentUser,
    getAnyUser,
    updateUserProfile
}