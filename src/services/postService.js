const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

// userProfile vs user:
// On BE probably should use a users table and skip a userProfile table, still need "users" eg your neighbors, posts by nearby users, etc. 
// Clerk does id/email/passowrd/jwt ... users table at least needs to store the clerk  userId, and can have the profile data too

const createNewPost = async (content, token) => {
    try {
        const response = await fetch(BASE_URL , { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({
                'content': content,
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

 // just returns all posts for now
const getPostsForNeighbourhood = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/local' , { 
            headers: { 
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

const getPostsForCurrentUser = async (token) => {
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
        return data.posts
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }    
}

// update post, generic for anything
const updatePost = async (token, postData) =>{
    try {
        const response = await fetch(BASE_URL , { 
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(postData)          
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
    createNewPost,
    getPostsForNeighbourhood,
    getPostsForCurrentUser,
    updatePost
}