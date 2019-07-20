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
    init: true,
  };

  shouldSearch = () => this.state.text.length > 3;

  performSearch = () => {
    const { text } = this.state;
    this.setState( { isLoadingResults: true, init: false}, () => {
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

    const noResultsStyle = {
      paddingTop: '20px',
      opacity: '0.5'
    }

    return (
      <div className="App">
        <div className="search">
          <span className="fa fa-search"></span>
          <input
            type="text"
            placeholder="Search for npm packages.."
            value={text}
            onChange={this.onTextEntered}
          />
        </div>
        { this.state.isLoadingResults && <Loader type="ThreeDots" color="#somecolor" height={80} width={80} /> }
        { this.state.searchResults.length > 0 && !this.state.isLoadingResults && <SimpleTable searchResults={searchResults}/> }
        { !this.state.init && this.state.searchResults.length === 0 && !this.state.isLoadingResults 
          && <div style={noResultsStyle}>No results found</div> }
      </div>
    );
  }

}

export default App;
