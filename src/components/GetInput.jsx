import React, { useContext } from "react";
import editorContext from "./editorContext";
import axios from 'axios';
import qs from 'qs';

//const urlBackend = 'http://localhost:5000/';
const urlBackend = 'https://gitnotes-be.herokuapp.com/';
var currText = "";

export function GetInput(props) {

  const { markdownText, setMarkdownText } = useContext(editorContext);
  currText = props.filecontent;

  const onInputChange = e => {
    //const newValue = e.currentTarget.value;
    currText = e.currentTarget.value;
    setMarkdownText(currText);
  };

  const getFile = (name, repo, file) => { 
    props.getFileInfo(name, repo, file);
  }

  function postExistingNote(name, reponame, filename) {
    var params =  {
      token: props.token, //this.state.token,
      path: props.path,
      content: Buffer.from(markdownText).toString('base64'),
      sha: props.sha
    }

    axios.post(`${urlBackend}/setfile/${name}/${reponame}/${filename}`, params)
      .then(function (response) {
        console.log(response);
        alert(`Successfully updated ${filename}`);
        return props.getFileInfo(props.username, props.repoName, props.fileName);
      })
      .catch(error => alert(`Failed to update ${filename}`));
  }

  function handleSubmit(e) {
    e.preventDefault();
    postExistingNote(props.username, props.repoName, props.fileName);
  }

  function handleValue() {
    if(props.filecontent)
      return Buffer.from(props.filecontent, 'base64');
    else
      return currText;
  }
  
  return (
    <form >
      <h3>Text Editor </h3>
      <textarea name='input' id='mdeditor' rows="15" cols="180" onChange={onInputChange} 
      defaultValue={handleValue()} >
      </textarea>
      <br/>
      <button type="submit" onClick={handleSubmit}>
        Submit Changes </button>
    </form>
  );
}