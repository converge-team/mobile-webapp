import React, { Component } from 'react';
import './topBar.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="top_bar">
        <div className="app_name_container">
          <h2 className="app_name">Converge</h2>
        </div>
        <div className="icons">
          <div className="icon_div">
            <div className="touch_indicator">
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <div className="icon_div">
            <div className="touch_indicator">
              <i class="fas fa-search"></i>
            </div>
          </div>
          <div className="icon_div">
            <div className="touch_indicator">
              <div className="menu_bar">
                <div className="menu_line"></div>
                <div className="menu_line"></div>
                <div className="menu_line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;