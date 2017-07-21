import React, { Component } from 'react';
import Websocket from 'react=websocket';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  handleData(data) {
    let result = JSON.parse(data);
  }

  render() {
    return(
      <div className="App">
        <div className="App-header">
          <h2>Thinkific Chat</h2>
        </div>
        <div className="chat-container">
          This is where the chat will live

          <div>
            <Websocket url='ws://localhost:8000/ws' onMessage={this.handleData.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }

}

export default App;
