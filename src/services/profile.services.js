
const apiUrl = process.env.NODE_ENV === 'production'
&& 'https://convrge.herokuapp.com';

const api =  apiUrl ? apiUrl : '';

function updateProfilePhoto(formData) {

    const user = JSON.parse(localStorage.getItem('user456fg£'));

    return fetch(`${api}/update/profile-photo`, {
        method: 'POST',
        headers: {
            'x-access-token': user.api_token
        },
        body: formData

    })
    .then(data => data.json())
    .then(res => {
        if(res.success)
            return res.data.user
        else 
            throw new Error('Error updating profile');
    })
}

const profileService = {
    updateProfilePhoto
}

export default profileService;