import React, { useContext } from "react";
import './nav.css';
import { Link } from 'react-router-dom';

export function NavBar(props) {

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('mdeditor').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = props.fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className='navbar'>
      <ul>
        <li><b className="active">GitNotes</b></li>
        <li><a href={`/dashboard?token=${props.token}`}>Dashboard</a>  </li>
        <li><a href="/">Logout</a></li>
        <li> <a className="mdbutton" onClick={downloadFile}>Download File</a>  </li>
      </ul>
    </div>

  );
}