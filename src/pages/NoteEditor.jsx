import React, { Component } from 'react'
import '../App.css'
import './editor.css'
import { GetInput } from "../components/GetInput";
import { GetResult } from "../components/GetResult";
import { NavBar } from "../components/NavBar";
import editorContext from "../components/editorContext";
import Previewer from '../components/Previewer';
import axios from 'axios';
//const urlBackend = 'http://localhost:5000/';
const urlBackend = 'https://gitnotes-be.herokuapp.com/';

export class NoteEditor extends Component {

    constructor(props) {
        super(props);
        this.state = { filecontent: '' }
        this.getFileInfo = this.getFileInfo.bind(this)

    }

    componentDidMount() {
        this.setState(this.props.location.state,
            () => this.getFileInfo(this.state.username, this.state.repoName, this.state.fileName));
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
                //alert("Successfully got File");
            })
            .catch(error => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                <NavBar {...this.state} />
                <Previewer {...this.state} getFileInfo={this.getFileInfo} />
            </div>
        )
    }
}

export default NoteEditor