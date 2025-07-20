const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/groups`

const createNewGroup = async (groupData, token) => {
    try {
        const response = await fetch(BASE_URL , { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(groupData)          
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.group
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
 }

export {
    createNewGroup
}