const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

const createNewPost = async (postData, token) => {
    try {
        const response = await fetch(BASE_URL , { 
            method: 'POST',
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
        return data.post
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
    }    ``
}

const getPostsForAnyUser = async (userId, token) => {
    try {
        const response = await fetch(BASE_URL + '/forUser/' + userId , { 
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

const getPostForRepost = async (postId, token) => {
    try {
        const response = await fetch(BASE_URL + '/' + postId , { 
            headers: { 
                Authorization: `Bearer ${token}` 
            },     
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.post
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

const deletePost = async (token, postId) =>{
    try {
        const response = await fetch(BASE_URL + '/' + postId, { 
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }      
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
    getPostsForAnyUser,
    getPostForRepost,
    updatePost,
    deletePost,
}