const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/dms`

const createNewDM = async (dmData, token) => {
    try {
        const response = await fetch(BASE_URL , { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(dmData)          
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.chat
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
 }

 const getDMsForCurrentUser = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/currentUser' , { 
            headers: { 
                Authorization: `Bearer ${token}` 
            },     
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.chats
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }  
 }

 export {
    createNewDM,
    getDMsForCurrentUser
 }