import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const echeanceService = {
    getAll,
    deleteEcheance,
    getEcheanceById,
    updateEcheance,
    createEcheance,
    getEcheanceByType
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
    return fetch(`${config.apiUrl}/api/Echeances`, requestOptions).then(handleResponse);
}

function getEcheanceById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Echeances/${id}`, requestOptions).then(handleResponse);
}

function getEcheanceByType(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Type/${id}/echeances`, requestOptions).then(handleResponse);
}

function deleteEcheance(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Echeances/${id}`, requestOptions).then(handleResponse);
}

function updateEcheance(id, echeance) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(echeance)
    };
    return fetch(`${config.apiUrl}/api/Echeances/${id}`, requestOptions).then(handleResponse);
}

function createEcheance(echeance) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(echeance)
    };
    return fetch(`${config.apiUrl}/api/Echeances`, requestOptions).then(handleResponse);
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