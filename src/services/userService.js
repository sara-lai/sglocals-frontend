const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

// userProfile vs user:
// On BE probably should use a users table and skip a userProfile table, still need "users" eg your neighbors, posts by nearby users, etc. 
// Clerk does id/email/passowrd/jwt ... users table at least needs to store the clerk  userId, and can have the profile data too

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
  createUserProfile,
  getCurrentUser,
  updateProfile,
  getNeighboursOfUser
}