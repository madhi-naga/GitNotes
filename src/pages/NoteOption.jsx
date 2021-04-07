import React, { Component } from 'react';
//import GetInfo from '../components/GetInfo';
//import GetDashboard from '../components/GetDashboard';
import { Link, useHistory } from 'react-router-dom';
import GetEditor from '../components/GetEditor';
import axios from 'axios';
import Previewer from '../components/Previewer';
import qs from 'qs';
import { NoteEditor } from './NoteEditor';
import { FaQuestionCircle } from "react-icons/fa";
import './option.css'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//const urlBackend = 'http://localhost:5000/';
const urlBackend = 'https://gitnotes-be.herokuapp.com/';

export class NoteOption extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.state = { repoName: '' };
    this.state = { fileName: '' };
    this.state = { filecontent: '' };
    this.state = { path: '' };
    // this.state = { branch: '' };
    this.state = { token: urlParams.get('token') }

    //this.getFileInfo = this.getFileInfo.bind(this)
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };
  handleReponame = event => {
    this.setState({ repoName: event.target.value },
      () => this.getFilesInfo(this.state.username, this.state.repoName));
  };
  handleFilename = event => {
    this.setState({ fileName: event.target.value });
  };
  handlePath = event => {
    this.setState({ path: event.target.value },
      () => this.getFilesInfo(this.state.username, this.state.repoName));
  };
  // handleBranch = event => {
  //   this.setState({ branch: event.target.value });
  // };


  parseResplist(data) {
    var list = [];
    var string = "";
    var result;
    data.forEach(function (data) {
      let name = data.name.replace(/['"]+/g, '');
      list.push(name);
    })
    console.log(list);
    return list;
  }


  getReposData() {
    axios.get(urlBackend + 'repos', {
      params: {
        token: this.state.token
      }
    })
      .then((resp) => {
        var value = this.parseResplist(resp.data);

        var reposSel = document.getElementById("reposSel");
        var reposSel2 = document.getElementById("reposSel2");

        for (var i = 0; i < value.length; i++) {
          reposSel.options[reposSel.options.length] = new Option(value[i], value[i]);
          reposSel2.options[reposSel2.options.length] = new Option(value[i], value[i]);
        }
      })
  }

  getUserData() {
    axios.get(urlBackend + 'user', {
      params: {
        token: this.state.token
      }
    })
      .then((response) => {
        this.setState({
          username: response.data.login
        });
        console.log(response);
      })
  }

  getRepoData(name, reponame) {
    axios.get(urlBackend + 'repo/' + name + '/' + reponame, {
      params: {
        token: this.state.token
      }
    })
      .then(function (response) {
        console.log(response);

      })
  }

  getFilesInfo(name, reponame) {
    axios.get(urlBackend + 'getfiles/' + name + '/' + reponame, {
      params: {
        token: this.state.token,
        path: this.state.path
      }
    })
      .then((resp) => {
        var value = this.parseResplist(resp.data);
        var filesSel = document.getElementById("filesSel");
        var len = filesSel.options.length;

        //clearing previous list
        for (var i = len; i >= 1; i--) {
          filesSel.remove(i);
        }

        //adding to list
        for (var i = 0; i < value.length; i++) {
          if (value[i].slice(-3) != '.md') continue;
          filesSel.options[filesSel.options.length] = new Option(value[i], value[i]);
        }
      })
      .catch(error => { });
  }

  getFileInfo(name, reponame, filename) {
    axios.get(urlBackend + 'getfile/' + name + '/' + reponame + '/' + filename, {
      params: {
        token: this.state.token,
        path: this.state.path
      }
    })
      .then((response) => {
        this.setState({
          sha: response.data.sha,
          filecontent: response.data.content
        });
        console.log(response);
      })
      .catch(error => alert(`Failed to receive ${filename}`));
  }

  postNewNote(name, reponame, filename, callback) {
    var file = filename + '.md';
    this.setState({ fileName: file });
    var params = {
      token: this.state.token,
      path: this.state.path,
      content: Buffer.from(`# ${filename}`).toString('base64')
    }

    axios.post(`${urlBackend}newfile/${name}/${reponame}/${file}`, params)
      .then(function (response) {
        console.log(response);
        alert(`Successfully created ${filename}`);
      }).then(() => callback())
      .catch(error => alert(`Failed to create ${filename}`));

  }

  postExistingNote(name, reponame, filename) {
    var params = {
      token: this.state.token, //this.state.token,
      path: "",
      content: this.state.filecontent,
      sha: this.state.sha
    }

    axios.post(`${urlBackend}setfile/${name}/${reponame}/${filename}`, params)
      .then(function (response) {
        console.log(response);
      });

  }


  componentDidMount() {
    if (this.state.token) {
      this.getUserData();
    }
    this.setState({ filecontent: "" });
    this.getReposData();
  }

  render() {
    return (
      <div className="App">

        <h1 className="header"><b>What would you like to do today?</b></h1>
        <div className="row">

          <div className="col">
            <h2><b>Create New File</b></h2>
            <form name="form1" id="form1" action="">
              <select name="reposSel" id="reposSel" value={this.state.repoName} onChange={this.handleReponame} >
                <option value="" disabled selected>Select Repo</option>
              </select>
            </form>
            {/* <h3>Your repo name is: {this.state.repoName}</h3> */}

            <form>
              <label htmlFor="path"></label>
              <input
                type="text"
                name="path"
                placeholder="Enter the file path"
                value={this.state.path}
                onChange={this.handlePath} />
              <div className="pathfa"><FaQuestionCircle />
                <div className="pathdesc"> Eg: folder1/folder2. If file is in the root folder, leave empty. </div>
              </div>
            </form>
            {/* <h3>Your path is: {this.state.path}</h3> */}

            <form>
              <label htmlFor="fileName"></label>
              <input
                type="text"
                name="fileName"
                placeholder="Enter your new file name"
                value={this.state.fileName}
                onChange={this.handleFilename}
              /><md className="md">.md</md>
            </form>
            {/* <h3>Your File Name is: {this.state.fileName}</h3> */}
            {/* <form name="form3" id="form3" action="">
              Major Branch:
              <select name="branchSel" id="branchSel" value={this.state.branch} onChange={this.handleBranch} >
                <option value="" selected="selected">Select Branch</option>
                <option value="main" >Main</option>
                <option value="master" >Master</option>
              </select>
            </form>
            <h3>Your branch is: {this.state.branch}</h3> */}


            {/* <button onClick={() => this.getReposData()}>
              GetRepoData
            </button>
            <button onClick={() => this.getRepoData(this.state.username, this.state.repoName)}>
              GetSpecificRepoData
            </button>

            <button onClick={() => this.getFileInfo(this.state.username, this.state.repoName, this.state.fileName)}>
              Get File Data
            </button> */}

            {/* <button onClick={() => this.postNewNote(this.state.username, this.state.repoName, this.state.fileName)}>
              Create a Note
            </button> */}

            <button onClick={() => {
              this.postNewNote(this.state.username, this.state.repoName, this.state.fileName,
                () => this.props.history.push({ pathname: '/Editor', state: { ...this.state } }), 1000);
            }}> Submit & Go </button>


          </div>

          <div className="col">
            <h2><b>Edit a File</b></h2>
            <form name="form2" id="form2" action="">
              <select name="reposSel2" id="reposSel2" value={this.state.repoName} onChange={this.handleReponame} >
                <option value="" disabled selected>Select Repo</option>
              </select>
            </form>
            {/* <h3>Your repo name is: {this.state.repoName}</h3> */}

            <form>
              <label htmlFor="path"></label>
              <input
                type="text"
                name="path"
                placeholder="Enter the file path"
                value={this.state.path}
                onChange={this.handlePath} />
              <div className="pathfa"><FaQuestionCircle />
                <div className="pathdesc"> Eg: folder1/folder2. If file is in the root folder, leave empty. </div>
              </div>
            </form>
            {/* <h3>Your path is: {this.state.path}</h3> */}

            <form name="form4" id="form4" action="">

              <select name="filesSel" id="filesSel" value={this.state.fileName} onChange={this.handleFilename} >
                <option value="" disabled selected>Select File</option>
              </select>
            </form>
            {/* <h3>Your file name is: {this.state.fileName}</h3> */}
            {/* 
            <form name="form3" id="form3" action="">
              Major Branch:
              <select name="branchSel" id="branchSel" value={this.state.branch} onChange={this.handleBranch} >
                <option value="" selected="selected">Select Branch</option>
                <option value="main" >Main</option>
                <option value="master" >Master</option>
              </select>
            </form>
            <h3>Your branch is: {this.state.branch}</h3> */}

            {/* <button onClick={() => this.getReposData()}>
              GetRepoData
            </button>
            <button onClick={() => this.getRepoData(this.state.username, this.state.repoName)}>
              GetSpecificRepoData
            </button>

            <button onClick={() => this.getFileInfo(this.state.username, this.state.repoName, this.state.fileName)}>
              Get File Data
            </button> */}

            <Link to={{
              pathname: '/Editor',
              state: { ...this.state }
            }}>
              <button> Submit & Go </button>
            </Link>
          </div>

        </div>


      </div>
    )
  }
}


export default NoteOption;