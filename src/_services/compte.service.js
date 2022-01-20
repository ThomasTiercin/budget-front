import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const compteService = {
    getAll,
    deleteCompte,
    getCompteById,
    updateCompte,
    createCompte,
    getCompteByUserId
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
    return fetch(`${config.apiUrl}/api/Comptes`, requestOptions).then(handleResponse);
}

function getCompteById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Comptes/${id}`, requestOptions).then(handleResponse);
}

function getCompteByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/User/${id}/Comptes`, requestOptions).then(handleResponse);
}

function deleteCompte(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Comptes/${id}`, requestOptions).then(handleResponse);
}

function updateCompte(id, compte) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(compte)
    };
    return fetch(`${config.apiUrl}/api/Comptes/${id}`, requestOptions).then(handleResponse);
}

function createCompte(compte) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(compte)
    };
    return fetch(`${config.apiUrl}/api/Comptes`, requestOptions).then(handleResponse);
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