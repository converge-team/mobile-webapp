import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function MailSent(props) {

    // useEffect(() => {
    //     props.dispatch()
    // })

    return(
        <div className="mail">
            <i className="fas fa-arrow-down"></i>
            <i className="fas fa-envelope-open"></i>
            <p>We've sent you a mail. 
                Click on the link to verify your email
            </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state.auth
    }
}

const ConnectedMailSent = connect(mapStateToProps)(MailSent);

export default ConnectedMailSent;