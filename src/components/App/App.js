import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: false
    }
    this.addUrl = this.addUrl.bind(this)
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({ urls: data.urls })
    })
  }

  addUrl(newUrl) {
    fetch('http://localhost:3001/api/v1/urls',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUrl)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ urls: [...this.state.urls, data] })
    })
    .catch(error => {
      console.log(error)
      this.setState({ error: true })
    })
  }
  

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        {this.state.error && (
        <h3>THERE WAS AN ERROR ADDING THIS URL</h3>
        )}
        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;

