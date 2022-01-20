import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const mouvementService = {
    getAll,
    deleteMouvement,
    getMouvementById,
    updateMouvement,
    createMouvement,
    getMouvementByUserId
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
    return fetch(`${config.apiUrl}/api/Mouvements`, requestOptions).then(handleResponse);
}

function getMouvementById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Mouvements/${id}`, requestOptions).then(handleResponse);
}

function getMouvementByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/User/${id}/Mouvements`, requestOptions).then(handleResponse);
}

function deleteMouvement(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Mouvements/${id}`, requestOptions).then(handleResponse);
}

function updateMouvement(id, mouvement) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(mouvement)
    };
    return fetch(`${config.apiUrl}/api/Mouvements/${id}`, requestOptions).then(handleResponse);
}

function createMouvement(mouvement) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(mouvement)
    };
    return fetch(`${config.apiUrl}/api/Mouvements`, requestOptions).then(handleResponse);
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