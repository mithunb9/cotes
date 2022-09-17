import CodeMirror from "@uiw/react-codemirror";
import TextareaAutosize from "react-textarea-autosize";
import { javascript } from "@codemirror/lang-javascript";
import styles from "./NoteBlock.module.css";

export default function NoteBlock(props) {
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
      <CodeMirror
        value={props.content}
        className={styles.codearea}
        theme="dark"
        extensions={[javascript({ jsx: true })]}
      />
    );
  }
}
