import TextareaAutosize from "react-textarea-autosize";
import styles from "./NoteBlock.module.css";

export default function NoteBlock(props) {
  return (
    <div>
      <TextareaAutosize className={styles.textarea} id={styles[props.type]} />
    </div>
  );
}
