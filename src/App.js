import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleTable from './components/SimpleTable';

class App extends React.Component {

  state = {
    text: ''
  };

  onTextEntered = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the npm module here"
            value={this.state.text}
            onChange={this.onTextEntered}
          />
        </div>
        <SimpleTable />
      </div>
    );
  }

}

export default App;
