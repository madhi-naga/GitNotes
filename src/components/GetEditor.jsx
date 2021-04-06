import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import '../App.css';
import axios from 'axios';


export class GetEditor extends Component {
  state = {
    fileText: ''
  }

  componentDidMount() {
    axios.get('https://api.github.com/repos/purefisher/test/contents/readme.md')
      .then(res => {
        const fileText = res.data.content;
        this.setState({ fileText });
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Markdown Editor</h1>
        <p>Enter your note below in markdown format</p>
        <textarea rows="30" cols="180" value={Buffer.from(this.state.fileText, 'base64')}>
        </textarea>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default GetEditor;