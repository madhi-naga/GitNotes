import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import NoteOption from './pages/NoteOption';
import NoteEditor from './pages/NoteEditor';
import Previewer from './components/Previewer';

  function App() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/dashboard' component={NoteOption}/>
        <Route path='/editor' component={NoteEditor}/>
      </BrowserRouter>

      )
    }
  
export default App;