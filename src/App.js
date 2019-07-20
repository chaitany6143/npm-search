import React from 'react';
import './App.css';
import SimpleTable from './components/SimpleTable';
import {fetchSearchResult} from './utils/fetchSearchResult';

class App extends React.Component {
  state = {
    text: '',
    searchResults: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.text !== this.state.text) {
      fetchSearchResult(this.state.text)
        .then(response => this.setState({
        searchResults: response && response.results
      }))
    }
  }

  onTextEntered = (event) => this.setState({ text: event.target.value });

  render() {
    const {text, searchResults} = this.state;

    return (
      <div className="App">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the npm module here"
            value={text}
            onChange={this.onTextEntered}
          />
        </div>
        <SimpleTable searchResults={searchResults}/>
      </div>
    );
  }

}

export default App;
