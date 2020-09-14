import React from 'react'
import { withRouter } from 'react-router-dom';

function Icon({ name, push, history, child, onClick }) {

    const pushToHistory = () => (
        push ? history.push(push) : null
    )

    return (
        <div className="icon_div" onClick={onClick ? onClick : pushToHistory}>
            <div className="touch_indicator">
                {
                    !child
                        ? <i className={name}></i>
                        : child
                }
            </div>
        </div>
    )
}

export default withRouter(Icon);