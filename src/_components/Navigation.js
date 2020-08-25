import React, { Component } from 'react'

class Navigation extends Component {

    render() {
        return (
            <div className="nav_box">
                <NavItem isActive={false} details="All"/>
                <NavItem isActive={true} details="Important"/>
                <NavItem isActive={false} details="Unread"/>
                <NavItem isActive={false} details="Read"/>
            </div>
        )
    }
}

const NavItem = ({ isActive = false, details }) => {
    return (
        <div 
            className="nav_item" 
            style={{
                background: isActive ? '#30f' : 'white',
                color: isActive ? 'white' : 'black'
            }}
        >
            {details}
        </div>
    )
}

export default Navigation;