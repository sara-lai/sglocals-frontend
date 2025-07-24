const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/marketplace`;


const createNewListing = async (itemData, token) => {
    try {
        const response = await fetch(`${BASE_URL}/new` , { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(itemData)          
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        return data.listing
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}


const getListingsForAll = async (token) => {
    try {
        const response = await fetch(BASE_URL , { 
            headers: { 
                Authorization: `Bearer ${token}` 
            },     
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        return data.listings
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

const getListingsForCurrentUser = async (token) => {
    try {
        const response = await fetch(BASE_URL + '/user' , { 
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

const getListing = async (listingId, token) => {
    try {
        const response = await fetch(BASE_URL + '/' + listingId, { 
            headers: { 
                Authorization: `Bearer ${token}` 
            },     
        })
        if (!response.ok){
             throw new Error(`HTTP problem ${response.status}`);
        }
        const data = await response.json();
        return data.item
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }    
}

const getListingsForAnyUser = async (userId, token) => {
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

const updateListing = async (token, listData) =>{
    try {
        const response = await fetch(BASE_URL , { 
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(listData)          
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

const deleteListing = async (token, listingId) =>{
    try {
        const response = await fetch(BASE_URL + '/' + listingId, { 
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
    createNewListing,
    getListingsForAll,
    getListingsForCurrentUser,
    getListingsForAnyUser,
    getListing,
    updateListing,
    deleteListing,
}

// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/marketplace`;


// const createNewListing = async (itemData, token) => {
//     try {
//         const response = await fetch(BASE_URL , { 
//             method: 'POST',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}` 
//             },
//             body: JSON.stringify(itemData)          
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     }
// }


// const getListingsForAll = async (token) => {
//     try {
//         const response = await fetch(BASE_URL + '/local' , { 
//             headers: { 
//                 Authorization: `Bearer ${token}` 
//             },     
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data.posts
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     }
// }

// const getListingsForCurrentUser = async (token) => {
//     try {
//         const response = await fetch(BASE_URL + '/currentUser' , { 
//             headers: { 
//                 Authorization: `Bearer ${token}` 
//             },     
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data.posts
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     }    ``
// }

// const getListingsForAnyUser = async (userId, token) => {
//     try {
//         const response = await fetch(BASE_URL + '/forUser/' + userId , { 
//             headers: { 
//                 Authorization: `Bearer ${token}` 
//             },     
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data.posts
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     }    
// }


// const updateListing = async (token, listData) =>{
//     try {
//         const response = await fetch(BASE_URL , { 
//             method: 'PUT',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}` 
//             },
//             body: JSON.stringify(listData)          
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     } 
// }

// const deleteListing = async (token, listingId) =>{
//     try {
//         const response = await fetch(BASE_URL + '/' + listingId, { 
//             method: 'DELETE',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}` 
//             }      
//         })
//         if (!response.ok){
//              throw new Error(`HTTP problem ${response.status}`);
//         }
//         const data = await response.json();
//         return data
//     } catch (err) {
//         console.log(err)
//         throw new Error(err)
//     } 
// }

// export {
//     createNewListing,
//     getListingsForAll,
//     getListingsForCurrentUser,
//     getListingsForAnyUser,
//     updateListing,
//     deleteListing,
// }