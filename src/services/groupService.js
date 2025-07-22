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

const getNearbyGroups = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/nearby' , { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },   
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.groups
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const getGroupsForCurrentUser = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/currentUser' , { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },   
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.groups
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const getGroup = async (id, token) => {
    try {
        const response = await fetch(BASE_URL + '/' + id , { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },   
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

const getGroupPosts = async (id, token) => {
    try {
        const response = await fetch(BASE_URL + '/groupPosts/' + id , { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },   
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.posts
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}


const joinGroup = async (id, token) => {
    try {
        const response = await fetch(BASE_URL + '/join' , { 
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }, 
            body: JSON.stringify({ group_id: id })    

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
    createNewGroup,
    getNearbyGroups,
    getGroupsForCurrentUser,
    getGroup,
    getGroupPosts,
    joinGroup,
}