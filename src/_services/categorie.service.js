import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const categorieService = {
    getAll,
    deleteCategorie,
    getCategorieById,
    updateCategorie,
    createCategorie
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
    return fetch(`${config.apiUrl}/api/categories`, requestOptions).then(handleResponse);
}

function getCategorieById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/categories/${id}`, requestOptions).then(handleResponse);
}

function deleteCategorie(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/categories/${id}`, requestOptions).then(handleResponse);
}

function updateCategorie(id, categorie) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(categorie)
    };
    return fetch(`${config.apiUrl}/api/categories/${id}`, requestOptions).then(handleResponse);
}

function createCategorie(categorie) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(categorie)
    };
    return fetch(`${config.apiUrl}/api/Categories`, requestOptions).then(handleResponse);
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