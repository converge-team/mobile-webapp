const apiUrl = "http://192.168.43.44:8000";


function getMessagesForFriend(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return fetch(`${apiUrl}/message/individual?id=${id}`, {
        headers: {
            "x-access-token": user.api_token
        },
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
    const user = JSON.parse(localStorage.getItem('user'));

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
            throw new Error(res.error.message);
        }
    })
}

const messageService = {
    getMessagesForFriend,
    getFriendsAndMessage
}

export default messageService;