const BACKEND_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const eventAPI = async (requestType, token, requestObj, eventId) => {

    const requestPayload = JSON.stringify(requestObj);
    var url = '';

    if (requestType === 'post' || requestType === 'POST') {
        requestType = 'POST';
        url = `${BACKEND_BASE_URL}/events/create`;
    } else if (requestType === 'get' || requestType === 'GET') {
        requestType = 'GET';
        url = `${BACKEND_BASE_URL}/events`;
    } else if (requestType === 'delete' || requestType === 'DELETE') {
        requestType = 'DELETE';
        url = `${BACKEND_BASE_URL}/events/delete?id=${eventId}`;
    } 

    console.log(url);

    try {
        const response = await fetch(url, {
        method: requestType,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: requestPayload
        
        });
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        
        return json;

    } catch (error) {
        console.error(error.message);
    }



};

export { eventAPI };