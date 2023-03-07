import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      error: false
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUrlChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    this.props.addUrl({ id: Date.now(), title: this.state.title, long_url: this.state.urlToShorten })
    this.clearInputs();
  }

  checkInputs = e => {
    e.preventDefault()
    if (this.state.title !== '' && this.state.urlToShorten !== '') {
      this.handleSubmit()
    } else { this.setState({ error: true }) }
  }

  clearInputs = () => {
    this.setState({ title: '', urlToShorten: '', error: false });
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleUrlChange(e)}
        />

        <button onClick={e => this.checkInputs(e)}>
          Shorten Please!
        </button>
        {this.state.error && (
          <p>please fill out both input fields</p>
        )}
      </form>

    )
  }
}

export default UrlForm;
