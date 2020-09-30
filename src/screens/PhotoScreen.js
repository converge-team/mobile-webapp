import React from 'react';
import { connect } from 'react-redux';

import Icon from '../_components/Icon';

function PhotoScreen({ owner, fetchedMessages, history, profilePictures, match }) {

    console.log('owner: ', owner, fetchedMessages, profilePictures, match, history)
    const { username } = match.params;
    console.log(username)
    return (
        fetchedMessages && 

        <div className="photo-screen full" >
            <div className="full-width top">
                <Icon name="fas fa-chevron-left" onClick={() => history.goBack()} />
            </div>
            <div className="full background">
                <img
                    src={
                        !owner ?
                            profilePictures.find(picture => Object.keys(picture).includes(username))[username]
                        : profilePictures
                    }
                    alt={owner ? 'photo of you' : `${username}'s profile photo`}
                    
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        profilePictures: !ownProps.owner ? state.messages.persons.map(person => (
            { [person.username]: person.profile_photo }
        )) : state.profile.profilePicture,
        fetchedMessages: state.messages.fetchedMessages
    }
}

const connectedPhotoScreen = connect(mapStateToProps)(PhotoScreen);

export default connectedPhotoScreen;