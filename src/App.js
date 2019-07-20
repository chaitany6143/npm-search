import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Search from './Search';

class App extends React.Component {

  state = {
    text: 'Enter the npm module here'
  };

  onTextEntered = (value) => {
    console.log(JSON.stringify(value));
    this.setState({ text: value });
  };

  render() {
    return (
      <div className="App">
        <div className="search">
          <input
            type="text"
            value={this.state.text}
            onChange={this.onTextEntered}
          />
        </div>
      </div>
    );
  }

}

export default App;
