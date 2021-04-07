import React, { Component } from 'react'
import '../App.css'
import './login.css'
import logo from '../logo.png'
import { NavBar} from "../components/NavBar";
import homepic from './gitnotes-home.png'
const login = 'https://gitnotes-be.herokuapp.com/login'; //|| 'http://127.0.0.1:5000/login';

export class LoginPage extends Component {
    render() {
        return (
            <div className="home">
                <div className="login">
                    <div className="logo">
                        <img src={logo} alt="GitNotes"/>
                        <h1>GitNotes</h1>
                    </div>
                    <h2>A GitHub Markdown Editor</h2>
                    <p>Seamlessy manage all your notes with version control. GitNotes allows you to create and edit Markdown notes
                        from any of your GitHub repositories. </p> 
                    <a className="button" href={login} > Login with GitHub </a>
                </div>
                <div className="graphic">
                    <img src={homepic} alt="GitNotes"/>
                </div>
            </div>
        )
    }
}

export default LoginPage