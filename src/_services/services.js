const apiUrl = "http://192.168.43.44:8000";
const user = JSON.parse(localStorage.getItem('user'));

// console.log(process.env.API_URL)
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
        if(res.success) {
            const user = res.data.user;
            localStorage.setItem('user', JSON.stringify(user))
            return user;
        } else {
            throw new Error(res.message);
        }

    })
}

function logoutUser() {
    localStorage.removeItem('user');
}

function getAllMessages() {
    return fetch(`${apiUrl}/message`, {
        headers: {
            "x-access-token": user.api_token
        }
    })
    .then(data => data.json())
    .then(res => {
        if(res.success) {
            console.log(res.data.messages)
            return res.data.messages
        } else {
            throw new Error('Error while getting Messages')
        }
    })
}

function getFriendsAndMessage() {
    return fetch(`${apiUrl}/message/friends`, {
        headers: {
            'x-access-token': user.api_token
        }
    })
    .then(data => data.json())
    .then(res => {
        if(res.success) {
            // console.log('data>>', res);
            return res.data.friends;
        } else {
            throw new Error('Error getting Friends');
        }
    })
}

const service = {
    loginUser,
    logoutUser,
    getAllMessages,
    getFriendsAndMessage
}

export default service