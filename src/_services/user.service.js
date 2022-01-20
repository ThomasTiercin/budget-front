import config from '../config.json';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll,
    signup,
    getUserByUsername,
    deleteUser,
    createUser,
    editUser,
    getUserById
};

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${config.apiUrl}/user`, requestOptions)
        .then(handleLogin)
        .then(async user => {
            await getUserByUsername(username)
            .then(user=>{
                localStorage.setItem('role', btoa(encodeURIComponent(user.role)));
                localStorage.setItem('id', JSON.stringify(user.id));
            })
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user));            
                localStorage.setItem('username', JSON.stringify(username));
            }
            return user;
        })
        .catch((error)=>{return Promise.reject(error)})
}

function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/users/${id}`, requestOptions).then(handleResponse);
}

function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/users/${id}`, requestOptions).then(handleResponse);
}

function createUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/api/Users`, requestOptions).then(handleResponse);
}

function editUser(id, user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/api/Users/${id}`, requestOptions).then(handleResponse);
}

async function signup(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, "role": "user" })
    };
    return fetch(`${config.apiUrl}/api/Users`, requestOptions)
        .then(handleLogin)
        .then(async user => {
            await getUserByUsername(username)
            .then(user=>{
                localStorage.setItem('role', btoa(encodeURIComponent(user.role)));
                localStorage.setItem('id', JSON.stringify(user.id));
            })
            .then(()=>{
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(user));            
                    localStorage.setItem('username', JSON.stringify(username));
                }
                return user;
            })
            
        })
        .catch((error)=>{return Promise.reject(error)})
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');    
    localStorage.removeItem('role');    
    localStorage.removeItem('id');    
    localStorage.removeItem('token');    
}

function getUserByUsername(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/user/${username}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/users`, requestOptions).then(handleResponse);
}

function handleLogin(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                return Promise.reject(error);
            }
            if (response.status === 400){
                logout();     
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject("Username or password is incorrect");
        }
        return data;
    });
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