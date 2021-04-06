import React, { useState } from "react";
import { GetInput } from "./GetInput";
import { GetResult } from "./GetResult";
import editorContext from "./editorContext";
import '../pages/editor.css';

export function Previewer(props) {
  const [markdownText, setMarkdownText] = useState(props.filecontent);

  const contextValue = {
    markdownText,
    setMarkdownText
  };

  return (
    <editorContext.Provider value={contextValue}>
      {/* <h1 className="note-header">Markdown Editor</h1> */}
      <div className='note'>
        <div className='editor'>
          <GetInput {...props} getFileInfo={props.getFileInfo} />
        </div>
        <div className='previewer'>
          <GetResult />
        </div>
      </div>
    </editorContext.Provider>
  );
}

export default Previewer