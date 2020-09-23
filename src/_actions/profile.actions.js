import service from '../services/services';

export const profileConstants = {
    CHANGE_BLOB: 'CHANGE_BLOB',
    UPDATING_PROFILE: 'UPDATING_PROFILE',
    UPDATED_PROFILE: 'UPDATED_PROFILE'
}

export const changePhotoBlob = blob => ({
    type: profileConstants.CHANGE_BLOB,
    blob
});

export const updatingProfile = () => ({
    type: profileConstants.UPDATING_PROFILE,
});

export const updatedProfile = (photo_url) => ({
    type: profileConstants.UPDATED_PROFILE,
    photo_url
});

export const updateProfilePhoto = formData => (
    dispatch => {
        dispatch(updatingProfile());
        service.profile.updateProfilePhoto(formData)
            .then(user => {
                console.log('user: ', user);
                localStorage.setItem('user456fg£', JSON.stringify(user))

                dispatch(updatedProfile(user.profile_photo_url))
            })
            .catch(error => {
                console.log(error);
            })
    }
)