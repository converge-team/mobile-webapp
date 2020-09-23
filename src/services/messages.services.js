
const apiUrl = process.env.NODE_ENV === 'production'
    && 'https://convrge.herokuapp.com';

const api =  apiUrl ? apiUrl : '';



function getMessagesForFriend(id) {
    const user = JSON.parse(localStorage.getItem('user456fg£'));

    return fetch(`${api}/message/individual?id=${id}`, {
        headers: {
            "x-access-token": user.api_token
        },
    })
        .then(data => data.json())
        .then(res => {
            if (res.success) {
                console.log(res.data.messages)
                return res.data.messages
            } else {
                throw new Error('Error while getting Messages')
            }
        })
}

function getFriendsAndMessage() {
    const user = JSON.parse(localStorage.getItem('user456fg£'));

    return fetch(`${api}/message/friends`, {
        headers: {
            'x-access-token': user.api_token
        }
    })
        .then(data => data.json())
        .then(res => {
            if (res.success) {
                // console.log('data>>', res);
                return res.data.friends;
            } else {
                throw new Error(res.error.message);
            }
        })
}

function search(keyword) {
    const user = JSON.parse(localStorage.getItem('user456fg£'));

    return fetch(`${api}/search/?keyword=${keyword}`, {
        headers: {
            'x-access-token': user.api_token
        }
    })
        .then(data => data.json())
        .then(res => {
            if(res.success) return res.data;
            else throw new Error(res.error.message);
        })
}

function searchDetails(id) {
    const user = JSON.parse(localStorage.getItem('user456fg£'));

    return fetch(`${api}/search/details?id=${id}`, {
        headers: {
            'x-access-token': user.api_token
        }
    })
        .then(data => data.json())
        .then(res => {
            if(res.success)
                return res.data.person;
            else throw new Error(res.error.message);
        })
}

const messageService = {
    getMessagesForFriend,
    getFriendsAndMessage,
    search,
    searchDetails
}

export default messageService;