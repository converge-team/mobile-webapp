import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadScreen from '../_components/LoadScreen';
import { verifyEmail } from '../_actions/auth.actions'

class ConfirmEmailScreen extends Component {

    componentDidMount() {
        
        const { dispatch } = this.props;
        const { key } = this.props.match.params;

        console.log(key);
        dispatch(verifyEmail(key));
    }

    componentDidUpdate() {
        const { verified } = this.props;

        if (verified) {
            return this.props.history.push('/');
        }
    }

    render() {
        const { emailVerification } = this.props;
        console.log('EMAILvERIFICATION: ', emailVerification)
        return (
            <div className="full">
                {
                    !emailVerification
                        ? <div className="fail">
                            &times;
                          </div>
                        : <LoadScreen />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        verified: state.auth.verified
    }
}

const ConnectedConfirmEmailScreen = connect(mapStateToProps)(ConfirmEmailScreen);

export default ConnectedConfirmEmailScreen;