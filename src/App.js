import React from 'react';
import './App.css';
import SimpleTable from './components/SimpleTable';
import {fetchSearchResult} from './utils/fetchSearchResult';

class App extends React.Component {
  state = {
    text: '',
    searchResults: []
  };

  shouldSearch = () => this.state.text.length > 3;

  performSearch = () => {
    const { text } = this.state;
    fetchSearchResult(text).then(response => {
    this.setState({ searchResults: response })
    });
  };

  clearSearchResults = () => {
    this.setState({ searchResults: []});
  };

  onTextEntered = (event) => {
    const { value } = event.target;
    this.setState({ text: value }, () => {
      if (this.shouldSearch()) {
        this.performSearch();
      } else {
        this.clearSearchResults();
      }
    });
  };
  
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
