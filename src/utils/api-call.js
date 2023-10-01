const axios = require('axios');

async function makeAxiosCall(url, method = 'get', data = null, headers = {}) {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        // Handle the error appropriately (e.g., logging, throwing a custom error)
        console.error('Axios request failed:', error.message);
        throw error;
    }
}


module.exports = {
    get: async function get(url, headers = {}) {
        return await makeAxiosCall(url, 'get', null, headers);
    },
    post: async function post(url, data = null, headers = {}) {
        return await makeAxiosCall(url, 'post', data, headers);
    }
}
