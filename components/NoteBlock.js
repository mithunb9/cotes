import CodeMirror from "@uiw/react-codemirror";
import TextareaAutosize from "react-textarea-autosize";
import { javascript } from "@codemirror/lang-javascript";
import styles from "./NoteBlock.module.css";
import axios from "axios";
import React, { useState } from "react";

export default function NoteBlock(props) {
  const [value, setValue] = useState(props.content);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const request = await axios.post(
      "http://localhost:3000/api/engine/run?language=javascript&code=" + value
    );

    setOutput(request.data.output);
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    setValue(value);
  }, []);

  if (props.type !== "code") {
    return (
      <div>
        <TextareaAutosize
          className={styles.textarea}
          id={styles[props.type]}
          placeholder={props.content}
        ></TextareaAutosize>
      </div>
    );
  } else {
    return (
      <div>
        <CodeMirror
          value={props.content}
          className={styles.codearea}
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
        <button onClick={runCode}>Run</button>
        <p>{output}</p>
      </div>
    );
  }
}
