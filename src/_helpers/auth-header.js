export function authHeader() {
    // return authorization header with basic auth credentials
    let username = JSON.parse(localStorage.getItem('username'));
    let token = JSON.parse(localStorage.getItem('token'));

    if (username && token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export function postAuthHeader() {
    // return authorization header with basic auth credentials
    let username = JSON.parse(localStorage.getItem('username'));
    let token = JSON.parse(localStorage.getItem('token'));

    if (username && token) {
        return {  'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}
