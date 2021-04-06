import React, { useContext } from "react";
import editorContext from "./editorContext";
import ReactMarkdown from "react-markdown";

export function GetResult(props) {
  const { markdownText } = useContext(editorContext);

  return (
    
    <div className="preview-box">
      <h3> Markdown Previewer </h3>
      <div className="markdown-body">
        <ReactMarkdown source={markdownText} />
      </div>
    </div>
  );
}