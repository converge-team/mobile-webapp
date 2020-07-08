import React, { Component } from 'react';
import logo from './logo.svg';
import TopBar from './TopBar.js'
import ChatBox from './components/ChatBox.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      count: 0
    }
    this.increase = this.increase.bind(this);
  }
  
  increase() {
    this.setState(state => ({count: state.count+=1}));
  }
  
  render() {
    return (
      <div className="App">
        <TopBar />
        
        <div className="chat_section">
          <ChatBox />
        </div>
      </div>
    );
  }
}

export default App;
