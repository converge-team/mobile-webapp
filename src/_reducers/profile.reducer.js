const { profileConstants } = require("../_actions/profile.actions");

const user = JSON.parse(localStorage.getItem('user456fg£'))
const profilePicture = user && user.profile_photo_url ? user.profile_photo_url : 'https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg'

const defaultState = { profilePicture, photoUpdateBlob: null, profileChangeState: 'updated' };

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case profileConstants.CHANGE_BLOB:
            return {
                ...state,
                photoBlob: action.blob
            }

        case profileConstants.UPDATING_PROFILE:
            return {
                ...state,
                profileChangeState: 'updating'
            }
        case profileConstants.UPDATED_PROFILE:
            return {
                ...state,
                profileChangeState: 'updated',
                profilePicture: action.photo_url
            }
        default:
            return state;

    }
}

export default profileReducer