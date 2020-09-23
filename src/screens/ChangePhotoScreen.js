import React, { Component, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Cropper from 'cropperjs';

import { updateProfilePhoto } from '../_actions/profile.actions'

const ImageCover = ({ photoBlob, setCropperPointer }) => {
    const image = useRef();
    var cropper;

    useEffect(() => {
        cropper = new Cropper(image.current, {
            aspectRatio: 16 / 16,
        })

        setCropperPointer(cropper);
    })

    return (
        <div>
            <img ref={image} src={photoBlob} alt="Your Profile" />
        </div>
    )
};

class ChangePhotoScreen extends Component {

    constructor(props) {
        super(props);

        this.cropper = null;

        this.setCropperPointer = this.setCropperPointer.bind(this);
    }

    componentDidMount() {
        const { photoBlob, history } = this.props;

        if (!photoBlob) {
            history.push('/settings')
        }

    }

    setCropperPointer(cropper) {
        this.cropper = cropper;
    }

    render() {
        const { photoBlob, updatePhoto, history } = this.props;

        return (
            <div className="full dark-bg change-photo">
                <div className="centered image-sector">
                    <ImageCover photoBlob={photoBlob && photoBlob.url} setCropperPointer={this.setCropperPointer} />
                </div>
                <div id="actions">
                    <span>Cancel</span>
                    <span
                        onClick={() => {

                            const croppedImage = this.cropper.getCroppedCanvas().toBlob(blob => {

                                let formData = new FormData();

                                formData.append('profile-photo', blob);

                                updatePhoto(formData);

                                history.goBack();

                            }, photoBlob.type);

                        }}
                    >
                        Done
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        photoBlob: state.profile.photoBlob
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePhoto: (formData) => dispatch(updateProfilePhoto(formData))
    }
}


const connectedChangePhotoScreen = connect(mapStateToProps, mapDispatchToProps)(ChangePhotoScreen);

export default connectedChangePhotoScreen;