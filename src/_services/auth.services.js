const apiUrl = process.env.NODE_ENV === 'production'
    && 'https://convrge.herokuapp.com';

console.log('url: ', process.env, ' ', apiUrl);


function loginUser(username, password) {

    return fetch(`${apiUrl ? apiUrl : ''}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username_or_email: username,
            password
        })
    })
        .then(data => data.json())
        .then(res => {
            console.log('res >>>', res);
            if (res.success) {
                const user = res.data.user;
                localStorage.setItem('user456fg£', JSON.stringify(user))
                return user;
            } else {
                throw new Error(res.message);
            }

        })
}

function logoutUser() {
    localStorage.removeItem('user456fg£')
}

function registerUser({ username, email, first_name, last_name, password }) {
    console.log('username: ', username)
    return fetch(`${apiUrl ? apiUrl : ''}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            first_name,
            last_name,
            password
        })
    })
        .then(data => data.json())
        .then(res => {
            if (res.success) {
                const user = res.data.user;
                console.log('user: ', res.data.user)
                localStorage.setItem('user456fg£', JSON.stringify(user))
                return user;
            } else {
                throw new Error(res.message);
            }
        });
}

function verifyEmail(key) {
    return fetch(`${apiUrl ? apiUrl : ''}/auth/verify-email/${key}`)
        .then(data => data.json())
        .then(res => {
            if (res.success) {
                const user = res.data.user;

                localStorage.setItem('user456fg£', JSON.stringify(user))
                return user;
            } else {
                throw new Error(res.message);
            }
        });
}

function authenticateUser(token) {
    return fetch(`${apiUrl ? apiUrl : ''}/auth/authenticate`, {
        headers: {
            "x-access-token": token
        }
    })
        .then(data => data.json())
        .then(res => {
            return res.success
        })
}

function checkValidity(field, value) {
    return fetch(`${apiUrl ? apiUrl : ''}/auth/validate?field=${field}&value=${value}`)
        .then(data => data.json())
        .then(res => {
            return res.success;
        })
}

const authService = {
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail,
    authenticateUser,
    checkValidity
}

export default authService;