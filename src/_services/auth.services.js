const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://convrge.herokuapp.com'
    : "http://localhost:8000";

console.log('url: ', process.env, ' ', apiUrl);


function loginUser(username, password) {

    return fetch(`${apiUrl}/auth/login`, {
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
    return fetch(`${apiUrl}/auth/register`, {
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
    return fetch(`${apiUrl}/auth/verify-email/${key}`)
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

const authService = {
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail
}

export default authService;