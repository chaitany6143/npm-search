import React from 'react';
import './App.css';
import SimpleTable from './components/SimpleTable';
import {fetchSearchResult} from './utils/fetchSearchResult';
import Loader from 'react-loader-spinner'

class App extends React.Component {
  state = {
    text: '',
    searchResults: [],
    isLoadingResults: false,
  };

  shouldSearch = () => this.state.text.length > 3;

  performSearch = () => {
    const { text } = this.state;
    this.setState( { isLoadingResults: true}, () => {
      fetchSearchResult(text).then(response => {
        this.setState({
          searchResults: response,
          isLoadingResults: false
        })
      });
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
          <span class="fa fa-search"></span>
          <input
            type="text"
            placeholder="Enter the npm module here"
            value={text}
            onChange={this.onTextEntered}
          />
        </div>
        { this.state.isLoadingResults && <Loader type="ThreeDots" color="#somecolor" height={80} width={80} /> }
        { this.state.searchResults.length > 0 && !this.state.isLoadingResults && <SimpleTable searchResults={searchResults}/> }
        { this.state.searchResults.length === 0 && !this.state.isLoadingResults }
      </div>
    );
  }

}

export default App;
