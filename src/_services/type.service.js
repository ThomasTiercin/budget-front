import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const typeService = {
    getAll,
    deleteType,
    getTypeById,
    updateType,
    createType
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');    
    localStorage.removeItem('role');    
    localStorage.removeItem('id');    
    localStorage.removeItem('token');    
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/types`, requestOptions).then(handleResponse);
}

function getTypeById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Types/${id}`, requestOptions).then(handleResponse);
}

function deleteType(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Types/${id}`, requestOptions).then(handleResponse);
}

function updateType(id, type) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(type)
    };
    return fetch(`${config.apiUrl}/api/Types/${id}`, requestOptions).then(handleResponse);
}

function createType(type) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(type)
    };
    return fetch(`${config.apiUrl}/api/Types`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                return Promise.reject(error);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}