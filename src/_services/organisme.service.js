import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const organismeService = {
    getAll,
    deleteOrganisme,
    getOrganismeById,
    updateOrganisme,
    createOrganisme
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
    return fetch(`${config.apiUrl}/api/organismes`, requestOptions).then(handleResponse);
}


function getOrganismeById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Organismes/${id}`, requestOptions).then(handleResponse);
}

function deleteOrganisme(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Organismes/${id}`, requestOptions).then(handleResponse);
}

function updateOrganisme(id, compte) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(compte)
    };
    return fetch(`${config.apiUrl}/api/Organismes/${id}`, requestOptions).then(handleResponse);
}

function createOrganisme(compte) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(compte)
    };
    return fetch(`${config.apiUrl}/api/Organismes`, requestOptions).then(handleResponse);
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